'use strict'
const user = require('../src/controller/UserController')

exports.listUsers = async function(req, res) {
  user.getUsers().then(users => res.json({'users': users}))
}

exports.getOneUser = function(req, res) {
  user.getOneUser(req.params.id).then(user => res.json({'user': user}))
}

exports.addNewUser = async function(req, res) {
  user.addNewUser(req.body).then(() => res.json({'message': 'Usuário criado'}))
}

exports.updateUser = async function(req, res) {
  user.updateUser(req.params.id, req.body).then(result => res.json({'message': result}))
}

exports.removeUser = async function(req, res) {
  user.removeUser(req.params.id).then(result => res.json({'message': result}))
}

exports.loginUser = async function(req, res) {
  user.login(req.body).then(result => res.json({'message': result}))
}