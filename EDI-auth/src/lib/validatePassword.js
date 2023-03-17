import {pbkdf2Sync} from 'crypto'

export function validatePassword(password, hashedPassword, salt){

    
    const hash = pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');
   
    return hash === hashedPassword;
}