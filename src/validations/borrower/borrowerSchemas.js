const Joi = require('joi');

const insertBorrowerSchema = Joi.object({
    Name: Joi.string().max(255).required(),
    Email: Joi.string().email().max(255).required(),
});

const updateBorrowerSchema = Joi.object({
    Name: Joi.string().max(255).optional(),
    Email: Joi.string().max(255).email().optional(),
});

module.exports = {
    insertBorrowerSchema,
    updateBorrowerSchema
};
