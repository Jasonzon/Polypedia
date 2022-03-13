const router = require("express").Router()
const pool = require("./db")
const authorization = require("./middleware/authorization")

router.get("/", authorization, async (req, res) => {
    try {

        const user = await pool.query("SELECT * FROM polyuser WHERE polyuser_id = $1",[req.polyuser])
        res.json(user.rows[0])
        
    } catch (err) {
        console.error(err.message)
        res.status(500).send("Server error")
    }
})

module.exports = router