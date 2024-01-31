const express = require("express")
const mysql2 = require("mysql2")
const cors = require("cors")
const multer = require("multer")
const path = require("path")


const app = express()
app.use(express.json())
app.use(express.urlencoded({extended: true }))


const dbpassword = process.env.VITE_DBPWD
const dbName = process.env.VITE_DatabaseName
const dbUserName = process.env.VITE_UserName


const db = mysql2.createConnection({
    host : "jdnsonsautobrokers.com",
    user : dbUserName,
    password : dbpassword,
    database : dbName
})

db.connect((err) => {
    if(err) {
        console.log("Error connecting to database", err)
        return
    }
    console.log("Connected to database")
})

app.use(cors({
    origin: ['https://jdnsonsautobrokers.com'],
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

app.get('/equip', async (req, res) => {
    try {
        const sql = 'SELECT * FROM vehiclefeatures'
        const [rows] = await db.promise().query(sql)
        return res.json(rows)
        
    } catch (error) {
        console.log("Error fetching equiptment", error)
        res.status(500).json({message: 'Internal server error', error})
    }
})

app.post('/message', async (req, res) => {
    const {firstname, lastname, email, phonenumber, message} = req.body

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

app.post('/availabilityAndQuote', async (req, res) => {
    const { first_name, last_name, phone_number, availability_email, availability_message, car_id } = req.body;
        console.log("received with data", req.body)

        //Get checkbox value to insert
        const contactPref = [];

        for(const key in req.body) {
            const value = req.body[key]

            if(key !== 'first_name' && key !== 'last_name' && value === true ) {
                contactPref.push(req.body[key + '_discription'])
            }
        }

    try {
        if (!first_name || !last_name || !phone_number || !availability_email || !contactPref || !availability_message || !car_id) {
            return res.status(400).json({ error: "All fields require" });
        }

        const sql = "INSERT INTO `availabilityAndQuote`(`first_name`, `last_name`, `phone_number`, `availability_email`, `contactPref`, `availability_message`, `car_id`) VALUES (?, ?, ?, ?, ?, ?, ?)";

        const result = await db.promise().query(sql, [first_name, last_name, phone_number, availability_email, contactPref, availability_message, car_id]);

        if (result[0].affectedRows > 0) {
            return res.status(200).json({ message: "Message sent successfully" });
        } else {
            return res.status(500).json({ message: "Message data entry was not successful" });
        }

    } catch (error) {
        console.error("Error inserting message into database", error);
        return res.status(500).json({ message: "Internal server issue" });
    }
});

app.post('/carfinder', async (req, res) => {
    const { searchyear, searchmake, searchmodal, searchmileage, searchprice, desiredfeature, searchcustname, searchcustphone, searchcustemail, searchreachyou } = req.body

    try {
        if(!searchyear || !searchmake || !searchmodal || !searchmileage || !searchprice || !desiredfeature || !searchcustname || !searchcustphone || !searchcustemail || !searchreachyou) {
            return res.status(400).json({error: 'All fields require'})
        }

        const sql = "INSERT INTO carfinder (searchyear, searchmake, searchmodal, searchmileage, searchprice, desiredfeature, searchcustname, searchcustphone, searchcustemail, searchreachyou) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)"

        const result = await db.promise().query(sql,[searchyear, searchmake, searchmodal, searchmileage, searchprice, desiredfeature, searchcustname, searchcustphone, searchcustemail, searchreachyou])

        if (result[0].affectedRows > 0) {
            return res.status(200).json({message: 'search data inserted successfully'})
        } else {
            return res.status(500).json({message: 'search data entry was not successfull'})
        }
        
    } catch (error) {
        console.error("Error inserting data into database", error)
        res.status(500).json({message: 'Internal server issue'})
    }
})



app.listen(3001, () => {
    console.log("listining to port 3001")
})