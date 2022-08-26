import express, {Application, Request, Response} from 'express'
const app: Application = express()
const port = process.env.PORT || 3333
var bodyParser = require('body-parser')
var user = require('./config/user.route')
var userMiddleware = require('./src/middleware/UserMiddleware')

app.use(bodyParser.json())

app.post('/users', userMiddleware.verifyBodyUser, user.addNewUser)
app.post('/login', userMiddleware.verifyBodyLogin, user.loginUser)
app.put('/users/:id', userMiddleware.verifyBodyUser, user.updateUser)
app.get('/users', user.listUsers)
app.get('/users/:id', user.getOneUser)
app.delete('/users/:id', user.removeUser)
app.get('/ping', (req, res) => {
    res.status(200).send('ping')
})

app.listen(port, () => `server running on port ${port}`)