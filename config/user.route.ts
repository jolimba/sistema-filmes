'use strict'
import {Request, Response} from 'express'
const user = require('../src/controller/UserController')
import { Users } from "../src/entity/Users"

exports.listUsers = async function(req : Request, res : Response) {
  user.getUsers().then((users : Users[]) => res.status(200).json({'users': users}))
}

exports.getOneUser = function(req : Request, res : Response) {
  user.getOneUser(req.params.id).then((user : Users) => res.status(200).json({'user': user}))
}

exports.addNewUser = async function(req : Request, res : Response) {
  user.addNewUser(req.body).then(() => res.status(201).json({'message': 'Usuário criado'}))
}

exports.updateUser = async function(req : Request, res : Response) {
  user.updateUser(req.params.id, req.body).then((result: string) => res.status(200).json({'message': result}))
}

exports.removeUser = async function(req : Request, res : Response) {
  user.removeUser(req.params.id).then((result: string) => res.status(204).json({'message': result}))
}

exports.loginUser = async function(req : Request, res : Response) {
  user.login(req.body).then((result: string) => res.status(200).json(result))
}