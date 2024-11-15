const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
const userRouter = require("./routes/userRoutes");
const notFound = require("./middleware/notFound");
const taskRouter = require("./routes/taskRoutes");
const morgan = require("morgan");
const verifyUser = require("./middleware/authMiddleware");
require('./controller/googAuthController')
const session = require("express-session");
const passport = require("passport");


// Initialize express - session
app.use(
  session({
    secret: process.env.SECRET_KEY, // Replace with a secure key
    resave: false,
    saveUninitialized: true,
  })
);

app.use(express.json());
app.use(cors());
app.use(morgan("tiny"));

// Initialize passport
app.use(passport.initialize());
app.use(passport.session());


app.get("/", (req, res) => {
  res.send("home route");
});

app.use("/api/v1/auth", userRouter);
app.use("/api/v1/tasks", verifyUser, taskRouter);
app.use(notFound);

port = process.env.PORT;

module.exports = app;
