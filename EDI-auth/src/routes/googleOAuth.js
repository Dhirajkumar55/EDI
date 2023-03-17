import {Router} from 'express';
import '../middleware/passport-google-oauth-strategy.js'
import passport from 'passport';
import isLoggedIn from '../middleware/isLoggedIn.js';

const router = Router();

router.post('/login', 
    (req,res,next)=>{
        console.log("api hit to login");
        const query = req.body;
        req.session.query = query;
        next();
    },
    passport.authenticate('google', {
        scope:
            ['email','profile']
        }
    )
);

router.get('/callback',
    passport.authenticate('google', {
        failureRedirect: '/api/auth/login',
    }),
    function (req, res) {
        res.redirect('/api/auth/session')
    }
);

router.post('/logout', function(req, res, next) {
    req.logout(function(err) {
      if (err) { return next(err); }
      res.redirect('/api/auth/login');
    });
});


router.post('/session', isLoggedIn, (req, res) =>{
    console.log("api hit to session successful");
    // console.log(req.session);
    // console.log(req.user);
    res.send({status: true, privilege: 1, name: req.user.name});
})

export {router as googleAuthRouter};