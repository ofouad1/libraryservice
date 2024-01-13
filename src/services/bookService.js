const bookDao = require('../database/DAO/bookDao');
const bookRequestValidator = require('../validations/book/bookRequestValidator')

const bookService = {
    addBook: async (bookData) => {
        await bookRequestValidator.validateAddBook(bookData);
        return await bookDao.addBook(bookData);
    },

    getAllBooks: async () => {
        return await bookDao.getAllBooks();
    },

    getBookById: async (BookId) => {
        return await bookDao.getBookById(BookId);
    },

    searchBooks: async (query) => {
        return await bookDao.searchBooks(query);
    },

    updateBook: async (BookId, bookUpdates) => {
        await bookRequestValidator.validateUpdateBook(BookId, bookUpdates);
        return await bookDao.updateBook(BookId, bookUpdates);
    },

    deleteBook: async (BookId) => {
        await bookRequestValidator.validateDeleteBook(BookId);
        await bookDao.deleteBook(BookId);
    }
};

module.exports = bookService;
