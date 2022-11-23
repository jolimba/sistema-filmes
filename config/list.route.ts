'use strict'
import {Request, Response} from 'express'
const jwt = require('jsonwebtoken');
require('dotenv').config()

import { saveList, getList, removeList, removeOneMovie } from '../src/controller/ListController'
import { AppDataSource } from "../src/data-source"

exports.saveList = async (req : Request, res : Response) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
    saveList(decoded.id, req.body.id_movie)
    .then(rec => {
        res.status(201).json({'message': rec})
    })
    .catch( async (error) => {
        res.status(401).json({'erro': error.message})
    })
}

exports.getList = async (req : Request, res : Response) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
    getList(decoded.id)
    .then(rec => {
        res.status(200).json({'list': rec})
    })
    .catch( async (error) => {
        try {
            await AppDataSource.destroy()
        } catch (error) {
            return res.status(401).json({'erro': error.message})
        }
        res.status(401).json({'erro': error.message})
    })
}

exports.removeList = async (req : Request, res : Response) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
    removeList(decoded.id)
    .then(rec => {
        res.status(200).json({'list': rec})
    })
    .catch( async (error) => {
        try {
            await AppDataSource.destroy()
        } catch (error) {
            return res.status(401).json({'erro': error.message})
        }
        res.status(401).json({'erro': error.message})
    })
}

exports.removeMovie = async (req : Request, res : Response) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
    removeOneMovie(decoded.id, Number(req.params.id_movie))
    .then(rec => {
        res.status(200).json({'list': rec})
    })
    .catch( async (error) => {
        await AppDataSource.destroy()
        res.status(401).json({'erro': error.message})
    })
}
