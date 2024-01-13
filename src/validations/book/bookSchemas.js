const Joi = require('joi');

const insertBookSchema = Joi.object({
    Author: Joi.string().max(255).required(),
    ISBN: Joi.string().max(13).required(),
    Title: Joi.string().max(255).required(),
    AvailableQuantity: Joi.number().integer().min(0).required(),
    ShelfLocation: Joi.string().max(255).required(),
});

const updateBookSchema = Joi.object({
    Author: Joi.string().max(255).optional(),
    ISBN: Joi.string().max(13).optional(),
    Title: Joi.string().max(255).optional(),
    AvailableQuantity: Joi.number().integer().min(0).optional(),
    ShelfLocation: Joi.string().max(255).optional(),
});

module.exports = {
    insertBookSchema,
    updateBookSchema
};
