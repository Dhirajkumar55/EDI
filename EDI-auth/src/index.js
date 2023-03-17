import express from "express";
import session from "express-session";
import passport from "passport";
import routes from './routes/index.js';
import dotenv from "dotenv";
import MongoStore from 'connect-mongo';
import cors from "cors";

const app = express();
dotenv.config();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: '*',
    methods : ['POST', 'GET'],
}));

app.all('*', (req,res,next)=>{
    res.header('Access-Control-Allow-Origin','*');
    res.header('Access-Control-Allow-Credentials','false');
    res.header('Access-Control-Allow-Methods','*');
    res.header('Access-Control-Allow-Headers','*');
    res.header('Access-Control-Max-Age','864000');
    next();
})


const sessionStore = MongoStore.create({
    mongoUrl: process.env.MONGO_URI,
    dbName: 'Session',
    collectionName: 'sessions',
    mongoOptions: {
        useNewUrlParser: true,
        useUnifiedTopology: true
    },
    autoRemove: 'interval',
    autoRemoveInterval: 60 // In minutes. Default is 10 min
})

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized:false,
    store: sessionStore,
    cookie: { secure: false, maxAge: 24 * 60 * 60 * 1000 } // 24 hours === 1 Day
}))

app.use(passport.initialize());
app.use(passport.session());



app.use("/api", routes)

export default app