const express = require('express');
const mysql2 = require('mysql2');
const cors = require('cors')
const multer = require('multer')
const path = require("path")
const cronJob = require('./cronjob')

const jwt = require('jsonwebtoken');

const cookieParser = require('cookie-parser');


const bcrypt = require('bcrypt')
const saltRounds = 10

const app = express()
app.use(express.json())
app.use(express.urlencoded({extended: true }))

const dbpassword = process.env.VITE_DBPWD
const jwtSec = process.env.VITE_jwtSecret
const refTok = process.env.VITE_jwtRefreshSecret

const db = mysql2.createConnection({
    host: 'jdadmin.jdnsonsautobrokers.com',
    user: 'root',
    password: dbpassword,
    database: 'jdandsonsauto'
})

db.connect((err) => {
    if(err){
        console.error("Error connecting to database:", err)
        return
    }
    console.log("connected to database")
})

app.use(cookieParser());


app.use(cors({
    origin:['https://jdadmin.jdnsonsautobrokers.com'] ,
    methods: ['GET', 'POST', 'DELETE', 'PUT'],
    credentials: true
}))

//Route for car images
app.use('/carimages', express.static(path.join(__dirname, '../../shared-assets/public/carimages')))

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../../shared-assets/public/carimages'))
    },
    filename: (req, file, cb) => {
        console.log(file)
        cb(null, Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({
    storage: storage,
    limits: {fileSize: 5000000},
    fileFilter: (req, file, cb) => {
        const fileType = /jpeg|jpg|png|webp/
        const mimeType = fileType.test(file.mimetype)
        const extname = fileType.test(path.extname(file.originalname))

        if(mimeType && extname) {
            return cb(null, true)
        }
        cb("Give proper file format to upload")
    }
})

//Route for profile pics
app.use('/profilepic', express.static(path.join(__dirname, '../../shared-assets/public/profilepic')))

const profilePicStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../../shared-assets/public/profilepic'))
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname))
    }
})

const profilePicUpload = multer({
    storage: profilePicStorage,
    limits: {fileSize: 5000000},
    fileFilter: (req, file, cb) => {
        const fileType = /jpeg|jpg|png|webp/
        const mimeType = fileType.test(file.mimetype)
        const extname = fileType.test(path.extname(file.originalname))

        if(mimeType && extname) {
            return cb(null, true)
        }
        cb('Give proper file format to upload')
    }
})



app.get('/availabilityandquote', async (req, res) =>{
    try {
        const sql = "SELECT * FROM availabilityandquote";
        const [rows] = await db.promise().query(sql)
        return res.json(rows)
    } catch (error) {
        console.error("Error fetching acailibality data", error)
        return res.status(500).json({error: "Internal server error"})
    }
})

app.get("/carfinder", async (req, res) => {
    try {
        const sql = "SELECT * FROM carfinder";
        const [rows] = await db.promise().query(sql)
        return res.json(rows)
    } catch (error) {
        console.error("Error fetching carfinder", error)
        return res.status(500).json({error: "Internal server error"})
    }
})

app.get("/cardiscrip/:id?", async (req, res) => {
    try{
        if(req.params.id) {
            const sql = 'SELECT * FROM cardiscrip WHERE id = ?'
            const [rows] = await db.promise().query(sql, [req.params.id])
            return res.json(rows)
        } else {
            const sql = 'SELECT * FROM cardiscrip';
            const [rows] = await db.promise().query(sql);
            return res.json(rows)
        }
    } catch (error) {
        console.error('Error fetching data:', error)
        return res.status(500).json({error: 'Internal server error'})
    }
})

app.get('/purchases', async (req, res) => {
    try{
        const sql = 'SELECT * FROM purchases';
        const [rows] = await db.promise().query(sql);
        return res.json(rows)
    } catch (error) {
        console.error("Error fetching purchase data", error)
        return res.status(500).json({error: "Internal server error"})
    }
})

app.get("/message", async (req, res) => {
    try {
        const sql = "SELECT * FROM message";
        const [rows] = await db.promise().query(sql)
        return res.json(rows)
    } catch (error) {
        console.error("Error fetching message", error)
        return res.status(500).json({error: 'Internal server error'})
    }
})

app.get('/customers', async(req, res) => {
    try {
        const sql = "SELECT * FROM customers"
        const [rows] = await db.promise().query(sql)
        return res.json(rows)
    } catch (error) {
        console.log("Error fetching customers", error)
        return res.status(500).json({error: "Internal server error"})
    }
})

