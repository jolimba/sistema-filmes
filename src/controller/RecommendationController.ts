'use strict'
import fetch from 'node-fetch';
import { MoviesRepository } from '../repository/MoviesRepository';
import { getExternalImage } from '../service/ExternalApi'
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
    let getContent, c: any
    let movie_name_correct = await findMovieName(movie)
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

const getOneMovieInfo = async (movie_name: string) => {
    let movies_info = []
    let movie = new MoviesRepository()
    movies_info.push({
        movie_info: await movie.getOne(movie_name),
        movie_img: await getExternalImage(movie_name)
    })
    return movies_info
}
