const borrowerDao = require('../database/DAO/borrowerDao');
const borrowDao = require('../database/DAO/borrowDao')
const borrowerRequestValidator = require('../validations/borrower/borrowerRequestValidator')

const borrowerService = {
    addBorrower: async (borrowerData) => {
        await borrowerRequestValidator.validateAddBorrower(borrowerData);
        return await borrowerDao.addBorrower(borrowerData);
    },

    getAllBorrowers: async () => {
        return await borrowerDao.getAllBorrowers();
    },

    getBorrowerById: async (borrowerId) => {
        return await borrowerDao.getBorrowerById(borrowerId);
    },

    updateBorrower: async (borrowerId, borrowerUpdates) => {
        await borrowerRequestValidator.validateUpdateBorrower(borrowerId, borrowerUpdates);
        return await borrowerDao.updateBorrower(borrowerId, borrowerUpdates);
    },

    getBorrowerBooks: async (borrowerId) => {
        if (!await borrowerDao.borrowerExists(borrowerId)) {
            throw new Error('Borrower not found.');
        }
        return await borrowDao.getBorrowedBooksNotReturned(borrowerId);
    },

    deleteBorrower: async (borrowerId) => {
        await borrowerRequestValidator.validateDeleteBorrower(borrowerId);
        await borrowerDao.deleteBorrower(borrowerId);
    }
};

module.exports = borrowerService;
