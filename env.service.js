import dotenv from 'dotenv'
import path from 'path'


const envPath = path.resolve(process.cwd(), `.env.${process.env.NODE_ENV}`);

dotenv.config({ path: envPath });

const port = process.env.PORT;
const databaseURL = process.env.DataBase;
const salt = process.env.salt_round
const mood = process.env.mood
const userSignature = process.env.user_signature
const userRefreshSignature = process.env.user_refreshsignature
const AdminSignature = process.env.signature_Admin
const AdminRefreshSignature = process.env.RefreshSignature
export const env = {
    port,
    databaseURL,
    salt,
    mood,
    userSignature,
    userRefreshSignature,
    AdminSignature,
    AdminRefreshSignature
};