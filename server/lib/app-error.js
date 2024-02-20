module.exports = class AppError extends Error {
  constructor(errorMessage, statusCode) {
    super();
    this.statusCode = statusCode;
    this.message = errorMessage;
    this.status = `${statusCode}`.startsWith("5") ? "error" : "fail";
    this.isOperational = true;

    Error.captureStackTrace(this, this.construction);
  }
};
