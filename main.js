import express, { json } from 'express'
import { env } from './config/env.service.js';
import { databaseconnection } from './database/connection.js';
import authRouter from './module/auth/auth.controller.js'
let app = express()
app.use(json())
app.use(authRouter)
databaseconnection()
app.get('/', () => {
    console.log("connect");
})
app.use('/' , (err , req , res, next)=>{
    console.log(err);
    let stack = env.mood= "dev" ? err.stack :null
    const status = err.cause? err.cause.status : 500
    const extra = err.cause ? err.cause.extra : null
    res.status(status).json({message:err.message , stack , extra})
})
app.listen(env.port, () => {
    console.log("server is run on port 3000");
})