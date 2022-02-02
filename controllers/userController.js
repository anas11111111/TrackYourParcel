import express from "express";
import models from "../models";
import { saveUser } from "../services/userService";

const router = express.Router()
const getHandler = (req, res) => {
    const query = JSON.stringify(req.query);
    res.send("testing get " + query)
}
const postHandler = async(req, res) => {
    const body = req.body;
    const user = await saveUser(body);
    res.send(user._id);
   
};
router.get('/', getHandler);
router.post('/', postHandler);

const configure = (app) => {
    app.use('/users', router);
}
export default configure;