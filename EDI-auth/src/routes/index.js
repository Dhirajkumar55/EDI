import {Router} from 'express';
import { localAuthRouter } from './local.js';
// import { googleAuthRouter } from './googleOAuth.js';


const router = Router();

router.use('/auth', localAuthRouter);

// uncomment the below line to use google oauth
//router.use('/google/auth', googleAuthRouter);

export default router;

