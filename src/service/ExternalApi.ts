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

