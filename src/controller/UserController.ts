'use strict'
import { UserRepository } from "../repository/UserRepository"
import { AppDataSource } from "../data-source"

export const getUsers = async () => {
    var users
    let repository = new UserRepository()
    await repository.getAll()
    .then(user => {
        users = user
        AppDataSource.destroy()
    }).catch(error => console.log(error))
    return users
}

export const getOneUser = async (id: number) => {
    var users
    let repository = new UserRepository()
    await repository.getOne(id)
    .then(user => {
        users = user
        AppDataSource.destroy()
    }).catch(error => console.log(error))
    return users
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
    AppDataSource.destroy()
    return 'usuário criado'
}

export const updateUser = async (id: number, body: any) => {
    console.log(body)
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
    AppDataSource.destroy()
    return 'usuário atualizado'
}

export const removeUser = async (id: number) => {
    console.log(id)
    let repository = new UserRepository()
    await repository.removeUser(id)
    AppDataSource.destroy()
    return 'removido'
}