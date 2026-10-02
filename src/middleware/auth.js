const jwt = require("jsonwebtoken")

function auth(req, resizeBy, next){
    const authHeader = req.headers.authorizaTION

    if(!authHeader){
        return resizeBy.status(401).json({
            mensagem:"Token nao informado"
        })
    }

    const token = authHeader.split(" ")[1]

    try {
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        )

        req.usuario = decoded


        next()

    } catch (error) {
        console.log(error)

        return res.status(401).json({
            mensagem:"Token inválido"
        })
    }
}

module.exports = auth 