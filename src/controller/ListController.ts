'use strict'
import { Movies } from '../entity/Movies';
import { Users } from '../entity/Users';
import { MoviesRepository } from '../repository/MoviesRepository';
import { UserRepository } from '../repository/UserRepository';
import { ListRepository } from '../repository/ListRepository';
import { getExternalImage } from '../service/ExternalApi';

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
    let check = await checkMovieInList(user, movie)
    if(!check) {
        return `${movie.series_title} is already in the list`
    }
    let listRepo = new ListRepository()
    let addUser = await listRepo.addToList(user, movie)
    return addUser
}

export const getList = async (id_user: number) => {
    let user = await verifyUser(id_user)
    let listRepo = new ListRepository()
    let list = await listRepo.getUserList(user)
    return getMovieInfo(list)
}

export const removeList = async (id_user: number) => {
    let user = await verifyUser(id_user)
    let listRepo = new ListRepository()
    return listRepo.removeList(user)
}

export const removeOneMovie = async (id_user: number, id_movie: number) => {
    let user = await verifyUser(id_user)
    let movie = await verifyMovie(id_movie)
    let check = await checkMovieInList(user, movie)
    if(check) {
        return `${movie.series_title} is no longer on your list`
    }
    let listRepo = new ListRepository()
    return listRepo.removeOneMovie(user, movie)
}

const getMovieInfo = async (lists: any) => {
    let movies_info = []
    for (let list in lists) {
        movies_info.push({
            movie_info: lists[list],
            movie_img: await getExternalImage(lists[list].movies.series_title)
        })
    }
    return movies_info
}

const checkMovieInList = async (user, movie) : Promise<boolean> => {
    let listRepo = new ListRepository()
    let estaNaLista = await listRepo.checkMovieInList(user, movie)
    return estaNaLista
}