const bookService = require('../services/bookService');

const bookController = {
    addBook: async (req, res) => {
        try {
            const bookId = await bookService.addBook(req.body);
            res.status(201).json({ message: 'Book added', id: bookId });
        } catch (error) {
            next(error);
        }
    },

    getAllBooks: async (req, res, next) => {
        try {
            const books = await bookService.getAllBooks();
            res.json(books);
        } catch (error) {
            next(error);
        }
    },

    getBookById: async (req, res, next) => {
        try {
            const book = await bookService.getBookById(req.params.BookId);
            res.json(book);
        } catch (error) {
            next(error);
        }
    },

    searchBooks: async (req, res, next) => {
        try {
            const books = await bookService.searchBooks(req.query);
            res.json(books);
        } catch (error) {
            next(error);
        }
    },

    updateBook: async (req, res, next) => {
        try {
            await bookService.updateBook(req.params.BookId, req.body);
            res.json({ message: 'Book updated successfully' });
        } catch (error) {
            next(error);
        }
    },

    deleteBook: async (req, res, next) => {
        try {
            await bookService.deleteBook(req.params.BookId);
            res.json({ message: 'Book deleted successfully' });
        } catch (error) {
            next(error);
        }
    }
};

module.exports = bookController;
