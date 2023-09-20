const express = require("express");
const jwt = require("jsonwebtoken");
const ApiError = require("../utils/ApiError");
/**
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.Request} next
 * */
const ensureAuth = (req, res, next) => {
  const token =
    req.cookies?.token || req.headers["authorization"]?.replace("Bearer ", "");
  if (!token) {
    next(new ApiError(401, "Unauthroized (aka no token attached)"));
  }
  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    req.user = decoded
    next();
  } catch (error) {
    next(new ApiError(403, "Invalid Token"));
  }
};

module.exports = {
    ensureAuth
}