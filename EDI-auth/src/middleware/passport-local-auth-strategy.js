import passport from "passport";
import { User } from "../models/User.js"
import { Strategy as LocalStrategy } from "passport-local"
import { validatePassword } from '../lib/validatePassword.js';
import {isUserPresent} from "../lib/isUserPresent.js";

//To use with sessions
passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (userId, done) => {
    try{
        const user = await User.findById(userId);
        done(null, user);
    }
    catch(err){
        done(err);
    }
});

const verifyFunction = async (req, email, password, done) => {
    try {

        // to check is user is present
        const user = await isUserPresent(email);


        if (!user) {
            done(null, false);
        }

        // to check if password is valid
        const isValid = validatePassword(password, user.password, user.salt);

        if (isValid) {
            done(null, user);
        }
        else {
            done(null, false);
        }

    }
    catch (err) {
        done(err);
    }
}

const strategyOptions = {usernameField: 'user', passReqToCallback: true}
const strategy = new LocalStrategy(strategyOptions, verifyFunction);

// Passport local strategy
passport.use(strategy);
