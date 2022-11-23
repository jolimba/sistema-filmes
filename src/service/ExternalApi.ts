import fetch from 'node-fetch';
require('dotenv').config()
const key = process.env.ACCESS_TOKEN_SECRET_TMDB

export const getExternalImage = async (movie: any) => {   
    let url_img: string
    let movie_name_url = movie.replaceAll(' ', '%20')
    await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${key}&query=${movie_name_url}`, {
        method: 'GET',
        cache: 'no-cache',
        headers: {
            'Content-Type': 'application/json'
        },
    })
    .then((res: any) => res.json())
    .then((data: any) => {
        if(data.results[0]) {
            url_img = 'http://image.tmdb.org/t/p/w500' + data.results[0].poster_path
        } else {
            url_img = 'http://image.tmdb.org/t/p/w500' + data.results.poster_path
        }
    })
    return url_img
}

export const getExternalInfo = async (movie: any): Promise<any> => {
    movie = movie.slice(0, movie.length -7)
    let movie_info
    let movie_name_url = movie.replaceAll(' ', '%20')
    // console.log(movie_name_url)
    await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${key}&query=${movie_name_url}`, {
        method: 'GET',
        cache: 'no-cache',
        headers: {
            'Content-Type': 'application/json'
        },
    })
    .then((res: any) => res.json())
    .then((data: any) => {
        if(data.results[0]) {
            movie_info = data.results[0]
        } else {
            movie_info = data.results
        }
    })
    .catch(error => {
        return 'Movie Not Found'
    })
    // console.log(movie_info)
    return movie_info
}
