const express = require('express');
const bookController = require('../controllers/bookController');

const router = express.Router();

router.post('/', bookController.addBook);
router.get('/', bookController.getAllBooks);
router.get('/search', bookController.searchBooks);
router.get('/:BookId', bookController.getBookById);
router.put('/:BookId', bookController.updateBook);
router.delete('/:BookId', bookController.deleteBook);

module.exports = router;