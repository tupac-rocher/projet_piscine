const jwt = require('jsonwebtoken')

//Middleware authorization with jwt
const authenticateToken = (req, res, next) => {
    const token = req.cookies.jwt
    if(token == null) return res.sendStatus(401)
    try {
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) =>{
                req.user = user
                next()
        })
    } catch(e) {
        console.log(e)
    }
}

const authenticateTokenStudent = (req, res, next) => {
    const token = req.cookies.jwt
    if(token == null) return res.sendStatus(401)
    try {
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) =>{
            if(typeof user.studentFirstName != "undefined"){
                console.log(user)
                req.user = user
                next()
            } else {
                res.sendStatus(401)
            }
        })
    } catch(e) {
        console.log(e)
    }
}

const authenticateTokenAdmin = (req, res, next) => {
    const token = req.cookies.jwt
    if(token == null) return res.sendStatus(401)
    try {
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) =>{
            if(typeof user.adminPseudo != "undefined"){
                req.user = user
                next()
            } else {
                res.sendStatus(401)
            }

        })
    } catch(e) {
        console.log(e)
    }
}

module.exports = {
    authenticateToken,
    authenticateTokenStudent,
    authenticateTokenAdmin
}