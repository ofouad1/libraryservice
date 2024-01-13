const borrowService = require('../services/borrowService');

const borrowController = {
    checkoutBook: async (req, res, next) => {
        try {
            await borrowService.checkoutBook(req.body);
            res.json({ message: 'Book checked out successfully.' });
        } catch (error) {
            next(error);
        }
    },

    returnBook: async (req, res, next) => {
        try {
            await borrowService.returnBook(req.body);
            res.json({ message: 'Book returned successfully' });
        } catch (error) {
            next(error);
        }
    },

    getOverDue: async (req, res, next) =>{
        try {
            const overDueBorrows = await borrowService.getOverDue();
            res.json(overDueBorrows);
        } catch (error) {
            next(error);
        }
    },

    getBorrowingReport: async (req, res, next) => {
        try {
            const { startDate, endDate} = req.query;
            const report = await borrowService.generateBorrowingReport(startDate, endDate);
            res.setHeader('Content-Type', 'text/csv');
            res.setHeader('Content-Disposition', `attachment; filename=report.csv`);
            res.send(report);
        } catch (error) {
            next(error);
        }
    }
};

module.exports = borrowController;