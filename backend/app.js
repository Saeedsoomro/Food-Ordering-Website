const express = require("express");
const product = require("./routes/productRoute")
const user = require("./routes/userRoute.js")
const order = require("./routes/orderRoute")
const cors  = require('cors')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const mysql = require('mysql')
const app = express()

app.use(express.json());
app.use(cors())
app.use(bodyParser.urlencoded({extended:true}))
app.use(cookieParser())
app.use("/api/v1", product)
app.use("/api/v1", user)
app.use("/api/v1", order)

module.exports = app