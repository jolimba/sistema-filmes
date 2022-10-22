'use strict'
const jwt = require('jsonwebtoken');
require('dotenv').config()

export const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (!token) throw new Error('Missing token')
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
    console.log(decoded.id)
    if (!decoded.id) throw new Error('Invalid token')
    next()
}