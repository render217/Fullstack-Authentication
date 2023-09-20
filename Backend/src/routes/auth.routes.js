const router = require("express").Router();
const authController = require("../controllers/auth.controller");
const { ensureAuth } = require("../middleware/auth");

router.post("/login", authController.login);
router.post("/register", authController.register);
router.get("/logout", ensureAuth, authController.logout);
module.exports = router;
