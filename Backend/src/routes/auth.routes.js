const router = require("express").Router();
const authController = require("../controllers/auth.controller");
// const { ensureAuth } = require("../middleware/auth");
const passport = require("passport");
router.post("/login", authController.login);
router.post("/register", authController.register);
router.get("/logout", authController.logout);
router.get("/status", authController.checkLoginStatus);
router
  .route("/google")
  .get(passport.authenticate("google", { scope: ["email", "profile"] }));
  
router
  .route("/google/callback")
  .get(passport.authenticate("google"), authController.socialLogin);

router
  .route("/github")
  .get(passport.authenticate("github", { scope: ["profile", "email"] }));

router
  .route("/github/callback")
  .get(passport.authenticate("github"), authController.socialLogin);

module.exports = router;
