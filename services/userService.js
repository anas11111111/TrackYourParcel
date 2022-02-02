import models from "../models";

export const saveUser = async (user) => {
    const model = new models.User({ username: user.username, createAt: new Date() });
    const savedUser = await model.save();
    return savedUser;
}
