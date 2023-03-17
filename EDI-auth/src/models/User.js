import mongoose from 'mongoose';

const userModel = new mongoose.Schema({
    email: String,
    name: String,
    password: String,
    salt: String,
    companyName: String,
    country: String,
    companyDomain: String,
    preferredLanguage: String,
    // strategy: {
    //     type: String,
    //     default: 'local'
    // }
});

const User = mongoose.model('User', userModel);

export {User};