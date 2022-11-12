'use strict'
import {Request, Response} from 'express'
import { getColdStart, getContentBased } from '../src/controller/RecommendationController'

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
    })
}

exports.contentBased = async function(req : Request, res : Response) {
    getContentBased(req.body.movie_name)
    .then(rec => {
        console.log(rec)
        res.status(201).json({rec})
    })
    
}