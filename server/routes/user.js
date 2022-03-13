const router = require("express").Router()
const pool = require("../db")

////////////////////////////////////////////////routes for users

//get all users

router.get("/", async (req,res) => {
    try {
        const allUsers = await pool.query("SELECT * FROM polyuser")
        res.json(allUsers.rows)
    } catch (err) {
        console.error(err.message)
    }
})

//get a user

router.get("/:id", async (req,res) => {
    try {
        const {id} = req.params
        const user = await pool.query("SELECT * FROM polyuser WHERE polyuser_id = $1",[id])
        res.json(user.rows[0])
    } catch (err) {
        console.error(err.message)
    }
})

//create a user

router.post("/", async (req,res) => {
    try {
        const {name, mail, role, password, description} = req.body
        const newUser = await pool.query("INSERT INTO polyuser (polyuser_name, polyuser_mail, polyuser_password, polyuser_description, polyuser_role) VALUES ($1, $2, $3, $4, $5) RETURNING *", [name, mail, password, "", "user"])
        res.json(newUser.rows[0])

    } catch (err) {
        console.error(err.message)
    }
})

//update a user

router.put("/:id", async (req,res) => {
    try {
        const {id} = req.params
        const {name, mail, password, description, role} = req.body
        const updateUser = await pool.query("UPDATE polyuser SET polyuser_name = $1, polyuser_mail = $2, polyuser_password = $3, polyuser_description = $4, polyuser_role = $5 WHERE polyuser_id = $6",[name, mail, password, description, role, id])
        res.json("User was updated")
    } catch (err) {
        console.error(err.message)
    }
})

//delete a user

router.delete("/:id", async (req,res) => {
    try {
        const {id} = req.params
        const deleteUser = await pool.query("DELETE FROM polyuser WHERE polyuser_id = $1",[id])
        res.json("User was deleted")
    } catch (err) {
        console.error(err.message)
    }
})

module.exports = router