app.get('/servicemaintenance', async (req, res) => {
    try {
        const sql = 'SELECT * FROM servicemaintenance'
        const [rows] = await db.promise().query(sql)
        return res.json(rows)
    } catch (error) {
        console.error("Error fetching maintencance", error)
        return res.status(500).json({message: 'Internal server error'})
    }
})

app.get("/calander", async(req, res) => {
    try {
        const sql = 'SELECT * FROM calander'
        const [rows] = await db.promise().query(sql)
        return res.json(rows)
    } catch (error) {
        console.error("Error fetching appointment", error)
        return res.status(500).json({error: 'Internal server error'})
    }
})

app.get('/images', async(req, res) => {
    try{
        const sql = "SELECT * FROM carimage"
        const [rows] = await db.promise().query(sql)
        return res.json(rows)
    } catch (error) {
        console.error("Error fetching imaage data", error)
        return res.status(500).json({error: "Internal server error"})
    }
})

app.delete('/deleteMessage/:messageType/:id', async (req, res) => {
    const { messageType, id } = req.params;

    try {
        let result;
        let sql;

        if (messageType === 'availability') {
            sql = 'DELETE FROM availabilityandquote WHERE ID = ?';
        } else if (messageType === 'carfinder') {
            sql = 'DELETE FROM carfinder WHERE ID = ?';
        } else if (messageType === 'message') {
            sql = 'DELETE FROM message WHERE ID = ?';
        }

        [result] = await db.promise().query(sql, [id]);

        if (result.affectedRows > 0) {
            return res.status(200).json({ message: 'Deleted successfully' });
        } else {
            return res.status(400).json({ message: 'Record not found' });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
});


app.delete("/deleteSvcMaint/:id", async (req, res) => {
    const {id} = req.params
    try{
        const sql = "DELETE FROM servicemaintenance WHERE ID = ?"
        const [result] = await db.promise().query(sql, [id])

        if(result.affectedRows > 0 ) {
            return res.status(200).json({message: "Deleted successfully"})
        } else {
            return res.status(400).json({message: "Record not found"})
        }

    } catch (error) {
        console.log("Error deleting data", error)
        return res.status(500).json({message: "Internal server error"})
    }
})

app.delete('/deleteappt/:id', async (req, res) => {
    const {id} = req.params

    try{
        const sql = "DELETE FROM servicemaintenance WHERE ID = ?"

        const [result] = await db.promise().query(sql, [id])

        if(result.affectedRows > 0) {
            return res.status(200).json({message: "Deleted appointment successfully"})
        } else {
            return res.status(400).json({message: "Appointment not found"})
        }

    } catch (error) {
        console.error("Error deleting appointment", error)
        return res.status(500).json({ error: "Internal server error" });
    }
})

app.delete('/deletecardata/:id', async (req, res) => {
    const {id} = req.params

    try {

        // Delete related records in the child table
        await db.promise().query("DELETE FROM carimage WHERE car_id = ?", [id])

        await db.promise().query("DELETE FROM vehiclefeatures WHERE car_id = ?", [id])

        //Delete the parent record
        const sql = "DELETE FROM cardiscrip WHERE ID = ? ";
        const [result] = await db.promise().query(sql,[id])

        if(result.affectedRows > 0) {
            return res.status(200).json({message: 'Deleted car data successfully'})
        } else {
            return res.status(400).json({message: "Record not found"})
        }

    } catch (error) {
        console.error("Error while processing DELETE request", error)
        return res.status(500).json({error: "Internal server issue"})
    }
})

app.put('/updateSvcMaint', async (req, res) => {
    const { id, vehitype, vehiyear, vehivin, vehistock, mainttype, price } = req.body;

    try {
        if (!vehitype || !vehiyear || !vehivin || !vehistock || !mainttype || !price) {
            return res.status(400).json({ error: "All fields are required" });
        }

        const sql = "UPDATE servicemaintenance SET vehitype=?, vehiyear=?, vehivin=?, vehistock=?, mainttype=?, price=? WHERE ID = ?";

        const [result] = await db.promise().query(sql, [vehitype, vehiyear, vehivin, vehistock, mainttype, price, id]);

        if (result.affectedRows > 0) {
            return res.status(200).json({ message: "Updated successfully" });
        } else {
            return res.status(500).json({ error: "Failed to update service maintenance data" });
        }
    } catch (error) {
        console.error("Error updating data", error);
        return res.status(500).json({ error: "Internal server issue" });
    }
});

app.put('/calander', async (req, res) => {
    const {id, title, start, end} = req.body

    try {
        if(!title || !start || !end) {
            return res.status(400).json({error: "All fields are required"})
        }

        const sql = "UPDATE calander SET title=?, start=?, end=? WHERE ID = ?";

        const [result] = await db.promise().query(sql, [title, start, end, id]);

        if(result.affectedRows > 0) {
            return res.status(200).json({message: "Successfully inserted edited appointment data"})
        } else {
            return res.status(500).json({error: "Update was not successful"})
        }
        
    } catch (error) {
        console.error("Error inserting edited appointment data", error)
        return res.status(500).json({message: "Internal server issue"})
    }
})

app.put('/profilepic', profilePicUpload.single('image'), async (req, res) => {
    try {

        if (!req.file) {
            return res.status(400).json({ message: 'No image provided' });
        }

        const user_id = req.body.userId;
        const image = req.file ? `${req.file.filename}` : '';

        const sql = 'UPDATE user SET profilepic=? WHERE user_id=?'; 

        const result = await db.promise().query(sql, [image, user_id]);


        if (result && result.affectedRows !== undefined) {
            return res.status(200).json({ message: 'Profile pic updated successfully' });
        } else {
            console.log('Update not successful', error);
            return res.status(500).json({ message: 'Internal server issues' });
        }
    } catch (error) {
        console.log('Error updating profile pic', error);
        return res.status(500).json({ error: 'Internal server issue' });
    }
});

app.put('/cardiscripupdate', async (req, res) => {
    const { id, carname, caryear, condi, doors, drivetrain, engine, extcolor, fueltype, intecolor, miles, priceamount, stocknum, transmiss, trim, vinnum } = req.body;

    try {
        if (!carname || !caryear || !condi || !doors || !drivetrain || !engine || !extcolor || !fueltype || !intecolor || !miles || !priceamount || !stocknum || !transmiss || !trim || !vinnum) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const sql = "UPDATE cardiscrip SET carname=?, caryear=?, condi=?, doors=?, drivetrain=?, engine=?, extcolor=?, fueltype=?, intecolor=?, miles=?, priceamount=?, stocknum=?, transmiss=?, trim=?, vinnum=? WHERE ID = ?";

        const [result] = await db.promise().query(sql, [carname, caryear, condi, doors, drivetrain, engine, extcolor, fueltype, intecolor, miles, priceamount, stocknum, transmiss, trim, vinnum, id]);

        if (result.affectedRows > 0) {
            return res.status(200).json({ message: "Successfully updated the car description" });
        } else {
            return res.status(500).json({ message: 'Update was not successful' });
        }

    } catch (error) {
        console.log("Error updating car description", error);
        return res.status(500).json({ message: "Internal server error" });
    }
});

app.post("/cardiscrip", upload.array('images', 25), async (req, res) => {
    const { carname, caryear, drivetrain, transmiss, engine, miles, extcolor, intecolor, stocknum, vinnum, fueltype, condi, priceamount, trim, doors } = req.body;

    try {
        if (!carname || !caryear || !drivetrain || !transmiss || !engine || !miles || !extcolor || !intecolor || !stocknum || !vinnum || !fueltype || !condi || !priceamount || !trim || !doors) {
            return res.status(400).json({ error: "All fields are required" });
        }

        const images = req.files.map(file => file.filename);

        // Step 1: Insert Description Data
        const insertDescriptionQuery = "INSERT INTO cardiscrip (carname, caryear, drivetrain, transmiss, engine, miles, extcolor, intecolor, stocknum, vinnum, fueltype, condi, priceamount, trim, doors) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

        const [descriptionResult] = await db.promise().query(insertDescriptionQuery, [carname, caryear, drivetrain, transmiss, engine, miles, extcolor, intecolor, stocknum, vinnum, fueltype, condi, priceamount, trim, doors]);

        // Get the generated primary key from the description insertion
        const car_id = descriptionResult.insertId;

        // Step 2: Insert Image Data with references to the description
        const insertImageQuery = "INSERT INTO carimage (car_id, image_url) VALUES (?, ?)";
        
        // Insert each image into the image table
        for (const imagePath of images) {
            await db.promise().query(insertImageQuery, [car_id, imagePath]);
        }

        // Insert Checkbox Data into Database
        const selectedFeatures = [];

        for (const key in req.body) {
            const value = req.body[key];
        
            // Check if it's a checkbox and the value is "true"
            if (key !== 'carname' && key !== 'caryear' && value === 'true') {
                selectedFeatures.push(req.body[key + '_description']);
            }
        }

        if (selectedFeatures.length > 0) {
            const sql = 'INSERT INTO vehiclefeatures (car_id, features) VALUES (?, ?)';
            for (const featureName of selectedFeatures) {
                await db.promise().query(sql, [car_id, featureName]);
            }
        }

        return res.status(200).json({ message: 'Car description and images created successfully' });

    } catch (error) {
        console.error('Error inputting Vehicle', error);
        return res.status(500).json({ error: "Internal server error" });
    }
});

app.post("/purchases", async (req, res) => {
    const {auctionName, vechPurch, purchPrice, vechiYear} = req.body;

    try{
        if(!auctionName || !vechPurch || !purchPrice || !vechiYear) {
            return res.status(400).json({error: 'All field require'})
        }

        const sql = "INSERT INTO purchases (auctionName, vechPurch, purchPrice, vechiYear) VALUES (?, ?, ?, ?)"

        const result = await db.promise().query(sql, [auctionName, vechPurch, purchPrice, vechiYear ])

        if (result[0].affectedRows > 0) {
            return res.status(200).json({ message: 'Purchase created successfully' });
        } else {
            return res.status(500).json({ message: 'Purchase data entry was not successful' });
        }

    } catch (error) {
        console.error("Error inputting Purchases", error)
        return res.status(500).json({error: 'Internal server error'})
    }
})

app.post("/customers", async (req, res) => {
    const {custName, custemail, addy, itembought, datepurchase, purchprice} = req.body

    try {
        if(!custName || !custemail || !addy || !itembought || !datepurchase || !purchprice) {
            return res.status(400).json({error: 'All field require'})
        }

        const sql= 'INSERT INTO customers ( custName, custemail, addy, itembought, datepurchase, purchprice ) VALUE (?,?,?,?,?,?)';

        const result = await db.promise().query(sql, [ custName, custemail, addy, itembought, datepurchase, purchprice])
        
        if(result[0].affectedRows > 0) {
            return res.status(200).json({message: 'Customers created successfully'})
        } else {
            return res.status(500).json({message: 'Customers data entry was not successful'})
        }

    } catch (error) {
        console.error("Error creating customers", error)
        return res.status(500).json({error: 'Internal server error'})
    }
})

app.post('/servicemaintenance', async (req, res) => {
    const {vehitype, vehiyear, vehivin, vehistock, mainttype, price } = req.body

    try {
        if(!vehitype || !vehiyear || !vehivin || !vehistock || !mainttype, !price) {
            return res.status(400).json({message: 'All field require'})
        }

        const sql = "INSERT INTO servicemaintenance (vehitype, vehiyear, vehivin, vehistock, mainttype, price) VALUE (?, ?, ?, ?, ?, ?)"

        const result = await db.promise().query(sql, [vehitype, vehiyear, vehivin, vehistock, mainttype, price])

        if(result[0].affectedRows > 0) {
            return res.status(200).json({message: "Maintenance created successfully"})
        } else {
            return res.status(400).json({message: 'Internal server error'})
        }

    } catch (error) {
        console.error("Error inputing maintencance data", error)
        return res.status(500).json({error: 'Internal server error'})
    }
})

app.post('/calander', async (req, res) => {
    const { title, start, end } = req.body;

    console.log(req.body)

    try {
        if (!title || !start || !end) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const sql = "INSERT INTO calander (title, start, end) VALUES (?, ?, ?)";

        const result = await db.promise().query(sql, [title, start, end]);

        if (result[0].affectedRows > 0) {
            return res.status(200).json({ message: "Appointment created successfully" });
        } else {
            return res.status(500).json({ message: "Internal server error" });
        }
    } catch (error) {
        console.error("Error inserting appointment", error);
        return res.status(500).json({ error: "Internal server error" });
    }
});

app.post('/register', async (req, res) => {
    const { firstName, lastName, email, username, Pwd } = req.body;

    try {
        // Basic input validation
        if (!firstName || !lastName || !email || !username || !Pwd) {
            return res.status(400).json({ error: 'All fields required' });
        }

        // Validate email format using a regular expression
        const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ error: 'Invalid email format' });
        }

        // Validate password complexity (e.g., at least 8 characters)
        if (Pwd.length < 8) {
            return res.status(400).json({ error: 'Password must be at least 8 characters long' });
        }

        // Hash the password using bcrypt
        const hash = await bcrypt.hash(Pwd, saltRounds);

        const sql = "INSERT INTO user (firstName, lastName, email, username, hash) VALUES (?, ?, ?, ?, ?)";

        const [result] = await db.promise().query(sql, [firstName, lastName, email, username, hash]);

        return res.status(200).json({ message: 'User profile created successfully' });
    } catch (err) {
        return res.status(500).json({ error: 'An error occurred', details: err.message });
    }
});

