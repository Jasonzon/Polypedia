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

app.listen(5000, () => {
    console.log(`server is starting on port 5000`)
})