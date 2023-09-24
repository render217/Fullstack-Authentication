const express = require("express");
const ApiError = require("../utils/ApiError");
const { MongooseError } = require("mongoose");
const PassportError = require("../utils/PassportError");
// const GoogleStrategy = require("passport-google-oauth20").Strategy;
// const GithubStrategy = require("passport-github2").Strategy;
const multer = require("multer");
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
        `${process.env.CLIENT_SSO_REDIRECT_URL}?message=${error.message}`
      );
  }

  // if (
  //   error instanceof GoogleStrategy.InternalOAuthError ||
  //   error instanceof GithubStrategy.InternalOAuthError
  // ) {
  //   return res
  //     .status(400)
  //     .redirect(
  //       `${process.env.CLIENT_SSO_REDIRECT_URL}/login?message=${error.message}`
  //     );
  // }

  if (error instanceof multer.MulterError) {
    const statusCode = error?.statusCode || 400;
    const message = "Image should be less than 1 mb";
    error = new ApiError(
      statusCode,
      message,
      error?.errors || [],
      error?.stack
    );
  }

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
