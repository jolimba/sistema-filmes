'use strict'
import fetch from 'node-fetch';
import { MoviesRepository } from '../repository/MoviesRepository';
import { getExternalImage, getExternalInfo } from '../service/ExternalApi'
require('dotenv').config()
const key = process.env.ACCESS_TOKEN_SECRET_TMDB

export const getColdStart = async () => {
    let coldStart, c
    await fetch('http://localhost:8000/cold_start', {
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(res => coldStart = res.json())
    c = await coldStart
    return getMovieInfo(JSON.parse(c))
}

export const getContentBased = async (movie: string) => {
    let getContent, c: any, movie_name_correct = ''
    movie_name_correct = await findMovieName(movie)
    let movie_name = {
        "movie_name": movie_name_correct
    }
    await fetch('http://localhost:8000/content_based', {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(movie_name)
    })
    .then((res: any) => getContent = res.json())
    c = await getContent
    let recommendation = await getMovieInfo({Series_Title: c})
    let movie_wanted = await getOneMovieInfo(movie_name_correct)
    return {
        "wanted_movie": movie_wanted,
        "recommendation": recommendation
    }
}

export const getCollaborative = async (movie_name: string) => {
    let recommendation, find_movie = []
    find_movie = await movieExists(movie_name)
    if(find_movie.length === 0) {
        return 'Movie not found'
    }
    let movie_wanted = {
        "movie_name": find_movie
    }
    await fetch('http://localhost:8000/collaborative', {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(movie_wanted)
    })
    .then((res: any) => recommendation = res.json())
    .catch(err => {
        console.error(err)
    })
    let rec = await recommendation
    let recommender = await getMoviesInfo(rec)
    return recommender
}

const getMoviesInfo = async (movies: Array<string>) => {
    let movies_information = []
    let movie = new MoviesRepository()
    for (let item of movies) {
        await movieExists(item)
        .catch(err => console.log(err))
    }
    for (let item of movies) {
        let info = await movie.getOne(item.slice(0, item.length -7))
        let img = await getExternalImage(item.slice(0, item.length -7))
        if(img !== null && info !== null) {
            movies_information.push({
                movie_info: info,
                movie_img: img
            })
        }
    }
    return movies_information
}

const getMovieInfo = async (movie_names: any) => {
    let movies_info = []
    let movie = new MoviesRepository()
    for (const [key, value] of Object.entries(movie_names.Series_Title)) {
        movies_info.push({
            movie_info: await movie.getOne(value),
            movie_img: await getExternalImage(value)
        })
    }
    return movies_info
}

const findMovieName = async (movie_name: string) => {
    let movie = new MoviesRepository()
    let movie_name_correct = await movie.getOne(movie_name)
    return movie_name_correct.series_title
}

const movieExists = async (movie_name: string) => {
    let movie = new MoviesRepository()
    let movie_name_correct = await movie.getOne(movie_name)
    if(movie_name_correct === null) {
        let new_movie = await handleMovie(movie_name)
        if(!new_movie) {
            return new_movie
        }
        for (let item of new_movie) {
            if(typeof item != "undefined") {
                await movie.addNewMovie(new_movie)
            }
        }
        return new_movie
    }
    return movie_name_correct.series_title
}

const getOneMovieInfo = async (movie_name: string) => {
    let movies_info = []
    let movie = new MoviesRepository()
    movies_info.push({
        movie_info: await movie.getOne(movie_name),
        movie_img: await getExternalImage(movie_name)
    })
    return movies_info
}

const handleMovie = async (movie) => {
    let new_movie = await getExternalInfo(movie)
    // console.log(new_movie)
    return new_movie
}

