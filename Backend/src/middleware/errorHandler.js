const express = require("express");
const ApiError = require("../utils/ApiError");
const { MongooseError } = require("mongoose");
const PassportError = require("../utils/PassportError");
/**
 * @param {Error | ApiError} err
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 * */

const errorHandler = (err, req, res, next) => {
  let error = err;

  if (error instanceof PassportError) {
    return res
      .status(400)
      .redirect(
        `${process.env.CLIENT_SSO_REDIRECT_URL}/login?message=${error.message}`
      );
  }
  console.log(err);
  if (!(error instanceof ApiError)) {
    const statusCode =
      error?.statusCode || error instanceof MongooseError ? 400 : 500;
    const message = error?.message || "Something went wrong";

    error = new ApiError(
      statusCode,
      message,
      error?.errors || [],
      error?.stack
    );
  }

  const response = {
    ...error,
    message: error.message,
    ...(process.env.NODE_ENV !== "production" ? { stack: error.stack } : {}),
  };

  res.status(error.statusCode).json(response);
};
module.exports = errorHandler;
