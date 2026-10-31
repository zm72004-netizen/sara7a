import { argon2d } from "argon2"
import { generateCompare, generateHash } from "../../common/enums/encryption.js"
import { env } from "../../config/env.service.js"
import { model } from "../../database/model/user.model.js"
import bcrypt from 'bcrypt'
import { BadRequestException, ConflictException, NotFoundException } from "../../common/exciptions/err.exciptions.js"
import jwt from 'jsonwebtoken'
import { generateAccessToken } from "../../common/exciptions/service/token.service.js"
export const signup = async (body) => {
    let { userName, email, password, confirmPassword, age, gender } = body
    if (password != confirmPassword) {
        return BadRequestException("password is dont equal configPassword")
    }
    let existedMail = await model.findOne({ email })
    if (existedMail) {
        return ConflictException({ message: 'email is existed' })
    } else {
        let hashPassword = await generateHash({ painText: password })
        if (hashPassword) {
            let user = await model.create({ userName, email, password: hashPassword, age, gender })
            return user
        }
        return true
    }
}

export const signin = async (body) => {
    let { email, password } = body
    let userData = await model.findOne({ email })
    if (!userData) {
        return NotFoundException({ message: "user not found" })
    }
    let matched = generateCompare({ painText: password, compareVariable: userData.password })
    if (!matched) {
        return BadRequestException({ message: 'password or email is not true', extra: 'test' })
    } else {
        const { accessToken, refreshToken } = generateToken(userData)
        return ({ message: "login success", accessToken, refreshToken })
        return userData
    }

}
export const getUserById = async (id) => {
    let userData = await model.findById(id)
    return userData
}
export const generateToken = async (body) => {
    console.log(body);

    let { refreshToken } = body
    let { accessToken } = generateAccessToken(refreshToken)
    if (accessToken) {
        return accessToken
    } else {
        throw BadRequestException({ message: "invalid token" })
    }
}