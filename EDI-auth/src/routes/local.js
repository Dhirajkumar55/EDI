import {Router} from 'express';
import { generatePassword } from "../lib/generatePassword.js";
import { isUserPresent } from "../lib/isUserPresent.js";
import { User } from "../models/User.js";
import '../middleware/passport-local-auth-strategy.js';
import passport from 'passport';
import isLoggedIn from '../middleware/isLoggedIn.js';


const router = Router();

router.post('/login', 
    passport.authenticate('local'),
    (req,res)=>{

        req.user.password = undefined;
        req.user.salt = undefined;
        
        req.session.user = req.user;
        res.send({status:true,message:'Authentication Success'})
    }
);

router.post('/register', async (req,res)=>{
   
    const {email,name,password,companyName,country,companyDomain,preferredLanguage} = req.body;

    let user = await isUserPresent(email);

    if(user){
        res.send({message:"user already present"});
    }
    else{
        const {salt, hash} = generatePassword(password);

        try{
            user = new User({
                email: email,
                name: name,
                password: hash,
                salt: salt,
                companyName: companyName,
                country: country,
                companyDomain: companyDomain,
                preferredLanguage: preferredLanguage,
                strategy: 'local'
            });

            await user.save();
        }
        catch(err){
            console.error(err);
            res.status(500).send({message: "error occured"})
        }

        res.status(200).send(user);
    } 
});

router.get('/success', isLoggedIn, (req, res) =>{
    res.status(200).send('You are logged in');
})

router.post('/session', isLoggedIn, (req, res) =>{
    res.send({status: true, privilege: 1, name: req.user.name, email: req.user.email});
})


router.post('/logout', isLoggedIn, (req, res) =>{
    req.logout();
    res.send({status: true});
})

export {router as localAuthRouter};