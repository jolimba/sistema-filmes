'use strict'
const user = require('../src/controller/UserController')

exports.listUsers = async function(req, res) {
  user.getUsers().then(users => res.status(200).json({'users': users}))
}

exports.getOneUser = function(req, res) {
  user.getOneUser(req.params.id).then(user => res.status(200).json({'user': user}))
}

exports.addNewUser = async function(req, res) {
  user.addNewUser(req.body).then(() => res.status(201).json({'message': 'Usuário criado'}))
}

exports.updateUser = async function(req, res) {
  user.updateUser(req.params.id, req.body).then(result => res.status(200).json({'message': result}))
}

exports.removeUser = async function(req, res) {
  user.removeUser(req.params.id).then(result => res.status(204).json({'message': result}))
}

exports.loginUser = async function(req, res) {
  user.login(req.body).then(result => res.status(200).json(result))
}