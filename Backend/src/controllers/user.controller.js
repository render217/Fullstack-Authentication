const express = require("express");
const ApiError = require("../utils/ApiError");
const User = require("../model/user.model");
const ApiResponse = require("../utils/ApiResponse");
const bcrypt = require("bcrypt");
const fs = require("fs");
const sharp = require("sharp");
const cloudinary = require("../middleware/cloudinary");
/**
 * @param {express.Request}req
 * @param {express.Response}res
 * */
exports.getCurrentUser = async (req, res) => {
  const currentUser = await User.findById(req.user.id).select("-password");
  res
    .status(200)
    .json(
      new ApiResponse(200, { user: currentUser }, "Successfully fetched user")
    );
};

/**
 * @param {express.Request}req
 * @param {express.Response}res
 * */
exports.deleteUser = async (req, res) => {
  const deletedUser = await User.findOneAndRemove({ _id: req.user.id });
  console.log(deletedUser);
  res.clearCookie("token");
  res
    .status(200)
    .json(new ApiResponse(200, { user: null }, "Successfully deleted User"));
};

/**
 * @param {express.Request}req
 * @param {express.Response}res
 * */
exports.updateUser = async (req, res) => {
  const { username, password, bio, phone, email } = req.body;
  const currentUser = await User.findById(req.user.id);

  if (username) currentUser.username = username;
  if (bio) currentUser.bio = bio;
  if (phone) currentUser.phone = phone;
  if (email) currentUser.email = email;

  if (password) {
    const hashPassword = bcrypt.hashSync(password, 10);
    currentUser.password = hashPassword;
  }

  if (req.file) {
    // check if there is already image in cloudinary
    // if there is first delete it from cloudinary cloud
    if (currentUser.profileImage.imageId) {
      const cloudResult = await cloudinary.uploader.destroy(
        currentUser.profileImage.imageId
      );
    }

    // save image to cloudinary
    const result = await cloudinary.uploader.upload(req.file?.path, {
      folder: "fullstack_authentication",
      transformation: [
        { width: 800, height: 600, crop: "limit" },
        { quality: "35" },
        
      ],
    });

    // update the currentUser profileImage
    currentUser.profileImage.imageUrl = result.secure_url;
    currentUser.profileImage.imageId = result.public_id;

    // remove the temporary file
    fs.unlinkSync(req.file?.path);
  }

  //sync update
  const updatedUser = await currentUser.save();
  updatedUser.password = undefined;
  res
    .status(200)
    .json(
      new ApiResponse(200, { user: updatedUser }, "Sucessfully updated user")
    );
};
