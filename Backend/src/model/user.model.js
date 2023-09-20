const mongoose = require("mongoose");
const { PROVIDERS } = require("../utils/constants");
const AVALIABLE_PROVIDERS = Object.values(PROVIDERS);
const userSchema = new mongoose.Schema(
  {
    profileImage: {
      imageUrl: String,
      imageId: String,
      socialImage: String,
      defaultImage: {
        type: String,
        default: `https://via.placeholder.com/200x200.png`,
      },
    },
    username: {
      type: String,
      required:true,
      trim: true,
      index: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    bio: {
      type: String,
      default: "",
    },
    phone: {
      type: String,
      default: "",
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    providerType: {
      type: String,
      enum: AVALIABLE_PROVIDERS,
      default: PROVIDERS.EMAIL_PASSWORD,
    },
  },
  { timestamps: true }
);

const userModel = mongoose.model("user", userSchema);
module.exports = userModel;
