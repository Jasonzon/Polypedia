const router = require("express").Router()
const pool = require("../db")

////////////////////////////////////////////////routes for cities

//get all cities

router.get("/", async (req,res) => {
    try {
        const allCities = await pool.query("SELECT * FROM city")
        res.json(allCities.rows)
    } catch (err) {
        console.error(err.message)
    }
})

//get a city by id

router.get("/id/:id", async (req,res) => {
    try {
        const {id} = req.params
        const city = await pool.query("SELECT * FROM city WHERE city_id = $1",[id])
        res.json(city.rows[0])
    } catch (err) {
        console.error(err.message)
    }
})

//get a city by name

router.get("/name/:id", async (req,res) => {
    try {
        const {id} = req.params
        const city = await pool.query("SELECT * FROM city WHERE city_name = $1",[id])
        res.json(city.rows)
    } catch (err) {
        console.error(err.message)
    }
})

//create a city

router.post("/", async (req,res) => {
    try {
        const {name} = req.body
        const newCity = await pool.query("INSERT INTO city (city_name) VALUES ($1) RETURNING *", [name])
        res.json(newCity.rows[0])

    } catch (err) {
        console.error(err.message)
    }
})

//update a city

router.put("/id/:id", async (req,res) => {
    try {
        const {id} = req.params
        const {name} = req.body
        const updateCity = await pool.query("UPDATE city SET city_name = $1 WHERE city_id = $2",[name,id])
        res.json("City was updated")
    } catch (err) {
        console.error(err.message)
    }
})

//update city validation

router.put("/validation/:id", async (req,res) => {
    try {
        const {id} = req.params
        const {validation} = req.body
        const updateCity = await pool.query("UPDATE city SET validation = $1 WHERE city_id = $2",[validation, id])
        res.json("City was updated")
    } catch (err) {
        console.error(err.message)
    }
})

//delete a city

router.delete("/id/:id", async (req,res) => {
    try {
        const {id} = req.params
        const deleteCity = await pool.query("DELETE FROM city WHERE city_id = $1",[id])
        res.json("City was deleted")
    } catch (err) {
        console.error(err.message)
    }
})

module.exports = router