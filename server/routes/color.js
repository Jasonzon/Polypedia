const router = require("express").Router()
const pool = require("../db")

////////////////////////////////////////////////routes for colors

//get all colors

router.get("/", async (req,res) => {
    try {
        const allColors = await pool.query("SELECT * FROM color")
        res.json(allColors.rows)
    } catch (err) {
        console.error(err.message)
    }
})

//get a color by id

router.get("/id/:id", async (req,res) => {
    try {
        const {id} = req.params
        const color = await pool.query("SELECT color_name FROM color WHERE color_id = $1",[id])
        res.json(color.rows[0])
    } catch (err) {
        console.error(err.message)
    }
})

//get a color by id

router.get("/name/:id", async (req,res) => {
    try {
        const {id} = req.params
        const color = await pool.query("SELECT color_name FROM color WHERE color_name = $1",[id])
        res.json(color.rows[0])
    } catch (err) {
        console.error(err.message)
    }
})

//create a color

router.post("/", async (req,res) => {
    try {
        const {name} = req.body
        const newColor = await pool.query("INSERT INTO color (color_name) VALUES ($1) RETURNING *", [name])
        res.json(newColor.rows[0])

    } catch (err) {
        console.error(err.message)
    }
})

//update a color

router.put("/:id", async (req,res) => {
    try {
        const {id} = req.params
        const {name} = req.body
        const updateColor = await pool.query("UPDATE color SET color_name = $1 WHERE color_id = $2",[name,id])
        res.json("Color was updated")
    } catch (err) {
        console.error(err.message)
    }
})

//delete a color

router.delete("/:id", async (req,res) => {
    try {
        const {id} = req.params
        const deleteColor = await pool.query("DELETE FROM color WHERE color_id = $1",[id])
        res.json("Color was deleted")
    } catch (err) {
        console.error(err.message)
    }
})

module.exports = router