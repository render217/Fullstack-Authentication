require("dotenv").config({ path: "./src/config/.env" });
require("express-async-errors");
require("./src/config/passport");
const express = require("express");
const morgan = require("morgan");
const connectDB = require("./src/config/db");
const app = express();
const cookieParser = require("cookie-parser");
const cookieSession = require("cookie-session");
const cors = require("cors");
const authRoute = require("./src/routes/auth.routes");
const userRoute = require("./src/routes/user.routes");
const passport = require("passport");
const { ensureAuth } = require("./src/middleware/auth");
const errorHandler = require("./src/middleware/errorHandler");

app.use(morgan("dev"));
app.use(
  cookieSession({
    secret: [process.env.COOKIE_SESSION_SECRET],
    httpOnly: true,
    expires: "30d",
  })
);

// register regenerate & save after the cookieSession middleware initialization
app.use(function (request, response, next) {
  if (request.session && !request.session.regenerate) {
    request.session.regenerate = (cb) => {
      cb();
    };
  }
  if (request.session && !request.session.save) {
    request.session.save = (cb) => {
      cb();
    };
  }
  next();
});

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:5174",
      "https://fullstack-auth.onrender.com",
    ],
    methods: ["POST", "PUT", "GET", "OPTIONS", "HEAD"],
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

passport.initialize();
passport.session();

app.use("/auth", authRoute);
app.use("/user", ensureAuth, userRoute);

app.use(errorHandler);

const port = process.env.PORT || 4000;
const start = async () => {
  await connectDB();
  app.listen(port, (req, res) => {
    console.log(`server is on ${port}`);
  });
};
start();
