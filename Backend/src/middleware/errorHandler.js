const express = require("express");
const ApiError = require("../utils/ApiError");
const { MongooseError } = require("mongoose");
/**
 * @param {Error | ApiError} err
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 * */

const errorHandler = (err, req, res, next) => {
  let error = err;
  if (!(error instanceof ApiError)) {
    const statusCode =
      error?.statusCode || error instanceof MongooseError ? 400 : 500;
    const message = error?.message || "Something went wrong";

    error = new ApiError(statusCode, message, error?.errors || [], error.stack);
  }

  const response = {
    ...error,
    message: error.message,
    ...(process.env.NODE_ENV !== "production" ? { stack: error.stack } : {}),
  };


  res.status(error.statusCode).json(response);
};
module.exports = errorHandler