const express = require('express');
const borrowController = require('../controllers/borrowController');
const apiRateLimiter = require('../MiddleWares/rateLimiter');

const router = express.Router();

router.post('/', borrowController.checkoutBook);
router.get('/overDue', apiRateLimiter, borrowController.getOverDue);
router.post('/return', borrowController.returnBook);
router.get('/export', apiRateLimiter, borrowController.getBorrowingReport);


module.exports = router;