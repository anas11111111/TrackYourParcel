import express from "express";
import configure from "./controllers/index";
import dotenv from "dotenv";
dotenv.config();

import { handleRequest, handleErrors } from "./middlewares/index";
;

const app = express();

app.use(express.json());

app.use(handleRequest);

configure(app);

app.use(handleErrors);

export default app;