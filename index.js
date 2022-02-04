import express from "express";
import configure from "./controllers/index";
import { handleErrors } from "./middlewares/handleErrors";
import { connectWithDb, uri } from "./mongo";
import winston from "winston";
import expressWinston from "express-winston";
import winstonFile from "winston-daily-rotate-file";
import winstonMongo from "winston-mongodb";
import { ElasticsearchTransport } from "winston-elasticsearch"
const app = express();
app.use(express.json());

const port = 3000;

const processRequest = async (req, res, next) => {
    let correlationId = req.headers['x-correlation-id'];
    if (!correlationId) {
        correlationId = Date.now().toString();
        req.headers['x-correlation-id'] = correlationId;
    }
    res.set('x-correlation-id', correlationId);
    return next();
}
app.use(processRequest)
connectWithDb();
const getMessage = (req, res) => {
    let obj = {
        correlationId: req.headers['x-correlation-id'],
        requestBody: req.body
    };
    return JSON.stringify(obj);
}

const fileInfoTransport = new (winston.transports.DailyRotateFile)({
    filename: 'log-info-%DATE%.log',
    datePattern: 'yyyy-MM-DD-HH'
})
const elasticsearchOptions = {
    level: 'info',
    clientOpts: { node: 'http://localhost:9200' },
    indexPrefix: 'log-trackyourparcel',
};
const esTransport = new (ElasticsearchTransport)(elasticsearchOptions);
const infoLogger = expressWinston.logger({
    transports: [
        new winston.transports.Console(),
        fileInfoTransport,
        esTransport
    ],
    format: winston.format.combine(winston.format.colorize(), winston.format.json()),
    meta: true,
    //msg: 'this is a log {{req.method}}'
    msg: getMessage
});

const fileErrorTransport = new (winston.transports.DailyRotateFile)({
    filename: 'error-info-%DATE%.log',
    datePattern: 'yyyy-MM-DD-HH'
});

const mongoErrorTransport = new winston.transports.MongoDB({
    db: uri,
    metaKey: 'meta',
})

const errorLogger = expressWinston.errorLogger({
    transports: [
        new winston.transports.Console(),
        fileErrorTransport, mongoErrorTransport,esTransport,
        
    ],
    format: winston.format.combine(winston.format.colorize(), winston.format.json()),
    meta: true,
    msg:'{"correlationalId":"{{req.headers.x-correlation-id}}","error":"{{err.message}}"}'


});


app.use(infoLogger);

configure(app);
app.use(errorLogger);
app.use(handleErrors)
app.listen(port, () => {
    console.log("listening to port no:" + port)
})
//log(models);
//Doing up and running express server
//configure the express server
//handle the routes of the server


//use directory import
//use async await function
//separation of violation
/*three layer architecture 
    --controller layer: process the http requests[userController]
    --service layer : process the object and send to data layer[userService]
    --data layer : process the data and get / set it to database [mongoose raper]
*/
