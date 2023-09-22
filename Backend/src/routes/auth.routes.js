const router = require("express").Router();
const authController = require("../controllers/auth.controller");
// const { ensureAuth } = require("../middleware/auth");
const passport = require("passport");
router.post("/login", authController.login);
router.post("/register", authController.register);
router.get("/logout", authController.logout);
router.get("/status", authController.checkLoginStatus);
router.get(
  "/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);
router.get(
  "/google/callback",
  passport.authenticate("google"),
  authController.socialLogin
);

router.get(
  "/github",
  passport.authenticate("github", { scope: ["profile", "email"] })
);

router.get(
  "/github/callback",
  passport.authenticate("github"),
  authController.socialLogin
);

module.exports = router;
