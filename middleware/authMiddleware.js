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

module.exports = {
    authenticateToken
}