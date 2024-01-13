function errorHandler(err, req, res, next) {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    
    // Log the error for server-side analysis
    console.error(err);

    res.status(statusCode).json({
        error: {
            message: message,
            status: statusCode,
            timestamp: new Date().toISOString()
        }
    });
}

module.exports = errorHandler;
