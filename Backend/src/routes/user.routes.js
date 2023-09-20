const router = require("express").Router();
const userController = require("../controllers/user.controller");
const upload = require("../middleware/multer");


router
  .route("/")
  .get(userController.getCurrentUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

router.post(
  "/updateImage",
  upload.single("profileImage"),
  userController.updateProfileImage
);



module.exports = router;
