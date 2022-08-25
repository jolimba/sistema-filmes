'use strict'

export const verifyBodyLogin = async (req, res, next) => {
    if(!((req.body.login_user || req.body.email_user) && req.body.pw_user)){
        res.status(401).send('Faltam dados para concluir o login')
    }
    else{ 
        next()
    }
}