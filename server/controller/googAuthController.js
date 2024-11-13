

const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../models/user"); // Assuming you have a User model

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: "https://mern-todo-app-roan.vercel.app/api/v1/auth/google/callback",
        },
        async (accessToken, refreshToken, profile, done) => {

            // Check if the user exists in the database
            let user = await User.findOne({ googleId: profile.id });
            if (!user) {
                // If the user doesn’t exist, create one
                user = await User.create({
                    googleId: profile.id,
                    name: profile.displayName,
                    email: profile.emails[0].value,
                });
            }
            done(null, user);
        }
    )
);

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        // Use await with findById and remove the callback function
        const user = await User.findById(id);
        done(null, user);
    } catch (error) {
        done(error, null);
    }
});