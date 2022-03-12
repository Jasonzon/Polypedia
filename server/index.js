const express = require("express")
const app = express()
const cors = require("cors")
const pool = require("./db")

//middlewares
app.use(cors())
app.use(express.json())


//register and login routes

app.use("/auth", require("./jwtAuth"))

//dashboard routes

app.use("/dashboard", require("./dashboard"))

////////////////////////////////////////////////routes for lists

//get all lists

app.get("/listes", async (req,res) => {
    try {
        const allLists = await pool.query("SELECT * FROM list")
        res.json(allLists.rows)
    } catch (err) {
        console.error(err.message)
    }
})

//get a list

app.get("/listes/:id", async (req,res) => {
    try {
        const {id} = res.params
        const list = await pool.query("SELECT * FROM list WHERE list_id = $1",[id])
        res.json(list.rows[0])
    } catch (err) {
        console.error(err.message)
    }
})

//create a list

app.post("/listes", async (req,res) => {
    try {
        const {name, color, theme, year, city, user, description} = req.body
        const newList = await pool.query("INSERT INTO list (list_name, list_color, list_theme, list_year, list_city, polyuser_id, list_description) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *", [name, color, theme, year, city, user, description])
        res.json(newList.rows[0])

    } catch (err) {
        console.error(err.message)
    }
})

//update a list

app.put("/listes/:id", async (req,res) => {
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

app.delete("/listes/:id", async (req,res) => {
    try {
        const {id} = req.params
        const deleteList = await pool.query("DELETE FROM list WHERE list_id = $1",[id])
        res.json("List was deleted")
    } catch (err) {
        console.error(err.message)
    }
})

////////////////////////////////////////////////routes for users

//get all users

app.get("/users", async (req,res) => {
    try {
        const allUsers = await pool.query("SELECT * FROM polyuser")
        res.json(allUsers.rows)
    } catch (err) {
        console.error(err.message)
    }
})

//get a user

app.get("/users/:id", async (req,res) => {
    try {
        const {id} = res.params
        const user = await pool.query("SELECT * FROM polyuser WHERE polyuser_id = $1",[id])
        res.json(user.rows[0])
    } catch (err) {
        console.error(err.message)
    }
})

//create a user

app.post("/users", async (req,res) => {
    try {
        const {name, mail, role, password, description} = req.body
        const newUser = await pool.query("INSERT INTO polyuser (polyuser_name, polyuser_mail, polyuser_password, polyuser_description, polyuser_role) VALUES ($1, $2, $3, $4, $5) RETURNING *", [name, mail, password, "", "user"])
        res.json(newUser.rows[0])

    } catch (err) {
        console.error(err.message)
    }
})

//update a user

app.put("/users/:id", async (req,res) => {
    try {
        const {id} = req.params
        const {name, mail, password, description} = req.body
        const updateUser = await pool.query("UPDATE polyuser SET polyuser_name = $1, polyuser_mail = $2, polyuser_password = $3, polyuser_description = $4 WHERE polyuser_id = $5",[name, mail, password, description,id])
        res.json("User was updated")
    } catch (err) {
        console.error(err.message)
    }
})

//delete a user

app.delete("/users/:id", async (req,res) => {
    try {
        const {id} = req.params
        const deleteUser = await pool.query("DELETE FROM polyuser WHERE polyuser_id = $1",[id])
        res.json("User was deleted")
    } catch (err) {
        console.error(err.message)
    }
})

////////////////////////////////////////////////routes for cities

//get all cities

app.get("/villes", async (req,res) => {
    try {
        const allCities = await pool.query("SELECT * FROM city")
        res.json(allCities.rows)
    } catch (err) {
        console.error(err.message)
    }
})

//get a city

app.get("/villes/:id", async (req,res) => {
    try {
        const {id} = res.params
        const city = await pool.query("SELECT * FROM city WHERE city_id = $1",[id])
        res.json(city.rows[0])
    } catch (err) {
        console.error(err.message)
    }
})

//create a city

app.post("/villes", async (req,res) => {
    try {
        const {name} = req.body
        const newCity = await pool.query("INSERT INTO city (city_name) VALUES ($1) RETURNING *", [name])
        res.json(newCity.rows[0])

    } catch (err) {
        console.error(err.message)
    }
})

//update a city

app.put("/villes/:id", async (req,res) => {
    try {
        const {id} = req.params
        const {name} = req.body
        const updateCity = await pool.query("UPDATE city SET city_name = $1 WHERE city_id = $2",[name,id])
        res.json("City was updated")
    } catch (err) {
        console.error(err.message)
    }
})

//delete a city

app.delete("/villes/:id", async (req,res) => {
    try {
        const {id} = req.params
        const deleteCity = await pool.query("DELETE FROM city WHERE city_id = $1",[id])
        res.json("City was deleted")
    } catch (err) {
        console.error(err.message)
    }
})

////////////////////////////////////////////////routes for themes

//get all themes

app.get("/themes", async (req,res) => {
    try {
        const allThemes = await pool.query("SELECT * FROM theme")
        res.json(allThemes.rows)
    } catch (err) {
        console.error(err.message)
    }
})

//get a theme

app.get("/themes/:id", async (req,res) => {
    try {
        const {id} = res.params
        const theme = await pool.query("SELECT * FROM theme WHERE theme_id = $1",[id])
        res.json(theme.rows[0])
    } catch (err) {
        console.error(err.message)
    }
})

//create a theme

app.post("/themes", async (req,res) => {
    try {
        const {name} = req.body
        const newTheme = await pool.query("INSERT INTO theme (theme_name) VALUES ($1) RETURNING *", [name])
        res.json(newTheme.rows[0])

    } catch (err) {
        console.error(err.message)
    }
})

//update a theme

app.put("/themes/:id", async (req,res) => {
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

app.delete("/themes/:id", async (req,res) => {
    try {
        const {id} = req.params
        const deleteTheme = await pool.query("DELETE FROM theme WHERE theme_id = $1",[id])
        res.json("Theme was deleted")
    } catch (err) {
        console.error(err.message)
    }
})

////////////////////////////////////////////////routes for colors

//get all colors

app.get("/color", async (req,res) => {
    try {
        const allColors = await pool.query("SELECT * FROM color")
        res.json(allColors.rows)
    } catch (err) {
        console.error(err.message)
    }
})

//get a color

app.get("/color/:id", async (req,res) => {
    try {
        const {id} = res.params
        const color = await pool.query("SELECT * FROM color WHERE color_id = $1",[id])
        res.json(color.rows[0])
    } catch (err) {
        console.error(err.message)
    }
})

//create a color

app.post("/color", async (req,res) => {
    try {
        const {name} = req.body
        const newColor = await pool.query("INSERT INTO color (color_name) VALUES ($1) RETURNING *", [name])
        res.json(newColor.rows[0])

    } catch (err) {
        console.error(err.message)
    }
})

//update a color

app.put("/color/:id", async (req,res) => {
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

app.delete("/color/:id", async (req,res) => {
    try {
        const {id} = req.params
        const deleteColor = await pool.query("DELETE FROM color WHERE color_id = $1",[id])
        res.json("Color was deleted")
    } catch (err) {
        console.error(err.message)
    }
})

app.listen(5000, () => {
    console.log(`server is starting on port 5000`)
})