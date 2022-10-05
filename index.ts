import express, {Application, Request, Response} from 'express'
const app: Application = express()
const cors = require('cors')
const port = process.env.PORT || 3333
let bodyParser = require('body-parser')
let user = require('./config/user.route')
let recommendation = require('./config/recommendation.route')
let userMiddleware = require('./src/middleware/UserMiddleware')

app.use(cors())
app.use(bodyParser.json())

app.post('/users', userMiddleware.verifyBodyUser, user.addNewUser)
app.post('/login', userMiddleware.verifyBodyLogin, user.loginUser)
app.post('/content_based', recommendation.contentBased)
app.put('/users/:id', userMiddleware.verifyBodyUser, user.updateUser)
app.get('/users', user.listUsers)
app.get('/users/:id', user.getOneUser)
app.get('/cold_start', recommendation.coldStart)
app.delete('/users/:id', user.removeUser)
app.get('/ping', (req, res) => {
    res.status(200).send('ping')
})

app.listen(port, () => `server running on port ${port}`)