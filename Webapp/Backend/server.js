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

app.use(cors({
    origin: ['http://localhost:5173'],
    methods: ['GET', 'POST', ]
}));

app.use('/carimages', express.static(path.join(__dirname, '../../shared-assets/public/carimages')))


app.get('/cardiscrip/:id?', async (req, res) => {
    try {
        if(req.params.id) {
            const sql = 'SELECT * FROM cardiscrip WHERE ID = ?'
            const [rows] = await db.promise().query(sql, [req.params.id])
            return res.json(rows)
        } else {
            const sql = 'SELECT * FROM cardiscrip';
            const [rows] = await db.promise().query(sql)
            return res.json(rows)
        }
        
    } catch (error) {
        console.log("Error fetching car data", error);
        res.status(500).json({message: "Internal server error", error})
    }
})

app.get('/carImages', async (req, res) => {
    try {
        const sql = 'SELECT * FROM carimage';
        const [rows] = await db.promise().query(sql)
        return res.json(rows)

    } catch (error) {
        console.log("Error fetch car image", error)
        res.status(500).json({message: "Internal server issues"})
    }
})

app.post('/message', async (req, res) => {
    const {firstname, lastname, email, phonenumber, message} = req.body
    console.log("received data", req.data)
    try {
        if(!firstname || !lastname || !email || !phonenumber || !message) {
            return res.status(400).json({error: "All fields require"})
        } 

        const sql = "INSERT INTO message (firstname, lastname, email, phonenumber, message) VALUES (?, ?, ?, ?, ?)"

        const result = await db.promise().query(sql,[firstname, lastname, email, phonenumber, message])

        if(result[0].affectedRows > 0 ) {
            return res.status(200).json({message: "Customer Message sent successfully"})
        } else {
            return res.status(500).json({message: "Internal server issues"})
        }

        
    } catch (error) {
        console.error("Error inserting message data", error);
        res.status(500).json({message: "Internal server issues"})
    }
})


app.listen(3001, () => {
    console.log("listining to port 3001")
})