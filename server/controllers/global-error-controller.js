const AppError = require("./../lib/app-error");

const sendErrorProd = (err, req, res) => {
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    res.status(500).json({ message: "Something Go Wrong!" });
  }
};

const sendErrorDev = (err, req, res) => {
  if (req.originalUrl.startsWith("/api")) {
    res.status(err.statusCode).json({
      status: err.status,
      error: err,
      message: err.message,
      stack: err.stack,
    });
  } else {
    res.status(err.statusCode).render("error", {
      title: "Something Goes Wrong",
      msg: err.message,
    });
  }
};

const castErrorHandler = (err) => {
  const message = `invalid ${err.path}: ${err.value}.`;

  return new AppError(message, 404);
};

validationErrorHandler = (err) => {
  const messages = Object.values(err.errors)
    .map((el) => el.message)
    .join(". ");

  return new AppError(`Invalid input: ${messages}`, 400);
};

const duplicateErrorHandler = (err) => {
  const field = Object.keys(err.keyValue)[0];
  const value = Object.values(err.keyValue)[0];

  const message = `Duplicate ${field}: ${value}. please use another value.`;

  return new AppError(message, 400);
};

const jsonWenTokenErrorHandler = (err) => {
  return new AppError("Invalid JWT", 401);
};
module.exports = (err, req, res, next) => {
  err.status = err.status || "error";
  err.statusCode = err.statusCode || 500;
  if (process.env.NODE_ENV === "development") {
    let error = { ...err };
    error.name = err.name;
    error.message = err.message || "something goes wrong";

    if (error.name === "CastError") error = castErrorHandler(error);
    if (error.name === "ValidationError") error = validationErrorHandler(error);
    if (error.code === 11000) error = duplicateErrorHandler(error);
    if (error.name === "JsonWebTokenError")
      error = jsonWenTokenErrorHandler(error);
    sendErrorDev(error, req, res);
  }

  if (process.env.NODE_ENV === "production") {
    sendErrorProd(err, req, res);
  }
};
