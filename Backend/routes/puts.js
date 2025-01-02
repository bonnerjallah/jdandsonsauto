const Car = require("../models/carmodel");
const Calendar = require("../models/calendarModel");
const ServiceMaintenance = require('../models/serviceMaintenanceModel'); 
const path = require("path");
const fs = require("fs");



const updateCarDescription = async (req, res) => {
    try {
        const { _id, carname, caryear, condi, doors, drivetrain, engine, extcolor, fueltype, intecolor, miles, priceamount, stocknum, transmiss, trim, vinnum, features} = req.body;


        const imageToEdit = req.files ? req.files.map(file => path.basename(file.path)) : []; // Collect file paths for multiple images


        // Find the car document to update
        const carToEdit = await Car.findById(_id);

        if (!carToEdit) {
            return res.status(404).json({ message: "Car not found" });
        }

        // Update fields only if they are provided
        carToEdit.carname = carname || carToEdit.carname;
        carToEdit.caryear = caryear || carToEdit.caryear;
        carToEdit.condi = condi || carToEdit.condi;
        carToEdit.doors = doors || carToEdit.doors;
        carToEdit.drivetrain = drivetrain || carToEdit.drivetrain;
        carToEdit.engine = engine || carToEdit.engine;
        carToEdit.extcolor = extcolor || carToEdit.extcolor;
        carToEdit.fueltype = fueltype || carToEdit.fueltype;
        carToEdit.intecolor = intecolor || carToEdit.intecolor;
        carToEdit.miles = miles || carToEdit.miles;
        carToEdit.priceamount = priceamount || carToEdit.priceamount;
        carToEdit.stocknum = stocknum || carToEdit.stocknum;
        carToEdit.transmiss = transmiss || carToEdit.transmiss;
        carToEdit.trim = trim || carToEdit.trim;
        carToEdit.vinnum = vinnum || carToEdit.vinnum;
        carToEdit.features = features || carToEdit.features;

        // Handle image upload (if new images are provided)
        if (imageToEdit.length > 0) {
            // Delete previous images if new ones are uploaded
            if (carToEdit.carimages && carToEdit.carimages.length > 0) {
                // Delete the previous images if they exist
                carToEdit.carimages.forEach((image) => {
                    const previousImagePath = path.join(__dirname, "../../shared-assets/public/carimages", image);
                    if (fs.existsSync(previousImagePath)) {
                        try {
                            fs.unlinkSync(previousImagePath); // Synchronously delete the old image
                            console.log("Previous car image deleted successfully");
                        } catch (error) {
                            console.log("Error deleting previous car image", error);
                        }
                    }
                });
            }

            // Assign new images to the car document
            carToEdit.carimages = imageToEdit; // This will be an array of image file names
        }

        // Save the updated car document
        await carToEdit.save();

        // Respond with success
        res.status(200).json({ message: "Car description updated successfully", updatedCar: carToEdit });
    } catch (error) {
        console.error("Error updating car description", error);
        return res.status(500).json({ message: "Internal server error", error });
    }
};


const updateProfilePic = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No image provided' });
        }

        const userId = req.body.userId;
        const image = req.file ? `${req.file.filename}` : '';

        // Find and update the user's profile picture
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { profilepic: image },
            { new: true } // Return the updated document
        );

        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found or update failed' });
        }

        res.status(200).json({ message: 'Profile pic updated successfully', updatedUser });
    } catch (error) {
        console.error("Error updating profile pic", error);
        return res.status(500).json({ error: 'Internal server issue' });
    }
};


const updateCalendarEvent = async (req, res) => {
    try {
        const { id, title, start, end } = req.body;

        // Validate required fields
        if (!title || !start || !end) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Attempt to find and update the calendar event by its ID
        const updatedEvent = await Calendar.findByIdAndUpdate(
            id,  // ID of the event to update
            { title, start, end },  // Fields to update
            { new: true }  // Return the updated document
        );

        // If the event wasn't found, return a 404 error
        if (!updatedEvent) {
            return res.status(404).json({ message: "Event not found or update failed" });
        }

        // Send success response with updated event data
        return res.status(200).json({
            message: "Successfully updated the appointment",
            updatedEvent
        });
    } catch (error) {
        console.error("Error updating calendar event:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};


const updateServiceMaintenance = async (req, res) => {
    try {
        const { id, vehitype, vehiyear, vehivin, vehistock, mainttype, price } = req.body;

        // Validate required fields
        if (!vehitype || !vehiyear || !vehivin || !vehistock || !mainttype || !price) {
            return res.status(400).json({ error: "All fields are required" });
        }

        // Attempt to find and update the service maintenance record by its ID
        const updatedService = await ServiceMaintenance.findByIdAndUpdate(
            id,  // The ID of the record to update
            { vehitype, vehiyear, vehivin, vehistock, mainttype, price },  // Fields to update
            { new: true }  // Option to return the updated document
        );

        // If the service maintenance record wasn't found or update failed
        if (!updatedService) {
            return res.status(404).json({ error: "Service maintenance record not found or update failed" });
        }

        // Send success response with updated service data
        return res.status(200).json({
            message: "Service maintenance record updated successfully",
            updatedService
        });
    } catch (error) {
        console.error("Error updating service maintenance data:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
};



module.exports = { updateCarDescription, updateProfilePic, updateCalendarEvent, updateServiceMaintenance };
