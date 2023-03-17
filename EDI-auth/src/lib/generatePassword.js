import {randomBytes, pbkdf2Sync} from 'crypto'

export function generatePassword(password){
    const salt = randomBytes(32).toString('hex');

    const hash = pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');

    return {
        salt,
        hash
    }
}