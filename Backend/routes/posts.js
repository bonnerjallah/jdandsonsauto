const Car = require("../models/carmodel");
const Purchase = require("../models/purchaseModel");
const Customer = require("../models/customermodel");
const ServiceMaintenance = require("../models/serviceMaintenanceModel");
const Calendar = require("../models/calendarModel");
const CustomerSearch = require("../models/carfindermodel");
const AvilibilityQuotes = require("../models/avilibilityAndQuotesModel")
const Message = require('../models/message')






// Add Cars Controller
const addCars = async (req, res) => {
    try {
        const { carname, caryear, drivetrain, transmiss, engine, miles, extcolor, intecolor, stocknum, vinnum, fueltype, condi } = req.body;

        if (!carname || !caryear || !drivetrain || !transmiss || !engine || !miles || !extcolor || !intecolor || !stocknum || !vinnum || !fueltype || !condi) {
            return res.status(400).json({ message: "Please fill all the fields" });
        }

        if (!req.files || req.files.length === 0) {
            return res.status(400).json({ message: "Please upload car images" });
        }

        const carImages = req.files.map(file => file.filename);

        const result = await Car.create({
            carname,
            caryear,
            drivetrain,
            transmiss,
            engine,
            miles,
            extcolor,
            intecolor,
            stocknum,
            vinnum,
            fueltype,
            condi,
            carimages: carImages,
        });

        res.status(201).json({ message: "Car added successfully", result });
    } catch (error) {
        console.error("Error in addCars", error);
        return res.status(500).json({ message: "Internal Server Error", error });
    }
};

// Purchase Controller
const purchase = async (req, res) => {
    try {
        const { auctionName, vechPurch, purchPrice, vechiYear } = req.body;

        // Validate required fields
        if (!auctionName || !vechPurch || !purchPrice || !vechiYear) {
            return res.status(400).json({ message: "Please fill all the fields" });
        }

        // Create a new purchase document
        const newPurchase = new Purchase({
            auctionName,
            vechPurch,
            purchPrice,
            vechiYear,
        });

        // Save the purchase document to the database
        const savedPurchase = await newPurchase.save();

        // Send a success response
        res.status(201).json({
            message: "Purchase created successfully",
            purchase: savedPurchase,
        });
    } catch (error) {
        console.error("Error in purchase", error);
        return res.status(500).json({ message: "Internal Server Error", error });
    }
};


const createCustomer = async (req, res) => {
    try {
        const { custName, custemail, addy, itembought, datepurchase, purchprice } = req.body;

        // Validate required fields
        if (!custName || !custemail || !addy || !itembought || !datepurchase || !purchprice) {
            return res.status(400).json({ error: "All fields are required" });
        }

        // Create a new customer document
        const newCustomer = new Customer({
            custName,
            custemail,
            addy,
            itembought,
            datepurchase,
            purchprice,
        });

        // Save to the database
        const savedCustomer = await newCustomer.save();

        // Respond with success
        res.status(201).json({ message: "Customer created successfully", customer: savedCustomer });
    } catch (error) {
        console.error("Error creating customers", error);
        res.status(500).json({ error: "Internal server error" });
    }
};


const createServiceMaintenance = async (req, res) => {
    try {
        const { vehitype, vehiyear, vehivin, vehistock, mainttype, price } = req.body;

        // Validate required fields
        if (!vehitype || !vehiyear || !vehivin || !vehistock || !mainttype || !price) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Create a new service maintenance record
        const newServiceMaintenance = new ServiceMaintenance({
            vehitype,
            vehiyear,
            vehivin,
            vehistock,
            mainttype,
            price,
        });

        // Save the record to the database
        const savedServiceMaintenance = await newServiceMaintenance.save();

        // Respond with success
        res.status(201).json({
            message: "Service maintenance created successfully",
            serviceMaintenance: savedServiceMaintenance,
        });
    } catch (error) {
        console.error("Error in creating service maintenance", error);
        res.status(500).json({ error: "Internal server error" });
    }
};


const createCalendarEntry = async (req, res) => {
    try {
        const { title, start, end } = req.body;

        // Validate required fields
        if (!title || !start || !end) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Create a new calendar entry
        const newCalendarEntry = new Calendar({
            title,
            start: new Date(start),
            end: new Date(end),
        });

        // Save the entry to the database
        const savedCalendarEntry = await newCalendarEntry.save();

        // Respond with success
        res.status(201).json({
            message: "Appointment created successfully",
            calendarEntry: savedCalendarEntry,
        });
    } catch (error) {
        console.error("Error creating calendar entry", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

const createCarFinder = async (req, res) => {
    try {
        const { searchyear, searchmake, searchmodal, searchmileage, searchprice, desiredfeature, searchcustname, searchcustphone, searchcustemail, searchreachyou } = req.body;

        // Validate required fields
        if (!searchyear || !searchmake || !searchmodal || !searchmileage || !searchprice || !desiredfeature || !searchcustname || !searchcustphone || !searchcustemail || !searchreachyou) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Create a new customer search record
        const newCustomerSearch = new CustomerSearch({
            searchyear,
            searchmake,
            searchmodal,
            searchmileage,
            searchprice,
            desiredfeature,
            searchcustname,
            searchcustphone,
            searchcustemail,
            searchreachyou,
        });

        // Save the record to the database
        const savedCustomerSearch = await newCustomerSearch.save();

        // Respond with success
        res.status(201).json({
            message: "Customer search created successfully",
            customerSearch: savedCustomerSearch,
        });
    } catch (error) {
        console.error("Error creating customer search", error);
        res.status(500).json({ error: "Internal server error" });
    }
};


const createAvilibilityQuotes = async (req, res) => {

    try {

        const { first_name, last_name, phone_number, availability_email, availability_message, car_id, byEmail, byPhone, SMS } = req.body;

        // Validate required fields
        if (!first_name || !last_name || !phone_number || !availability_email || !availability_message || !car_id || !byEmail || !byPhone || !SMS) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Create a new customer search record
        const newAvilibilityQuotes = new AvilibilityQuotes({
            first_name,
            last_name,
            phone_number,
            availability_email,
            availability_message,
            car_id,
            byEmail,
            byPhone,
            SMS,
        });

        // Save the record to the database
        const savedAvilibilityQuotes = await newAvilibilityQuotes.save();

        // Respond with success
        res.status(201).json({
            message: "Customer search created successfully",
            customerSearch: savedAvilibilityQuotes,
        });

    } catch (error) {
        console.error("Error creating customer search", error);
        res.status(500).json({ error: "Internal server error" });
    }
}

const createMessage = async (req, res) => {
    try {
        const { name, email, phone, message } = req.body;

        // Validate required fields
        if (!name || !email || !phone || !message) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Create a new message record
        const newMessage = new Message({
            name,
            email,
            phone,
            message,
        });

        // Save the record to the database
        const savedMessage = await newMessage.save();

        // Respond with success
        res.status(201).json({
            message: "Message created successfully",
            message: savedMessage,
        });
    } catch (error) {
        console.error("Error creating message", error);
        res.status(500).json({ error: "Internal server error" });
    }
};







// Export the controllers
module.exports = { addCars, purchase, createCustomer, createServiceMaintenance, createCalendarEntry, createCarFinder, createAvilibilityQuotes, createMessage};
