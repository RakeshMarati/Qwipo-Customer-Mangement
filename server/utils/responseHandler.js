class ResponseHandler {
    static success(res, data, message = 'Success', statusCode = 200) {
        return res.status(statusCode).json({
            success: true,
            message,
            data
        });
    }

    static error(res, error, statusCode = 500) {
        return res.status(statusCode).json({
            success: false,
            error: error.message || error,
            statusCode
        });
    }

    static validationError(res, errors) {
        return res.status(400).json({
            success: false,
            error: 'Validation failed',
            details: errors,
            statusCode: 400
        });
    }

    static notFound(res, message = 'Resource not found') {
        return res.status(404).json({
            success: false,
            error: message,
            statusCode: 404
        });
    }

    static paginated(res, data, pagination, message = 'Data retrieved successfully') {
        return res.status(200).json({
            success: true,
            message,
            data,
            pagination
        });
    }
}

module.exports = ResponseHandler;
