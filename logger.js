import winston from "winston";
import expressWinston from "express-winston";
import winstonFile from "winston-daily-rotate-file";
import winstonMongo from "winston-mongodb";
import { ElasticsearchTransport } from "winston-elasticsearch";
import { uri } from "./mongo";

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
export const infoLogger =(uri)=> expressWinston.logger({
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

const mongoErrorTransport = (uri)=>new winston.transports.MongoDB({
    db: uri,
    metaKey: 'meta',
})

export const errorLogger =(uri) => expressWinston.errorLogger({
    transports: [
        new winston.transports.Console(),
        fileErrorTransport, mongoErrorTransport(uri), esTransport,

    ],
    format: winston.format.combine(winston.format.colorize(), winston.format.json()),
    meta: true,
    msg: '{"correlationalId":"{{req.headers.x-correlation-id}}","error":"{{err.message}}"}'


});
