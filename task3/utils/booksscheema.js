import Joi from "joi";
export const bookSchema = Joi.object({
    title: Joi.string().required(),
    price: Joi.number().min(0).required()
});