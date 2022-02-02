import res from "express/lib/response";
import models from "../models";

export const saveUser = async (user) => {
    const model = new models.User({ username: user.username, createAt: new Date() });
    const savedUser = await model.save();
    return savedUser;
};

export const getAllUsers = async () => {
    const User = models.User;
    const users = await User.find();
    return users;
}
export const update = async (user) => {
    const id = user._id;
    const User = models.User;
    let model = await User.findById(id);
    if (model) {
        model.username = user.username;
        model.save();
    }
    return model;
}

export const deleteById = async (id) => {
    // let id = ObjectId.fromString( myObjectIdString);
    const User = models.User;
    console.log("service" + id);
    if (id.length == 24) {
        let model = await User.findById(id);
        console.log("model", model);
        if (model) {
            let result = await User.deleteOne({ _id: id });
            return result;
        }
        return new Error('User not found by the id ' + id);
    }
    else {
        return new Error('User not found by the id ' + id);

    }



}