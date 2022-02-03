import Joi from 'joi';
const schema = Joi.object().keys({
    username: Joi.string().alphanum().min(3).max(30).required()
});
export const validate = (data) => {
    const result = schema.validate(data);
    data.createdAt = new Date();
    result.value = data;
    return result;

}