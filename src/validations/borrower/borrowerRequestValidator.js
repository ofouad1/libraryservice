const borrowerDao = require('../../database/DAO/borrowerDao')
const { insertBorrowerSchema, updateBorrowerSchema } = require('./borrowerSchemas');
const {BadRequestError,NotFoundError, ConflictError} = require('../../utils/errors')


const borrowerRequestValidator = {
    validateAddBorrower: async (borrowerData) => {

        const { error } = insertBorrowerSchema.validate(borrowerData);
        if (error) throw new BadRequestError(error.details[0].message);

        if (await borrowerDao.emailExists(borrowerData.Email)) {
            throw new ConflictError('A borrower with this Email already exists.');
        }
    },

    validateUpdateBorrower: async (BorrowerId, borrowerUpdates) => {
        if (Object.keys(borrowerUpdates).length === 0) {
            throw new BadRequestError('No update fields provided.');
        }

        const { error } = updateBorrowerSchema.validate(borrowerUpdates);
        if (error) throw new BadRequestError(error.details[0].message);

        if (!await borrowerDao.borrowerExists(BorrowerId)) {
            throw new NotFoundError('Borrower not found.');
        }

    },

    validateDeleteBorrower: async (BorrowerId) => {
        if (!await borrowerDao.borrowerExists(BorrowerId)) {
            throw new NotFoundError('Borrower not found.');
        }
    },

};

module.exports = borrowerRequestValidator;