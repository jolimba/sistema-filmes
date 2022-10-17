'use strict'
import { saveList, getList, removeList, removeOneMovie } from '../src/controller/ListController'
import { AppDataSource } from "../src/data-source"

exports.saveList = async (req, res) => {
    saveList(req.body.id_user, req.body.id_movie)
    .then(rec => {
        res.status(201).json({'message': rec})
    })
    .catch( async (error) => {
        await AppDataSource.destroy()
        res.status(401).json({'erro': error.message})
    })
}

exports.getList = async (req, res) => {
    getList(req.params.id_user)
    .then(rec => {
        res.status(200).json({'list': rec})
    })
    .catch( async (error) => {
        await AppDataSource.destroy()
        res.status(401).json({'erro': error.message})
    })
}

exports.removeList = async (req, res) => {
    removeList(req.params.id_user)
    .then(rec => {
        res.status(200).json({'list': rec})
    })
    .catch( async (error) => {
        await AppDataSource.destroy()
        res.status(401).json({'erro': error.message})
    })
}

exports.removeMovie = async (req, res) => {
    removeOneMovie(req.params.id_user, req.params.id_movie)
    .then(rec => {
        res.status(200).json({'list': rec})
    })
    .catch( async (error) => {
        await AppDataSource.destroy()
        res.status(401).json({'erro': error.message})
    })
}