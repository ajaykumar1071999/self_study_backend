const successResponse = (res, statusCode, message, data) => {
    return res.status(statusCode).json({ statusCode, success: true, message, details: data })
}

const errorResponse = (res, statusCode, message, error) => {
    return res.status(statusCode).json({ statusCode, success: false, message, error: error })
 }

module.exports = { successResponse, errorResponse }