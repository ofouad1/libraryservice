const pool = require('../database/pool');
const bookDao = require('../database/DAO/bookDao');
const borrowDao = require('../database/DAO/borrowDao');
const borrowRequestValidator = require('../validations/borrow/borrowRequestValidator')
const { convertToCSV } = require('../utils/reportUtils');


const borrowService = {
    checkoutBook: async (borrowData) => {
        // need to implement some sort of locks here to avoid concurrency issues that transactions can't handle 
        // transactions handles almost all the cases but there is cases will fail
        // future work to implement some sort of lock here
        // won't do this at current moment due to the deadline and just for making implementaion simpler
        await borrowRequestValidator.validateCheckout(borrowData);
        const {BookId, BorrowerId} = borrowData;
        const connection = await pool.getConnection();
        try {
            await connection.beginTransaction();
            const book = await bookDao.getBookById(BookId, connection);
            if (book.AvailableQuantity < 1) {
                throw new Error('Book is not available for checkout.');
            }

            const utcNow = new Date();
            const DueDate = new Date();
            DueDate.setDate(utcNow.getDate() + 30); // just for simplicity i make the due date is 30 days from now to make the logic easier
            await bookDao.updateBookQuantity(BookId, book.AvailableQuantity - 1, connection);
            await borrowDao.createBorrowRecord(BookId, BorrowerId, DueDate, connection);

            await connection.commit();
        } catch (error) {
            await connection.rollback();
            throw error;
        } finally {
            connection.release();
        }
    },

    returnBook: async (borrowData) => {
        // need to implement some sort of locks here to avoid concurrency issues that transactions can't handle 
        // future work to implement some sort of lock here
        // won't do this at current moment due to the deadline and just for making implementaion simpler
        await borrowRequestValidator.validateReturn(borrowData);
        const {BookId, BorrowerId} = borrowData;
        const connection = await pool.getConnection();
        try {
            await connection.beginTransaction();
            await borrowDao.markAsReturned(BookId, BorrowerId, connection);
            const book = await bookDao.getBookById(BookId, connection);
            await bookDao.updateBookQuantity(BookId, book.AvailableQuantity + 1, connection);
            await connection.commit();
        } catch (error) {
            await connection.rollback();
            throw error;
        } finally {
            connection.release();
        }
    },

    getOverDue: async () =>{
        return await borrowDao.getOverDue();
    },

    generateBorrowingReport: async (startDate, endDate) => {
        const data = await borrowDao.getBorrowData(startDate, endDate);
        return convertToCSV(data);
    }
};

module.exports = borrowService;
