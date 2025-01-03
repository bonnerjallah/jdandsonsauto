const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')
const saltRounds = 10;
const jwt = require('jsonwebtoken');


const AdminUser = require('../models/adminmodel');

const jwtSec = process.env.JWT_SECRET
const refToken = process.env.JWT_REFRESH_SECRET


// Function to verify refresh tokens
const verifyRefreshToken = (token, secret) => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, secret, (err, decoded) => {
            if (err) {
                reject(err);
            } else {
                resolve(decoded);
            }
        });
    });
};



const createAdminUser = async (req, res) => {
    try {
        const { firstName, lastName, email, username, Pwd } = req.body;

        // Check if all required fields are provided
        if (!firstName || !lastName || !email || !username || !Pwd) {
            return res.status(400).json({ error: 'All fields required' });
        }
    
        // Validate the email format
        const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ error: 'Invalid email format' });
        }
        
        // Check if the email already exists
        const existingUser = await AdminUser.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'An account with this email already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(Pwd, saltRounds);

        // Create the new AdminUser document
        const adminUser = new AdminUser({
            firstname: firstName,  // Ensure the field name matches your schema
            lastname: lastName,    // Ensure the field name matches your schema
            email,
            username,
            pwd: hashedPassword,   // Ensure the field name matches your schema
        });

        // Save the new AdminUser document to the database
        await adminUser.save();

        // Respond with success message
        res.status(201).json({ message: 'Admin User Created' });
    } catch (error) {
        // Handle errors and respond with 500 status
        res.status(500).json({ error: error.message });
    }
};


const login = async (req, res) => {
   
    try {
        const { username, pwd } = req.body;


        if (!username || !pwd) {
            return res.status(400).json({ message: 'Username and Password are required' });
        }

        // Find the user by username
        const adminUser = await AdminUser.findOne({ username });


        if (adminUser) {

            // Compare the provided password with the stored hash
            const passwordMatch = await bcrypt.compare(pwd, adminUser.pwd);

            if (passwordMatch) {
                // Create user data for the token
                const userData = {
                    id: adminUser._id,
                    firstName: adminUser.firstName,
                    profilePic: adminUser.profilePic,
                };

                 // Generate tokens (access and refresh)
                const accessToken = jwt.sign({ user: userData }, jwtSec, { expiresIn: "5min" });
                const refresh_token = jwt.sign({ user: userData }, refToken, { expiresIn: "1hr" });

                res.cookie("adminToken", accessToken, {httpOnly: true, sameSite: "None", secure: process.env.NODE_ENV === "production"});
                res.cookie("refreshAdminToken", refresh_token, {httpOnly: true, sameSite: "None", secure: process.env.NODE_ENV === "production"});

                return res.status(200).json({ message: "Login Successfully", userData });

            } else {
                return res.status(401).json({message: "Invalid Password"})
            }
            
        } else {
            return res.status(401).json({message: "Invalid Username"})
        }


    } catch (error) {
        console.log("Error logging in user", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};


const refreshAdminToken = async (req, res) => {
    const refreshToken = req.cookies.refreshAdminToken;

    if (!refreshToken) {
        return res.status(401).json({ error: "Admin refresh token missing" });
    }

    try {
        const decoded = await verifyRefreshToken(refreshToken, adminRefToken); 
        const userData = decoded.user;

        const newAccessToken = jwt.sign({ user: userData }, adminJwtSec, { expiresIn: "5min" });
        res.cookie("adminToken", newAccessToken, { httpOnly: true, sameSite: "None", secure: process.env.NODE_ENV === "production" });

        return res.status(200).json({ userData, accessToken: newAccessToken });    
    } catch (err) {
        console.log("Admin refresh token error:", err);
        return res.status(401).json({ error: "Invalid or expired admin refresh token" });
    }
};

const validateAdminAccessToken = (req, res, next) => {
    const accessToken = req.cookies.adminToken;

    if (!accessToken) {
        console.log("Access token is missing");
        return res.status(401).json({ error: "Access token is missing" });
    }

    jwt.verify(accessToken, jwtSec, (err, decoded) => {
        if (err) {
            console.log("Error verifying access token: ", err);
            return res.status(401).json({ error: "Invalid access token" });
        }

        req.user = decoded.user;
        next();
    });
};

const getAdminMember = (req, res) => {
    try {
        if (req.user) {
            return res.json({ valid: true, user: req.user });
        } else {
            console.error("Token validation failed");
            return res.status(401).json({ valid: false, error: "Unauthorized user" });
        }
    } catch (error) {
        console.error("Error fetching admin user:", error);
        return res.status(500).json({ message: "Internal server issue" });
    }
};

const adminLogOut = (req, res) => {
    res.clearCookie("adminToken", {httpOnly: true, sameSite: "None", secure: true})
    res.clearCookie("refreshAdminToken", {httpOnly: true, sameSite: "None", secure: true})

    res.status(200).json({messane: "Logged out successfully"})
}




module.exports = {  createAdminUser, login, refreshAdminToken, validateAdminAccessToken, getAdminMember, adminLogOut };