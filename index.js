const express = require("express")
const app = express()
const cors = require("cors")
const path = require("path")
const pool = require("./db")
const PORT = process.env.PORT || 5000


//middlewares
app.use(cors())
app.use(express.json())

//if (process.env.NODE_ENV === "production") {
//    app.use(express.static(path.join(__dirname, "client/build")))
//}

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

app.get("*", (req,res) => {
    res.sendFile(path.join(__dirname,"client/build/index.html"))
})

app.listen(PORT, () => {
    console.log(`server is starting on port ${PORT}`)
})