app.post('/login', async (req, res) => {
    try {
        const { username, pwd } = req.body;

        if (!username || !pwd) {
            return res.status(400).json({ error: 'Username and password are required' });
        }

        const sql = 'SELECT * FROM user WHERE username = ?';

        const [result] = await db.promise().query(sql, [username]);


        if (result.length > 0) {
            const hashedPassword = result[0].hash; //'hash' is the name of your password column

            const passwordMatch = await bcrypt.compare(pwd, hashedPassword);

            if (passwordMatch) {
                const userData = {
                    id: result[0].user_id,
                    firstName: result[0].firstName,
                    profilePic: result[0].profilepic
                };
    
                //Generate a JWT token
                const accessToken = jwt.sign({user: userData}, jwtSec, {expiresIn: '1m'});

                const refreshToken = jwt.sign({user: userData}, refTok, {expiresIn: '1h'})

                //Send token to the client
                res.cookie('token', accessToken);

                //send refresh token
                res.cookie('refreshToken', refreshToken, { httpOnly: true })

                //send the data in the response to the frontend
                return res.status(200).json({ 
                    message: 'Login successful', 
                    userData: userData, 
                });
            } else {
                // Password doesn't match
                return res.status(401).json({ error: 'Invalid username or password' });
            }
        } else {
            // User not found in the database
            return res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        console.error('Error logging in:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
});

//Middleware to validate access token
const validateAccessToken = (req, res, next) => {
    const accessToken = req.cookies.token; //Because token was sent with cookie
    if(!accessToken) {
        return res.status(401).json({error: 'Access token is missing'})
    }

    jwt.verify(accessToken, jwtSec, (err, decoded) => {
        if(err) {
            console.error("Error verifying access token", err)
            return res.status(401).json({error: 'Invalid access token' })
        }

        //If token is valid, set the user information in req.user
        req.user = decoded.user
        next()
    })
}

//Refresh token route
app.post('/refresh_token', (req, res) => {
    // Check if a valid refresh token is present in the request cookies
    const refreshToken = req.cookies.refreshToken;

    if(!refreshToken) {
        return res.status(401).json({error: 'Refresh token is missing'})
    }

    //Verify the refresh token
    jwt.verify(refreshToken, refTok, (err, decoded) => {
        if(err) {

            // Token is invalid or has expired
            return res.status(401).json({error: 'Invalid or expired refresh token'})
        }

        // Extract user data from the decoded refresh token payload
        const userData = decoded.user;

        //Generate a new access token
        const newAccessToken = jwt.sign({user: userData}, jwtSec, {expiresIn: '1m'});

        //Send the new access token back to the client
        res.cookie('token', newAccessToken)
        res.status(200).json({message: 'Token refresh successfully'})
    })
})

app.get('/user', validateAccessToken,  (req, res) => {
    try{
        if(req.user) {
            return res.json({valid: true, user: req.user})
        } else {
            console.error("Token validation failed")
            return res.status(401).json({valid: false, error: 'Unauthorized user'})
        }
    } catch (error) {
        console.error("Error:", error);
        return res.status(500).json({error: 'Internal server error'})
    }
})

app.post('/logout', (req, res) => {
    res.clearCookie('token', {httpOnly: true, sameSite: 'None', secure: true })
    res.clearCookie('refreshToken', {httpOnly: true, sameSite: 'None', secure: true })

    res.status(200).json({message: 'Logged out successfully'})
})

app.listen(3001, () => {
    console.log("lestening to port 3001")
})

cronJob.start()