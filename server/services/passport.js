const keys = require('../config/keys');
const passport = require('passport');
const mongoose = require('mongoose');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const User = mongoose.model('users');

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findOne({ id })
        .then(user => {done(null, user);});
});

passport.use(
    new GoogleStrategy(
        {
            clientID: keys.googleClientID,
            clientSecret: keys.googleClientSecret,
            callbackURL: '/auth/google/callback'
        },
        (
            accessToken,
            refreshToken,
            profile,
            done
        ) => {
            //Attempts to find user with matching GoogleID
            User.findOne({ googleId: profile.id }).then(
                (existingUser) => {
                    if (existingUser) {
                        //load existing user information
                        done(null, existingUser);
                    }
                    else {
                        //Creates new user in database with Unique GoogleID
                        new User({ googleId: profile.id })
                            .save()
                            .then(user => done(null, user));
                    }
                }
            )
        }
    )
);