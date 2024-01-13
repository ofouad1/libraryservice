const { query } = require('../../utils/databaseUtils');

const borrowerDao = {
    borrowerExists: async (BorrowerId) => {
        const sql = 'SELECT COUNT(*) AS count FROM Borrowers WHERE BorrowerID = ?';
        const [rows] = await query(sql, [BorrowerId]);
        return rows[0].count > 0;
    },

    emailExists: async (Email) => {
        const sql = 'SELECT COUNT(*) AS count FROM Borrowers WHERE Email = ?';
        const [rows] = await query(sql, [Email]);
        return rows[0].count > 0;
    },
    
    addBorrower: async (borrower) => {
        const sql = 'INSERT INTO Borrowers (Name, Email) VALUES (?, ?)';
        const [result] = await query(sql, [borrower.Name, borrower.Email]);
        return result.insertId;
    },

    getAllBorrowers: async () => {
        const sql = 'SELECT * FROM Borrowers';
        const [borrowers] = await query(sql);
        return borrowers;
    },

    getBorrowerById: async (BorrowerId) => {
        const sql = 'SELECT * FROM Borrowers WHERE BorrowerID = ?';
        const [borrowers] = await query(sql, [BorrowerId]);
        return borrowers[0];
    },

    updateBorrower: async (BorrowerId, borrowerUpdates) => {
        const updateConditions = [];
        const updateValues = [];

        for (const key in borrowerUpdates) {
            updateConditions.push(`${key} = ?`);
            updateValues.push(borrowerUpdates[key]);
        }

        const sql = `UPDATE Borrowers SET ${updateConditions.join(', ')} WHERE BorrowerId = ?`;
        updateValues.push(BorrowerId);
        await query(sql, updateValues);
    },

    deleteBorrower: async (BorrowerId) => {
        const sql = 'DELETE FROM Borrowers WHERE BorrowerId = ?';
        await query(sql, [BorrowerId]);
    },
};

module.exports = borrowerDao;
