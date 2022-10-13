'use strict'
import { getColdStart, getContentBased } from '../src/controller/RecommendationController'

exports.coldStart = async function(req, res) {
    getColdStart()
    .then(
        rec => res.status(200)
        .json({
            'movie_info': rec
        })
    )
}

exports.contentBased = async function(req, res) {
    getContentBased(req.body.movie_name)
    .then(
        rec => res.status(201)
        .json({
            'movies': rec
        })
    )
}