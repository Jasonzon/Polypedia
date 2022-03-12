const router = require("express").Router()
const pool = require("./db")
const bcrypt = require("bcrypt")
const jwtGenerator = require("./utils/jwtGenerator")
const validInfo = require("./middleware/validinfo")
const authorization = require("./middleware/authorization")

//registering

router.post("/register", validInfo, async (req,res )=> {
    try {
        const {name, mail, password, description} = req.body
        const user = await pool.query("SELECT * FROM polyuser WHERE polyuser_mail = $1",[mail])
        
        if (user.rows.length !== 0) {
            return res.status(401).send("User already exists")
        }

        const saltRound = 10
        const salt = await bcrypt.genSalt(saltRound)
        const bcryptPassword = await bcrypt.hash(password, salt)

        const newUser = await pool.query("INSERT INTO polyuser (polyuser_name, polyuser_mail, polyuser_password, polyuser_description, polyuser_role) VALUES ($1, $2, $3, $4, $5) RETURNING *",[name, mail, bcryptPassword, "", "user"])

        const token = jwtGenerator(newUser.rows[0].polyuser_id)
        res.json({token})


        
    } catch (err) {
        console.error(err.message)
        res.status(500).send("Server error")
    }
})

//login route

router.post("/login", validInfo, async (req,res) => {
    try {
        
        const {mail, password} = req.body
        const user = await pool.query("SELECT * FROM polyuser WHERE polyuser_mail = $1",[mail])

        if (user.rows.length === 0) {
            return res.status(401).send("Password or Email is incorrect")
        }

        const validPassword = await bcrypt.compare(password,user.rows[0].polyuser_password)
        if (!validPassword) {
            return res.status(401).send("Password or Email is incorrect")
        }

        const token = await jwtGenerator(user.rows[0].polyuser_id)
        res.json({token})

    } catch (err) {
        console.error(err.message)
        res.status(500).send("Server error")
    }
})

router.get("/verify", authorization, async (req,res) => {
    try {
        res.json(true)
    } catch (err) {
        console.error(err.message)
        res.status(500).send("Server error")
    }
})

module.exports = router

