exports.message = (error) => {
    if (process.env.NODE_ENV === 'production') {
        const errorMessage = { error: error.message}
        console.error(errorMessage);
        return errorMessage
    } else {
        const errorMessage = { message: error.message, stack: error.stack }
        console.error(errorMessage);
        return errorMessage
    }
}