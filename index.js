import express from "express";
import configure from "./controllers/index";
import { handleErrors } from "./middlewares/handleErrors";
import connectWithDb from "./mongo";
const app = express();
app.use(express.json());

const port = 3000;
connectWithDb();
configure(app)
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
