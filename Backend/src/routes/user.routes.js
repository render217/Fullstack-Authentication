const router = require("express").Router();
const userController = require("../controllers/user.controller");
const upload = require("../middleware/multer");

router
  .route("/")
  .get(userController.getCurrentUser)
  .patch(upload.single("profileImage"), userController.updateUser)
  .delete(userController.deleteUser);

// router.post(
//   "/updateImage",
//   userController.updateProfileImage
// );

module.exports = router;
