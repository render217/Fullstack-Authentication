const GoogleStrategy = require("passport-google-oauth20").Strategy;
const GithubStrategy = require("passport-github2").Strategy;
const passport = require("passport");
const User = require("../model/user.model");
const ApiError = require("../utils/ApiError");

const { PROVIDERS } = require("../utils/constants");
const PassportError = require("../utils/PassportError");

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      // callbackURL: process.env.GOOGLE_CALLBACK_URL,
      callbackURL: "https://fullstack-auth.onrender.com/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      const existingUser = await User.findOne({ email: profile._json.email });

      if (existingUser) {
        if (existingUser.providerType !== PROVIDERS.GOOGLE) {
          done(
            new PassportError(
              400,
              `You are registered using ${
                existingUser.providerType.split("_")[0]
              } Please use that`
            ),
            null
          );
        } else {
          done(null, existingUser);
        }
      } else {
        const createdUser = await User.create({
          username: profile._json.name,
          email: profile._json.email,
          providerType: PROVIDERS.GOOGLE,
          password: profile._json.sub,
          profileImage: {
            socialImage: profile._json.picture,
          },
        });
        if (createdUser) {
          console.log("created");
          done(null, createdUser);
        } else {
          done(new PassportError(400, "Error while registring"), null);
        }
      }
    }
  )
);
passport.use(
  new GithubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: process.env.GITHUB_CALLBACK_URL,
    },
    async (accessToken, refreshToken, profile, done) => {
      const existingUser = await User.findOne({ email: profile._json.email });
      if (existingUser) {
        if (existingUser.providerType !== PROVIDERS.GITHUB) {
          done(
            new PassportError(
              400,
              `You are registered using ${
                existingUser.providerType.split("_")[0]
              } Please use that`
            ),
            null
          );
        } else {
          done(null, existingUser);
        }
      } else {
        if (!profile._json.email) {
          done(
            new PassportError(
              400,
              "User does not have a public email associated with their account. Please try another login method"
            ),
            null
          );
        } else {
          const createdUser = await User.create({
            username: profile._json.name,
            password: profile._json.id,
            profileImage: {
              socialImage: profile._json.avatar_url,
            },
            email: profile._json.email,
            providerType: PROVIDERS.GITHUB,
          });
          if (createdUser) {
            done(null, createdUser);
          } else {
            done(new PassportError(400, "Error registring User"), null);
          }
        }
      }
    }
  )
);
passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});
