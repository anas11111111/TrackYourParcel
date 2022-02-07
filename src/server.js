import app from './app';
import { connectWithDb, uri } from "./mongo";
import { errorLogger, infoLogger } from "./logger"
const port = 3000;
app.listen(port, () => {
    if (process.env.ENVIRONMENT != 'TEST') {
        app.use(infoLogger());
    }

    connectWithDb();

    if (process.env.ENVIRONMENT != 'TEST') {
        app.use(errorLogger(uri));
    }

    console.log("listening to port no:" + port)
})