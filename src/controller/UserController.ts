'use strict'
const jwt = require('jsonwebtoken');
require('dotenv').config()
import { UserRepository } from "../repository/UserRepository"
import { Users } from "../entity/Users"

export const getUsers = async () => {
    let repository = new UserRepository()
    let users = await repository.getAll()
    return users
}

export const getOneUser = async (id: number) : Promise<Users> => {
    let repository = new UserRepository()
    let user = await repository.getOne(id)
    return user
}

export const addNewUser = async (body: any) : Promise<string> => {
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

export const updateUser = async (id: number, body: any) : Promise<string> => {
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

export const removeUser = async (id: number) : Promise<string> => {
    let repository = new UserRepository()
    await repository.removeUser(id)
    return'User removed.'
}

export const login = async (body: any) : Promise<object> => {
    let pw_user : string, login_user : string, email_user : string
    pw_user = body.pw_user
    login_user = body.login_user
    email_user = body.email_user
    let repository = new UserRepository()
    let user = await repository.loginUser(pw_user, login_user, email_user)
    let token = createToken(user.id, pw_user)
    return {token}
}

const createToken = (id_user: number, pw: string) : string => {
    const user = { "id": id_user.toString(), "pw": pw }
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: '1h'
    })
}