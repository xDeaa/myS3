import { hash, compare } from 'bcrypt'

export const hashPassword = (password: string): Promise<string> => {
    return hash(password, 10)
}

export const verifiyPassword = (
    plainPassword: string,
    hashPassword: string,
): Promise<boolean> => {
    return compare(plainPassword, hashPassword)
}
