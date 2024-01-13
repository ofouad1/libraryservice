const bookDao = require('../../database/DAO/bookDao')
const { insertBookSchema, updateBookSchema } = require('./bookSchemas');
const {BadRequestError,
    NotFoundError} = require('../../utils/errors')

const bookRequestValidator = {
    validateAddBook: async (bookData) => {

        const { error } = insertBookSchema.validate(bookData);
        if (error) throw new BadRequestError(error.details[0].message);

        // Check if ISBN already exists
        if (await bookDao.isbnExists(bookData.ISBN)) {
            throw new NotFoundError('A book with this ISBN already exists.');
        }
    },

    validateUpdateBook: async (BookId, bookUpdates) => {
        if (Object.keys(bookUpdates).length === 0) {
            throw new BadRequestError('No update fields provided.');
        }

        const { error } = updateBookSchema.validate(bookUpdates);
        if (error) throw new BadRequestError(error.details[0].message);

        if (!await bookDao.bookExists(BookId)) {
            throw new NotFoundError('Book not found.');
        }
    },

    validateDeleteBook: async (BookId) => {
        if (!await bookDao.bookExists(BookId)) {
            throw new NotFoundError('Book not found.');
        }
    },

};

module.exports = bookRequestValidator;