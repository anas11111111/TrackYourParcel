import express from "express";
import configure from "./controllers/index";
import dotenv from "dotenv";
dotenv.config();

import { handleRequest, handleErrors } from "./middlewares/index";
import { connectWithDb, uri } from "./mongo";
import { errorLogger, infoLogger } from "./logger";

const app = express();

console.log(process.env.ENVIRONMENT);
app.use(express.json());


app.use(handleRequest);
connectWithDb();

if (process.env.ENVIRONMENT != 'TEST') {
    app.use(infoLogger);
}
configure(app);

if (process.env.ENVIRONMENT != 'TEST') {
    app.use(errorLogger(uri));
}


app.use(infoLogger);

app.use(errorLogger(uri));
app.use(handleErrors)

export default app;