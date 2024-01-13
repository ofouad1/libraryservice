const Joi = require('joi');

const CheckoutSchema = Joi.object({
    BookId: Joi.number().integer().required(),
    BorrowerId: Joi.number().integer().required(),
});

module.exports = {
    CheckoutSchema,
};
