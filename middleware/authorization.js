const jwt = require("jsonwebtoken")
require("dotenv").config()

module.exports = async (req, res, next) => {
    try {
        
        const jwtToken = await req.header("token")
        if (!jwtToken) {
            return res.status(403).send("Not Authorized")
        }
        const payload = jwt.verify(jwtToken, process.env.jwtSecret)
        req.polyuser = payload.polyuser
        next()

    } catch (err) {
        console.error(err.message)
        return res.status(403).send("Not Authorized")
    }
}