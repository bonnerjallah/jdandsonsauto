const mongoose = require('mongoose');
const Car = require("../models/carmodel")
const AvilibilityQuotes = require("../models/avilibilityAndQuotesModel")
const Calendar = require('../models/calendarModel')
const ServiceMaintenance = require('../models/serviceMaintenanceModel')
const Customer = require('../models/customermodel')
const Message = require('../models/message')
const Purchase = require("../models/purchaseModel")
const Carfindermodel = require("../models/carfindermodel")

const getImages = async (req, res) => {
    try {
        // Fetch all car images from the CarImage collection
        const images = await Car.find(); 

        // Return the images in the response
        return res.json(images);
    } catch (error) {
        console.error("Error fetching image data", error);
        return res.status(500).json({ error: "Internal server error" });
    }
};


const getAppointments = async (req, res) => {
    try {
        // Fetch all appointments from the Calendar collection
        const appointments = await Calendar.find(); 

        // Return the appointments in the response
        return res.json(appointments);
    } catch (error) {
        console.error("Error fetching appointment", error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};

const getServiceMaintenance = async (req, res) => {
    try {
        const result = await ServiceMaintenance.find().exec();
        res.json(result);

    } catch (error) {
        console.error("Error fetching service maintenance", error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

const getCustomers = async (req, res) => {
    try {
        // Fetch all customer records from the Customer collection
        const customers = await Customer.find(); 

        // Return the customers in the response
        return res.json(customers);
    } catch (error) {
        console.error("Error fetching customers", error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};

const getMessages = async (req, res) => {
    try {
        // Fetch all message records from the Message collection
        const messages = await Message.find(); 

        // Return the messages in the response
        return res.json(messages);
    } catch (error) {
        console.error("Error fetching messages", error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};

const getPurchases = async (req, res) => {
    try {
        // Fetch all purchase records from the Purchase collection
        const purchases = await Purchase.find(); 

        // Return the purchase records in the response
        return res.json(purchases);
    } catch (error) {
        console.error("Error fetching purchase data", error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};

const getSelectedCarData = async (req, res) => {
    try {
        const { _id } = req.params;

        if (_id) {
           
            const car = await Car.findById(_id).exec(); 

            if (!car) {
                return res.status(404).json({ message: "Car not found" });
            }

            return res.json(car); 
        } else {
            // If no ID is provided, fetch all cars
            const cars = await Car.find().exec(); // Retrieve all cars

            return res.json(cars); // Send the list of all cars
        }
    } catch (error) {
        console.error('Error fetching car data:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};


const getCarFinderData = async (req, res) => {
    try {
        // Fetch all carfinder records
        const carFinders = await Carfindermodel.find();

        return res.json(carFinders);
    } catch (error) {
        console.error("Error fetching carfinder", error);
        return res.status(500).json({ error: "Internal server error" });
    }
};

const getCardiscripData = async (req, res) => {
    try {
        const result = await Car.find().exec();
        res.json(result);

    } catch (error) {
        console.error('Error fetching data:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};


const getAvailabilityAndQuoteData = async (req, res) => {
    try {
        // Fetch all availability and quote records
        const availabilityData = await AvilibilityQuotes.find();

        return res.json(availabilityData);
    } catch (error) {
        console.error("Error fetching availability data", error);
        return res.status(500).json({ error: "Internal server error" });
    }
};





module.exports = { getImages, getAppointments, getServiceMaintenance, getCustomers , getMessages, getPurchases, getSelectedCarData, getCarFinderData, getAvailabilityAndQuoteData, getCardiscripData};
