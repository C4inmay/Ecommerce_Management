function errorHandler(error, _request, response, _next) {
  const statusCode = error.statusCode || error.status || 500
  const message = error.message || 'Internal server error'

  response.status(statusCode).json({
    success: false,
    error: {
      message,
    },
  })
}

module.exports = { errorHandler }
