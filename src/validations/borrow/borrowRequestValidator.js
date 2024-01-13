const borrowerDao = require('../../database/DAO/borrowerDao')
const bookDao = require('../../database/DAO/bookDao')
const borrowDao = require('../../database/DAO/borrowDao')
const {BadRequestError,NotFoundError, ConflictError} = require('../../utils/errors')
const { CheckoutSchema } = require('./borrowSchemas');

const borrowRequestValidator = {
    validateCheckout: async (borrowData) => {
        const { error } = CheckoutSchema.validate(borrowData);
        if (error) throw new BadRequestError(error.details[0].message);

        if (!await borrowerDao.borrowerExists(borrowData.BorrowerId)) {
            throw new NotFoundError('there is no borrower with this id');
        }

        if (!await bookDao.bookExists(borrowData.BookId)) {
            throw new NotFoundError('there is no Book with this id');
        }

        if(await borrowDao.isBorrowExistAndNotReturned(borrowData.BookId, borrowData.BorrowerId)){
            throw new ConflictError('this customer already have this book and dont return it untill now');
        }
    },

    validateReturn: async (borrowData) => {
        const { error } = CheckoutSchema.validate(borrowData);
        if (error) throw new BadRequestError(error.details[0].message);

        if (!await borrowerDao.borrowerExists(borrowData.BorrowerId)) {
            throw new NotFoundError('there is no borrower with this id');
        }

        if (!await bookDao.bookExists(borrowData.BookId)) {
            throw new NotFoundError('there is no Book with this id');
        }

        if(!await borrowDao.isBorrowExistAndNotReturned(borrowData.BookId, borrowData.BorrowerId)){
            throw new ConflictError('this borrower dont have this book at the moment');
        }
    },

};

module.exports = borrowRequestValidator;