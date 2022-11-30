'use strict'
import {Request, Response} from 'express'
import { getColdStart, getContentBased, getCollaborative } from '../src/controller/RecommendationController'
import { getList,} from '../src/controller/ListController'
const jwt = require('jsonwebtoken');
import { AppDataSource } from "../src/data-source"

exports.coldStart = async function(req : Request, res : Response) {
    getColdStart()
    .then(
        rec => res.status(200)
        .json({
            'movie_info': rec
        })
    )
    .catch(err => {
        return {"error": err.message}
    }).catch(async (err) => {
        try {
            await AppDataSource.destroy()
        } catch (error) {
            return res.status(401).json({'erro': error})
        }
    })
}

exports.contentBased = async function(req : Request, res : Response) {
    getContentBased(req.body.movie_name)
    .then(rec => {
        res.status(201).json({rec})
    }).catch(err => {
        return {"error": err.message}
    }).catch(async (err) => {
        try {
            await AppDataSource.destroy()
        } catch (error) {
            return res.status(401).json({'erro': error})
        }
    })
}

exports.collaborative = async function(req : Request, res : Response) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
    let random_movie = await getOneItemFromUserList(decoded.id)
    getCollaborative(random_movie)
    .then(recommendation => {
        res.status(200).json({recommendation})
    }).catch(async (err) => {
        try {
            await AppDataSource.destroy()
        } catch (error) {
            return res.status(401).json({'erro': error})
        }
    })
}

const getOneItemFromUserList = async (user_id): Promise<string> => {
    let user_list = await getList(user_id)
    let item = user_list[Math.floor(Math.random() * user_list.length)]
    console.log(item.movie_info.movies.series_title)
    return item.movie_info.movies.series_title
}