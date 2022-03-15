const router = require("express").Router()
const pool = require("../db")

////////////////////////////////////////////////routes for themes

//get all themes

router.get("/", async (req,res) => {
    try {
        const allThemes = await pool.query("SELECT * FROM theme")
        res.json(allThemes.rows)
    } catch (err) {
        console.error(err.message)
    }
})

//get a theme by id

router.get("/id/:id", async (req,res) => {
    try {
        const {id} = req.params
        const theme = await pool.query("SELECT * FROM theme WHERE theme_id = $1",[id])
        res.json(theme.rows[0])
    } catch (err) {
        console.error(err.message)
    }
})

//get a theme by name

router.get("/name/:id", async (req,res) => {
    try {
        const {id} = req.params
        const theme = await pool.query("SELECT * FROM theme WHERE theme_name = $1",[id])
        res.json(theme.rows[0])
    } catch (err) {
        console.error(err.message)
    }
})

//create a theme

router.post("/", async (req,res) => {
    try {
        const {name} = req.body
        const newTheme = await pool.query("INSERT INTO theme (theme_name) VALUES ($1) RETURNING *", [name])
        res.json(newTheme.rows[0])

    } catch (err) {
        console.error(err.message)
    }
})

//update a theme

router.put("/:id", async (req,res) => {
    try {
        const {id} = req.params
        const {name} = req.body
        const updateTheme = await pool.query("UPDATE theme SET theme_name = $1 WHERE theme_id = $2",[name,id])
        res.json("Theme was updated")
    } catch (err) {
        console.error(err.message)
    }
})

//delete a theme

router.delete("/:id", async (req,res) => {
    try {
        const {id} = req.params
        const deleteTheme = await pool.query("DELETE FROM theme WHERE theme_id = $1",[id])
        res.json("Theme was deleted")
    } catch (err) {
        console.error(err.message)
    }
})

module.exports = router