const multer = require("multer");
const path = require("path");
const fileFilter = (req, file, cb) => {
  let ext = path.extname(file.originalname);
  if (ext !== ".jpg" && ext !== ".jpeg" && ext !== ".png") {
    cb(new Error("File type is not supported"), false);
    return;
  }
  cb(null, true);
};

const upload = multer({
  storage: multer.diskStorage({}),
  limits: {
    // Set the maximum file size to 1MB (1 * 1024 * 1024 bytes)
    fileSize: 1 * 1024 * 1024,
  },
  fileFilter,
});
module.exports = upload;
