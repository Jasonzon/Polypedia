const Pool = require("pg").Pool
require("dotenv").config()

const pool = new Pool({
    user:process.env.USER,
    password:process.env.PASSWORD,
    host:process.env.HOST,
    database:process.env.DATABASE,
    port:process.env.PORT
})

module.exports = pool