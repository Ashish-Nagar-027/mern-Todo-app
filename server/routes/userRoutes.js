const express = require("express");
const passport = require("passport");
const { register, login, GoogleLogin } = require("../controller/userController");
const User = require("../models/user");
const router = express.Router();
const jwt = require("jsonwebtoken");

router.route("/register").post(register);
router.route("/login").post(login);

// router.route("/google").get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));
router.route("/google").get(passport.authenticate("google", { scope: ["profile", "email"] }));


router.route("/google/callback").get(passport.authenticate("google", { failureRedirect: "/login" }), (req, res) => {
    const user = req.user; // assuming `req.user` contains the user info after Google auth

    // Generate the JWT token
    const token = jwt.sign({ userId: user._id, email: user.email }, process.env.SECRET_KEY, { expiresIn: "10D" });

    // Redirect to the frontend with user info and token in the URL
    // const redirectUrl = `http://localhost:3001/auth-success?token=${token}&user=${encodeURIComponent(user.name)}&email=${encodeURIComponent(user.email)}&_id=${user._id}`;
    const redirectUrl = `https://mern-todo-app-z63u.vercel.app/auth-success?token=${token}&user=${encodeURIComponent(user.name)}&email=${encodeURIComponent(user.email)}&_id=${user._id}`;
    res.redirect(redirectUrl);
});


module.exports = router;