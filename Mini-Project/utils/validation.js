const Joi = require('joi');

exports.productVal = Joi.object({
    name: Joi.string().required(),
    description: Joi.string(),
    price: Joi.number().min(0).required(),
    stock: Joi.number().min(0).required(),
    category: Joi.string(),
    imageUrl: Joi.string()
});

exports.orderVal = Joi.object({
    customerInfo: Joi.object({
        name: Joi.string().min(3).required(),
        email: Joi.string().email().required(),
        address: Joi.string().min(10).required(),
    }).required()
});