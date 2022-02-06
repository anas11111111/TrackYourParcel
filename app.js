import express from "express";
import configure from "./controllers/index";

import {handleRequest,handleErrors}from "./middlewares/index";
import { connectWithDb, uri } from "./mongo";
import { errorLogger, infoLogger } from "./logger";

const app = express();
app.use(express.json());


app.use(handleRequest)
connectWithDb();


app.use(infoLogger);

configure(app);
app.use(errorLogger(uri));
app.use(handleErrors)

export default app;