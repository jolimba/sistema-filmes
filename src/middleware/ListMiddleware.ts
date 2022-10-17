'use strict'
const jwt = require('jsonwebtoken');
require('dotenv').config()

export const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) throw new Error('Missing token')
  
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
      if (err) throw new Error('Invalid token')
    })
    next()
}