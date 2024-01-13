const express = require('express');
const borrowerController = require('../controllers/borrowerController');

const router = express.Router();

router.post('/', borrowerController.addBorrower);
router.get('/', borrowerController.getAllBorrowers);
router.get('/:BorrowerId', borrowerController.getBorrowerById);
router.put('/:BorrowerId', borrowerController.updateBorrower);
router.delete('/:BorrowerId', borrowerController.deleteBorrower);
router.get('/borrowerBooks/:BorrowerId', borrowerController.getBorrowerBooks);

module.exports = router;