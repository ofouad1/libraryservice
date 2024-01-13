const express = require('express');
const bookRoutes = require('./src/routes/bookRoutes');
const borrowerRoutes = require('./src/routes/borrowerRoutes');
const borrowRoutes = require('./src/routes/borrowRoutes');
const pool = require('./src/database/pool');
const errorHandler = require('./src/MiddleWares/errorHandler');

const app = express();
app.use(express.json());

app.use('/api/books', bookRoutes);
app.use('/api/borrower', borrowerRoutes);
app.use('/api/borrow', borrowRoutes);
app.use(errorHandler);
process.on('SIGINT', () => {
    pool.end(err => {
        if (err) {
            console.error('Failed to close database connection pool', err);
        }
        process.exit(err ? 1 : 0);
    });
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
