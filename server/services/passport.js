const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const mongoose = require("mongoose");
const keys = require("../config/keys");

const User = mongoose.model("users");

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: "/auth/google/callback"
    },
    (accessToken, refreshToken, profile, done) => {
      const existingUser = User.findOne({
        $or: [{ googleId: profile.id }, { email: profile.emails[0].value }]
      });
      if (existingUser) {
        return done(null, existingUser);
      }

      const user = new User({ googleId: profile.id }).save();
      done(null, user);
    }
  )
);
