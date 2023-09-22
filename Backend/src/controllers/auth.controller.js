const express = require("express");
const ApiError = require("../utils/ApiError");
const User = require("../model/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const ApiResponse = require("../utils/ApiResponse");
/**
 * @param {express.Request}req
 * @param {express.Response}res
 *
 * */

exports.login = async (req, res) => {
  const { email, password } = req.body;
  if (!email) {
    throw new ApiError(400, "Email is required");
  }
  if (!password) {
    throw new ApiError(400, "Password is required");
  }

  const foundUser = await User.findOne({ email });
  if (!foundUser) {
    throw new ApiError(400, "No user is registered with this email!");
  }

  const isPasswordMatch = bcrypt.compareSync(password, foundUser.password);
  if (!isPasswordMatch) {
    throw new ApiError(401, "Wrong credentials");
  }
  // Exclude password field from the user object
  foundUser.password = undefined;

  const payload = { id: foundUser._id, email: foundUser.email };
  const token = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: process.env.ACCESS_TOKEN_EXPIRES,
  });

  // set token to the cookie
  res.cookie("token", token, {
    httpOnly: true,
    sameSite: "none",
    secure: true,
    maxAge: 24 * 60 * 60 * 1000,
  });
  res
    .status(200)
    .json(
      new ApiResponse(200, { user: foundUser, token }, "Successfully Logged In")
    );
};
/**
 * @param {express.Request}req
 * @param {express.Response}res
 *
 * */

exports.register = async (req, res) => {
  const { email, password } = req.body;
  if (!email) {
    throw new ApiError(400, "Email is required");
  }
  if (!password) {
    throw new ApiError(400, "Password is required");
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new ApiError(409, "Email is already in user");
  }

  const hashedPassword = bcrypt.hashSync(password, 10);
  const tempUsername = email.split("@")[0];

  const createdUser = await User.create({
    username: tempUsername,
    email: email,
    password: hashedPassword,
  });
  // Exclude password field from the user object
  createdUser.password = undefined;

  res
    .status(201)
    .json(
      new ApiResponse(201, { user: createdUser }, "Sucessfully registered user")
    );
};

/**
 * @param {express.Request}req
 * @param {express.Response}res
 * */
exports.logout = async (req, res) => {
  res.cookie("token", "", {
    httpOnly: true,
    expires: new Date(0),
    secure: true,
    sameSite: "none",
  });
  res.clearCookie("token");
  req.user = undefined;
  res.status(200).json(new ApiResponse(200, null, "Successfully logged Out"));
};

/**
 * @param {express.Request}req
 * @param {express.Response}res
 * */
exports.socialLogin = async (req, res) => {
  const payload = { id: req.user._id, email: req.user.email };
  const token = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: process.env.ACCESS_TOKEN_EXPIRES,
  });

  // set token to the cookie
  res.cookie("token", token, {
    httpOnly: true,
    sameSite: "none",
    secure: true,
    maxAge: 24 * 60 * 60 * 1000,
  });

  // res.status(200).redirect(`${process.env.CLIENT_SSO_REDIRECT_URL}/login`);
  return res.redirect("http://localhost:5173/social-redirect");
};

/**
 * @param {express.Request}req
 * @param {express.Response}res
 * */
exports.checkLoginStatus = (req, res) => {
  const token = req.cookies?.token;
  if (!token) return res.send(false);
  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    return res.send(true);
  } catch (error) {
    return res.send(false);
  }
};
