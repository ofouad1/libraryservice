const { query } = require('../../utils/databaseUtils');

const borrowDao = {
    createBorrowRecord: async (BookId, BorrowerId, DueDate, connection) => {
        const sql = 'INSERT INTO Borrow (BookId, BorrowerId, DueDate) VALUES (?, ?, ?)';
        const [result] = await query(sql, [BookId, BorrowerId, DueDate], connection);
        return result.insertId;
    },

    isBorrowExistAndNotReturned: async(BookId, BorrowerId) =>{
        const sql = 'Select * from Borrow where BookId = ? and BorrowerId = ? and ReturnDate is NULL';
        const [result] = await query(sql, [BookId, BorrowerId]);
        return result.length > 0;
    },

    markAsReturned: async (BookId, BorrowerId, connection) => {
        const sql = 'UPDATE Borrow SET ReturnDate = NOW() WHERE BookId = ? AND BorrowerId = ? AND ReturnDate is NULL';
        await query(sql, [BookId, BorrowerId], connection);
    },

    getBorrowedBooksNotReturned: async(BorrowerId) => {
        const sql = 'select Books.Title,Books.Author,Books.ISBN from Borrow left join Books on Borrow.BookId = Books.BookId where ReturnDate is null and BorrowerId = ?'
        const [result] = await query(sql, [BorrowerId]);
        return result;
    },

    getOverDue: async() => {
        const sql = 'select BorrowerId,BookId from Borrow where DueDate < NOW() and ReturnDate is NULL'
        const [result] = await query(sql);
        return result;
    },

    getBorrowData: async (startDate, endDate) => {
        const sql = 'SELECT * FROM Borrow WHERE CreatedAt BETWEEN ? AND ?';
        const [data] = await query(sql, [startDate, endDate]);
        return data;
    }
};

module.exports = borrowDao;