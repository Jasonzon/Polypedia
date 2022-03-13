const express = require("express")
const app = express()
const cors = require("cors")
const pool = require("./db")

//middlewares
app.use(cors())
app.use(express.json())


//register and login routes

app.use("/auth", require("./routes/jwtAuth"))

//dashboard routes

app.use("/dashboard", require("./routes/dashboard"))

//list routes

app.use("/listes", require("./routes/list"))

//user routes

app.use("/users", require("./routes/user"))

//color routes

app.use("/color", require("./routes/color"))

//theme routes

app.use("/themes", require("./routes/theme"))

//city routes

app.use("/villes", require("./routes/city"))

//obtain lists by color, theme, city

app.get("/color-list/:id", async (req,res) => {
    try {
        const {id} = req.params
        const list = await pool.query("SELECT * FROM list WHERE list_color = $1",[id])
        res.json(list.rows)
    } catch (err) {
        console.error(err.message)
    }
})

app.get("/theme-list/:id", async (req,res) => {
    try {
        const {id} = req.params
        const list = await pool.query("SELECT * FROM list WHERE list_theme = $1",[id])
        res.json(list.rows)
    } catch (err) {
        console.error(err.message)
    }
})

app.get("/city-list/:id", async (req,res) => {
    try {
        const {id} = req.params
        const list = await pool.query("SELECT * FROM list WHERE list_city = $1",[id])
        res.json(list.rows)
    } catch (err) {
        console.error(err.message)
    }
})

app.listen(5000, () => {
    console.log(`server is starting on port 5000`)
})