import mongoose from "mongoose";
import { env } from "../config/env.service.js";
export const databaseconnection=()=>{
    mongoose.connect(env.databaseURL).then(()=>{
        console.log("database is connect");
    }).catch((err)=>{
        console.log(err);
        
    })
}