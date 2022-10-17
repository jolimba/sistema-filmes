'use strict'
const jwt = require('jsonwebtoken');
require('dotenv').config()
import { UserRepository } from "../repository/UserRepository"
import { AppDataSource } from "../data-source"

export const getUsers = async () => {
    let repository = new UserRepository()
    let users = await repository.getAll()
    return users
}

export const getOneUser = async (id: number) => {
    let repository = new UserRepository()
    let user = await repository.getOne(id)
    return user
}

export const addNewUser = async (body: any) => {
    let repository = new UserRepository()
    await repository.addNewUser(
        body.first_name,
        body.last_name,
        body.birth_date,
        body.email_user,
        body.login_user,
        body.pw_user
    )
    return `User ${body.login_user} created.`
}

export const updateUser = async (id: number, body: any) => {
    let repository = new UserRepository()
    await repository.updateUser(
        id,
        body.first_name,
        body.last_name,
        body.birth_date,
        body.email_user,
        body.login_user,
        body.pw_user
    )
    return `User ${body.login_user} updated.`
}

export const removeUser = async (id: number) => {
    let repository = new UserRepository()
    await repository.removeUser(id)
    return'User removed.'
}

export const login = async (body: any) => {
    let pwUser, loginUser, emailUser
    pwUser = body.pw_user
    loginUser = body.login_user
    emailUser = body.email_user
    let repository = new UserRepository()
    let user = await repository.loginUser(pwUser, loginUser, emailUser)
    let token = createToken(emailUser, pwUser)
    return {'token': token, 'user_id': user.id}
}

const createToken = (email: string, pw: string) : string => {
    const user = { email: email, pw: pw }
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: Math.floor(Date.now() / 1000) + (60 * 60)
    })
}