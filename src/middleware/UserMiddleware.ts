'use strict'
const jwt = require('jsonwebtoken');
require('dotenv').config()
export const verifyBodyLogin = async (req, res, next) => {
    if(!((req.body.login_user || req.body.email_user) && req.body.pw_user)){
        res.status(400).send('Faltam dados para concluir o login')
    } else{ 
        next()
    }
}

export const verifyBodyUser = async (req, res, next) => {
    if(!(
        req.body.first_name &&
        req.body.last_name  &&
        req.body.birth_date &&
        req.body.email_user &&
        req.body.login_user &&
        req.body.pw_user
        )) {
        res.status(400).send('Faltam dados para concluir o login')
    } else { 
        next()
    }
}

export const authenticateUser = (req, res, next) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    console.log(authHeader)
    if(token) {
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err) => {
            if (err){
                res.status(403).json({message:'Invalid token'})
            }
            else {
                next()
            }
        })   
    } else {
        res.status(401).json({message:'Missing token'})
    }
    
}
