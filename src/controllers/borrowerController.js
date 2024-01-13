const borrowerService = require('../services/borrowerService');

const borrowerController = {
    addBorrower: async (req, res, next) => {
        try {
            const borrowerId = await borrowerService.addBorrower(req.body);
            res.status(201).json({ message: 'Borrower added', id: borrowerId });
        } catch (error) {
            next(error);
        }
    },

    getAllBorrowers: async (req, res, next) => {
        try {
            const borrowers = await borrowerService.getAllBorrowers();
            res.json(borrowers);
        } catch (error) {
            next(error);
        }
    },

    getBorrowerById: async (req, res, next) => {
        try {
            const borrower = await borrowerService.getBorrowerById(req.params.BorrowerId);
            res.json(borrower);
        } catch (error) {
            next(error);
        }
    },

    updateBorrower: async (req, res, next) => {
        try {
            await borrowerService.updateBorrower(req.params.BorrowerId, req.body);
            res.json({ message: 'Borrower updated successfully' });
        } catch (error) {
            next(error);
        }
    },

    deleteBorrower: async (req, res, next) => {
        try {
            await borrowerService.deleteBorrower(req.params.BorrowerId);
            res.json({ message: 'Borrower deleted successfully' });
        } catch (error) {
            next(error);
        }
    },

    getBorrowerBooks: async (req, res, next) => {
        try {
            const borrowedBooks = await borrowerService.getBorrowerBooks(req.params.BorrowerId);
            res.json(borrowedBooks);
        } catch (error) {
            next(error);
        }
    }
};

module.exports = borrowerController;
