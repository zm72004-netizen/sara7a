import z from 'zod'
export const userloginSchema = z.strictObject({
        email:z.string().email(),
        password:z.string
    })