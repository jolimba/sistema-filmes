'use strict'
import fetch from 'node-fetch';
const key = 'f43708e982fdc8109b5b492ef979cfa5'

export const getColdStart = async () => {
    let coldStart, c
    await fetch('http://localhost:8000/cold_start')
    .then(res => coldStart = res.json())
    c = await coldStart
    let movie = toArray(JSON.parse(c))
    return ordenaDados(movie)
}

export const getContentBased = async (movie: string) => {
    let getContent, c: any
    let movie_name = {
        "movie_name": movie
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
    .then(res => getContent = res.json())
    c = await getContent
    let data = ordenaDados(toArrayContentBased(c))
    return data
}

const ordenaDados = async (movie: any) => {
    console.log(movie)
    let dados_ordenados = []
    let tamanho = movie[0].length
    for (let i = 0; i < tamanho; i++) {
        dados_ordenados.push([
          movie[0][i],
          movie[1][i],
          await getExternalImage(movie[0][i])
        ]);
    }
    return dados_ordenados
}

const toArrayContentBased = (data: any) => {
    let arr = data.map(function(obj) {
        return Object.keys(obj).map(function(key) {
            return obj[key];
        });
    });
    return arr
}

const toArray = (data: any) => {
    let title = Object.keys(data.Series_Title).map((key) => data.Series_Title[key])
    let rating = Object.keys(data.IMDB_Rating).map((key) => data.IMDB_Rating[key])
    return [title, rating]
}

const getExternalImage = async (movie) => {   
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

