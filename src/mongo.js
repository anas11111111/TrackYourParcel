import mongoose from "mongoose";

export const uri = "mongodb://localhost:27017/trackyourparcel";
const options = { useNewUrlParser: true, useUnifiedTopology: true };

const log = (msg) => console.log(msg);

export const connectWithDb = () => {
    mongoose.connect(uri, options, (err, db) => {
        if (err) {
            throw err;
        }
        else {
            console.log("database is connected");
        }

    })
}
