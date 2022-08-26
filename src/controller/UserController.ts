'use strict'
import { UserRepository } from "../repository/UserRepository"
import { AppDataSource } from "../data-source"

export const getUsers = async () => {
    let err, users
    let repository = new UserRepository()
    await repository.getAll()
    .then(async (user) => {
        users = user
        await AppDataSource.destroy()
    }).catch(error => {
        err = error.message
    })
    return err ? err : users
}

export const getOneUser = async (id: number) => {
    let err, user
    let repository = new UserRepository()
    await repository.getOne(id)
    .then(async (getUser) => {
        user = getUser
        await AppDataSource.destroy()
    }).catch(error => {
        err = error.message
    })
    return err ? err : user
}

export const addNewUser = async (body: any) => {
    let err
    let repository = new UserRepository()
    await repository.addNewUser(
        body.first_name,
        body.last_name,
        body.birth_date,
        body.email_user,
        body.login_user,
        body.pw_user
    )
    .then(async () => {
        await AppDataSource.destroy()
    }).catch(error => {
        err = error.message
    })
    return err ? err : 'usuário criado'
}

export const updateUser = async (id: number, body: any) => {
    let err
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
    .then(async () => {
        await AppDataSource.destroy()
    }).catch(error => {
        err = error.message
    })
    return err ? err : 'usuário atualizado'
}

export const removeUser = async (id: number) => {
    let err
    let repository = new UserRepository()
    await repository.removeUser(id)
    .then(async () => {
        await AppDataSource.destroy()
    }).catch(error => {
        err = error.message
    })
    return err ? err : 'usuário removido'
}

export const login = async (body: any) => {
    let pwUser, loginUser, emailUser
    pwUser = body.pw_user
    loginUser = body.login_user
    emailUser = body.email_user
    console.log(pwUser, loginUser, emailUser)
    let err
    let repository = new UserRepository()
    await repository.loginUser(pwUser, loginUser, emailUser)
    .then(async () => {
        await AppDataSource.destroy()
    }).catch(error => {
        err = error.message
    })
    return err ? err : 'usuário logado'
}