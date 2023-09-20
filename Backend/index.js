require("dotenv").config({ path: "./src/config/.env" });
require("express-async-errors");
const express = require("express");
const connectDB = require("./src/config/db");
const app = express();
const cookieParser = require("cookie-parser");
const cors = require("cors");
const authRoute = require("./src/routes/auth.routes");
const userRoute = require("./src/routes/user.routes");

const { ensureAuth } = require("./src/middleware/auth");
const errorHandler = require("./src/middleware/errorHandler");
const allowedOrigins = require("./src/config/allowedOrigins");

// app.use((req, res, next) => {
//   const origin = req.headers.origin;
//   if (allowedOrigins.includes(origin)) {
//     res.header("Access-Control-Allow-Credentials", true);
//   }
//   next();
// });
// app.use(
//   cors({
//     origin: (origin, callback) => {
//       if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
//         callback(null, true);
//       } else {
//         callback(new Error("Not allowed by CORS"));
//       }
//     },
//     optionsSuccessStatus: true,
//   })
// );
app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

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
