const { query } = require('../../utils/databaseUtils');


const addSearchCondition = (field, value, isExactMatch = false) => {
    if (isExactMatch) {
        return {
            condition: `${field} = ?`,
            value
        };
    } else {
        return {
            condition: `${field} LIKE ?`,
            value: `%${value}%`
        };
    }
};

const bookDao = {
    bookExists: async (BookId) => {
        const sql = 'SELECT COUNT(*) AS count FROM Books WHERE BookId = ?';
        const [rows] = await query(sql, [BookId]);
        return rows[0].count > 0;
    },
    
    isbnExists: async (ISBN) => {
        const sql = 'SELECT COUNT(*) AS count FROM Books WHERE ISBN = ?';
        const [rows] = await query(sql, [ISBN]);
        return rows[0].count > 0;
    },
    
    addBook: async (book) => {
        const sql = 'INSERT INTO Books (Author, ISBN, Title, AvailableQuantity, ShelfLocation) VALUES (?, ?, ?, ?, ?)';
        const [result] = await query(sql, [book.Author, book.ISBN, book.Title, book.AvailableQuantity, book.ShelfLocation]);
        return result.insertId;
    },

    getAllBooks: async () => {
        const sql = 'SELECT * FROM Books';
        const [books] = await query(sql);
        return books;
    },

    getBookById: async (BookId, connection = null) => {
        const sql = 'SELECT * FROM Books WHERE BookId = ?';
        const [books] = await query(sql, [BookId], connection);
        return books[0];
    },

    updateBookQuantity: async (BookId, newQuantity, connection = nul) => {
        const sql = 'UPDATE Books SET AvailableQuantity = ? WHERE BookId = ?';
        await query(sql, [newQuantity, BookId], connection);
    },

    searchBooks: async (searchParams) => {
        const conditions = [];
        const params = [];

        if (searchParams.Author) {
            const authorCondition = addSearchCondition('Author', searchParams.Author);
            conditions.push(authorCondition.condition);
            params.push(authorCondition.value);
        }

        if (searchParams.Title) {
            const titleCondition = addSearchCondition('Title', searchParams.Title);
            conditions.push(titleCondition.condition);
            params.push(titleCondition.value);
        }

        if (searchParams.ISBN) {
            const isbnCondition = addSearchCondition('ISBN', searchParams.ISBN, true);
            conditions.push(isbnCondition.condition);
            params.push(isbnCondition.value);
        }

        if (conditions.length === 0) {
            throw new Error('No suitable parameters provided');
        }

        const sql = `SELECT * FROM Books WHERE ${conditions.join(' AND ')}`;
        return await query(sql, params);
    },

    updateBook: async (BookId, bookUpdates) => {
        const updateConditions = [];
        const updateValues = [];

        for (const key in bookUpdates) {
            updateConditions.push(`${key} = ?`);
            updateValues.push(bookUpdates[key]);
        }

        const sql = `UPDATE Books SET ${updateConditions.join(', ')} WHERE BookId = ?`;
        updateValues.push(BookId);
        return await query(sql, updateValues);
    },

    deleteBook: async (BookId) => {
        const sql = 'DELETE FROM Books WHERE BookId = ?';
        return await query(sql, [BookId]);
    }
};

module.exports = bookDao;