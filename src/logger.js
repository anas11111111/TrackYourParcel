import winston from "winston";
import expressWinston from "express-winston";
import winstonFile from "winston-daily-rotate-file";
import winstonMongo from "winston-mongodb";
import { ElasticsearchTransport } from "winston-elasticsearch";

const getMessage = (req, res) => {
    let obj = {
        correlationId: req.headers['x-correlation-id'],
        requestBody: req.body
    };
    return JSON.stringify(obj);
}

const elasticsearchOptions = {
    level: 'info',
    clientOpts: { node: 'http://localhost:9200' },
    indexPrefix: 'log-trackyourparcel',
};
const esTransport = new (ElasticsearchTransport)(elasticsearchOptions);

export const infoLogger =()=> expressWinston.logger({
    transports: [
        new winston.transports.Console(),
        new (winston.transports.DailyRotateFile)({
            filename: 'log-info-%DATE%.log',
            datePattern: 'yyyy-MM-DD-HH'
        }),
        esTransport
    ],
    format: winston.format.combine(winston.format.colorize(), winston.format.json()),
    meta: true,
    //msg: 'this is a log {{req.method}}'
    msg: getMessage
});


const mongoErrorTransport = (uri) => new winston.transports.MongoDB({
    db: uri,
    metaKey: 'meta',
})

export const errorLogger = (uri) => expressWinston.errorLogger({
    transports: [
        new winston.transports.Console(),
        new (winston.transports.DailyRotateFile)({
            filename: 'error-info-%DATE%.log',
            datePattern: 'yyyy-MM-DD-HH'
        }), mongoErrorTransport(uri), esTransport,

    ],
    format: winston.format.combine(winston.format.colorize(), winston.format.json()),
    meta: true,
    msg: '{"correlationalId":"{{req.headers.x-correlation-id}}","error":"{{err.message}}"}'


});
