const express = require("express")
const mysql2 = require("mysql2")
const cors = require("cors")
const multer = require("multer")
const path = require("path")


const app = express()
app.use(express.json())
app.use(express.urlencoded({extended: true }))


const dbpassword = process.env.VITE_DBPWD


const db = mysql2.createConnection({
    host : "localhost",
    user : "root",
    password : dbpassword,
    database : "jdandsonsauto"
})

db.connect((err) => {
    if(err) {
        console.log("Error connecting to database", err)
        return
    }
    console.log("Connected to database")
})



app.listen(3001, () => {
    console.log("listining to port 3001")
})