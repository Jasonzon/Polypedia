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

//get a list

router.get("/:id", async (req,res) => {
    try {
        const {id} = req.params
        const list = await pool.query("SELECT * FROM list WHERE list_id = $1",[id])
        res.json(list.rows[0])
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

//update a list

router.put("/:id", async (req,res) => {
    try {
        const {id} = req.params
        const {name, color, theme, year, city, description} = req.body
        const updateList = await pool.query("UPDATE list SET list_name = $1, list_color = $2, list_theme = $3, list_year = $4, list_city = $5, list_description = $6 WHERE list_id = $7",[name, color, theme, year, city, description,id])
        res.json("List was updated")
    } catch (err) {
        console.error(err.message)
    }
})

//delete a list

router.delete("/:id", async (req,res) => {
    try {
        const {id} = req.params
        const deleteList = await pool.query("DELETE FROM list WHERE list_id = $1",[id])
        res.json("List was deleted")
    } catch (err) {
        console.error(err.message)
    }
})

module.exports = router