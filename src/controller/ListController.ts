'use strict'
import { Movies } from '../entity/Movies';
import { Users } from '../entity/Users';
import { MoviesRepository } from '../repository/MoviesRepository';
import { UserRepository } from '../repository/UserRepository';
import { ListRepository } from '../repository/ListRepository';

const verifyUser = async (user: number) : Promise<Users> => {
    let usersRepo = new UserRepository()
    let user_valid = await usersRepo.getOne(user)
    return user_valid
}

const verifyMovie = async (movie: number) : Promise<Movies> => {
    let moviesRepo = new MoviesRepository()
    let movie_valid = await moviesRepo.getOneById(movie)
    return movie_valid
}

export const saveList = async (id_user: number, id_movie: number) => {
    let user = await verifyUser(id_user)
    let movie = await verifyMovie(id_movie)
    let listRepo = new ListRepository()
    return listRepo.addToList(user, movie)
}

export const getList = async (id_user: number) => {
    let user = await verifyUser(id_user)
    let listRepo = new ListRepository()
    return listRepo.getUserList(user)
}

export const removeList = async (id_user: number) => {
    let user = await verifyUser(id_user)
    let listRepo = new ListRepository()
    return listRepo.removeList(user)
}

export const removeOneMovie = async (id_user: number, id_movie: number) => {
    let user = await verifyUser(id_user)
    let movie = await verifyMovie(id_movie)
    let listRepo = new ListRepository()
    return listRepo.removeOneMovie(user, movie)
}