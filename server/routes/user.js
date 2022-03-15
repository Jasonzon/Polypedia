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

//get a user by id

router.get("/id/:id", async (req,res) => {
    try {
        const {id} = req.params
        const user = await pool.query("SELECT * FROM polyuser WHERE polyuser_id = $1",[id])
        res.json(user.rows[0])
    } catch (err) {
        console.error(err.message)
    }
})

//get a user by mail

router.get("/mail/:id", async (req,res) => {
    try {
        const {id} = req.params
        const user = await pool.query("SELECT * FROM polyuser WHERE polyuser_mail = $1",[id])
        res.json(user.rows[0])
    } catch (err) {
        console.error(err.message)
    }
})

//get the users by name

router.get("/name/:id", async (req,res) => {
    try {
        const {id} = req.params
        const user = await pool.query("SELECT * FROM polyuser WHERE polyuser_name = $1",[id])
        res.json(user.rows)
    } catch (err) {
        console.error(err.message)
    }
})

//get the users by role

router.get("/role/:id", async (req,res) => {
    try {
        const {id} = req.params
        const user = await pool.query("SELECT * FROM polyuser WHERE polyuser_role = $1",[id])
        res.json(user.rows)
    } catch (err) {
        console.error(err.message)
    }
})

//get the users by password

router.get("/password/:id", async (req,res) => {
    try {
        const {id} = req.params
        const user = await pool.query("SELECT * FROM polyuser WHERE polyuser_password = $1",[id])
        res.json(user.rows)
    } catch (err) {
        console.error(err.message)
    }
})

//get the users by description

router.get("/description/:id", async (req,res) => {
    try {
        const {id} = req.params
        const user = await pool.query("SELECT * FROM polyuser WHERE polyuser_description = $1",[id])
        res.json(user.rows)
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

//update a user without password and role

router.put("/id/:id", async (req,res) => {
    try {
        const {id} = req.params
        const {name, mail, description} = req.body
        const updateUser = await pool.query("UPDATE polyuser SET polyuser_name = $1, polyuser_mail = $2, polyuser_description = $3 WHERE polyuser_id = $4",[name, mail, description, id])
        res.json("User was updated")
    } catch (err) {
        console.error(err.message)
    }
})

//update a user password

router.put("/password/:id", async (req,res) => {
    try {
        const {id} = req.params
        const {password} = req.body
        const updateUser = await pool.query("UPDATE polyuser SET polyuser_password = $1 WHERE polyuser_id = $2",[password,id])
        res.json("User was updated")
    } catch (err) {
        console.error(err.message)
    }
})

//update a user role

router.put("/role/:id", async (req,res) => {
    try {
        const {id} = req.params
        const {role} = req.body
        const updateUser = await pool.query("UPDATE polyuser SET polyuser_role = $1 WHERE polyuser_id = $2",[role,id])
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