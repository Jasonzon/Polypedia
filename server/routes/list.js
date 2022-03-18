const router = require("express").Router()
const pool = require("../db")

////////////////////////////////////////////////routes for lists

//get all lists

router.get("/", async (req,res) => {
    try {
        const allLists = await pool.query("SELECT * FROM list")
        res.json(allLists.rows)
    } catch (err) {
        console.error(err.message)
    }
})

//get a list by id

router.get("/id/:id", async (req,res) => {
    try {
        const {id} = req.params
        const list = await pool.query("SELECT * FROM list WHERE list_id = $1",[id])
        res.json(list.rows[0])
    } catch (err) {
        console.error(err.message)
    }
})

//get the lists by name

router.get("/name/:id", async (req,res) => {
    try {
        const {id} = req.params
        const list = await pool.query("SELECT * FROM list WHERE list_name = $1",[id])
        res.json(list.rows)
    } catch (err) {
        console.error(err.message)
    }
})

//get the lists by color

router.get("/color/:id", async (req,res) => {
    try {
        const {id} = req.params
        const list = await pool.query("SELECT * FROM list WHERE list_color = $1",[id])
        res.json(list.rows)
    } catch (err) {
        console.error(err.message)
    }
})

//get the lists by theme

router.get("/theme/:id", async (req,res) => {
    try {
        const {id} = req.params
        const list = await pool.query("SELECT * FROM list WHERE list_theme = $1",[id])
        res.json(list.rows)
    } catch (err) {
        console.error(err.message)
    }
})

//get the lists by city

router.get("/city/:id", async (req,res) => {
    try {
        const {id} = req.params
        const list = await pool.query("SELECT * FROM list WHERE list_city = $1",[id])
        res.json(list.rows)
    } catch (err) {
        console.error(err.message)
    }
})

//get the lists by user

router.get("/user/:id", async (req,res) => {
    try {
        const {id} = req.params
        const list = await pool.query("SELECT * FROM list WHERE polyuser_id = $1",[id])
        res.json(list.rows)
    } catch (err) {
        console.error(err.message)
    }
})

//get the lists by year

router.get("/year/:id", async (req,res) => {
    try {
        const {id} = req.params
        const list = await pool.query("SELECT * FROM list WHERE list_year = $1",[id])
        res.json(list.rows)
    } catch (err) {
        console.error(err.message)
    }
})

//get the lists by description

router.get("/description/:id", async (req,res) => {
    try {
        const {id} = req.params
        const list = await pool.query("SELECT * FROM list WHERE list_description = $1",[id])
        res.json(list.rows)
    } catch (err) {
        console.error(err.message)
    }
})

//create a list

router.post("/", async (req,res) => {
    try {
        const {name, color, theme, year, city, user, description} = req.body
        const newList = await pool.query("INSERT INTO list (list_name, list_color, list_theme, list_year, list_city, polyuser_id, list_description) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *", [name, color, theme, year, city, user, description])
        res.json(newList.rows[0])

    } catch (err) {
        console.error(err.message)
    }
})

//update list values

router.put("/id/:id", async (req,res) => {
    try {
        const {id} = req.params
        const {name, color, theme, year, city, description} = req.body
        const updateList = await pool.query("UPDATE list SET list_name = $1, list_color = $2, list_theme = $3, list_year = $4, list_city = $5, list_description = $6 WHERE list_id = $7",[name, color, theme, year, city, description,id])
        res.json("List was updated")
    } catch (err) {
        console.error(err.message)
    }
})

//update list validation

router.put("/validation/:id", async (req,res) => {
    try {
        const {id} = req.params
        const {validation} = req.body
        const updateList = await pool.query("UPDATE list SET validation = $1 WHERE list_id = $2",[validation, id])
        res.json("List was updated")
    } catch (err) {
        console.error(err.message)
    }
})

//delete a list

router.delete("/id/:id", async (req,res) => {
    try {
        const {id} = req.params
        const deleteList = await pool.query("DELETE FROM list WHERE list_id = $1",[id])
        res.json("List was deleted")
    } catch (err) {
        console.error(err.message)
    }
})

module.exports = router