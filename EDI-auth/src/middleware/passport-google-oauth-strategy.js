import  passport from "passport";
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import {User} from "../models/User.js"
import {randomBytes} from "crypto"
import {isUserPresent} from "../lib/isUserPresent.js";

passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(async function(user, done) {
    await User.find(user);
    done(null, user);
});

passport.use(new GoogleStrategy({
        clientID:"112305536504-h9mh6ej2d53nl3qjr5gust9m0v2nal9k.apps.googleusercontent.com",
        clientSecret:"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",
        callbackURL: "https://edi-spec.dev/api/auth/callback",
    },
    async function(request, accessToken, refreshToken, profile, done) {
       console.log(request.body);
        try{
            let user = await isUserPresent(profile.emails[0].value);
           
            if(user){
                
                done(null, user);
            }
            else{
                const newUser = {
                    email : profile.emails[0].value,
                    name: profile.displayName,
                    password : randomBytes(20).toString('hex'), // fake password
                    strategy : 'googleOAuth'
                }
                user = await User.create(newUser);
                done(null, user);
            }
        }
        catch(err){
            done(err);
        }
    }
));