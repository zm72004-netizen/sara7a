import mongoose, { Model, Schema } from "mongoose";
import { type } from "node:os";
import { GenderEnum, provider, role } from "../../common/index.js";
import { Timestamp } from "bson";

const userSchema = Schema({
    userName: {
        type: String,
        required: true,
        min: 3,
        max: 8
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    age: {
        type: Number
    },
    gender: {
        type: String,
        Enum: GenderEnum,
        default: GenderEnum.male
    },
    role: {
        type: String,
        enum: role,
        default: role.user
    },
    provider: {
        type: String,
        enum: provider,
        default: provider.system
    },
    profileImages: {
        type: String
    },
    coverImage: {
        type: String
    },
    isVerfied: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
})
export const model = mongoose.model('user', userSchema)