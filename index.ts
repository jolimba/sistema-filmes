import express, {Application, Request, Response} from 'express'
require('dotenv').config()
const app: Application = express()
const cors = require('cors')
const port = process.env.PORT || 3333
let bodyParser = require('body-parser')
let userMiddleware = require('./src/middleware/UserMiddleware')
let listMiddleware = require('./src/middleware/ListMiddleware')
let user = require('./config/user.route')
let recommendation = require('./config/recommendation.route')
let list = require('./config/list.route')

app.use(cors())
app.use(bodyParser.json())

// usuário - acesso interno
app.post('/users', userMiddleware.verifyBodyUser, user.addNewUser)
app.post('/login', userMiddleware.verifyBodyLogin, user.loginUser)
app.put('/users/:id', userMiddleware.verifyBodyUser, user.updateUser)
app.get('/users', user.listUsers)
app.get('/users/:id', user.getOneUser)
app.delete('/users/:id', user.removeUser)
// recomendação - qualquer usuário
app.post('/content_based', recommendation.contentBased)
app.get('/cold_start', recommendation.coldStart)
// lista - usuários logados
app.post('/list', list.saveList)
app.get('/list', listMiddleware.authenticateToken, list.getList)
app.delete('/list', list.removeList)
app.delete('/list/:id_movie', listMiddleware.authenticateToken, list.removeMovie)
// ping (rota teste)
app.get('/ping', (res : Response) => {
    res.status(200).send('pong')
})

app.listen(port, () => `server running on port ${port}`)