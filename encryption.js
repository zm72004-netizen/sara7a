import { env } from "../../config/env.service.js";
import bcrypt, { compare } from 'bcrypt'

export const generateHash = async ({ painText, salt = env.salt }) => {
    let hash = await bcrypt.hash(painText, Number(salt))
    return (hash)
}
export const generateCompare = async ({ painText, compareVariable }) => {
    let compare = await bcrypt.compare(painText, compareVariable)
    return compare
}

