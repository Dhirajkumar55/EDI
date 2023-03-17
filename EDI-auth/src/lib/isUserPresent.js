import { User } from "../models/User.js";
 
export async function isUserPresent(email){
    const user = await User.findOne({email});

    if(user){
        return user;
    }

    return null;
}