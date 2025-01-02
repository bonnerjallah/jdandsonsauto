const mongoose = require("mongoose"); 
const Car = require("../models/carmodel"); 
const Appointment = require("../models/appointmentmodel"); 
const ServiceMaintenance = require("../models/serviceMaintenanceModel");
const Message = require("../models/message"); 



const deleteCarData = async (req, res) => {
    console.log("received with data", req.body);  // Optional: log request body for debugging
    try {
        const { _id } = req.params;

        // Validate ObjectId format
        if (!mongoose.Types.ObjectId.isValid(_id)) {
            return res.status(400).json({ message: "Invalid objectId format" });
        }

        // Delete the car record from the car collection
        const deletedCar = await Car.findByIdAndDelete(_id);

        // Check if the car was found and deleted
        if (!deletedCar) {
            return res.status(400).json({ message: "Error deleting car data" });
        }

        // Send the response with the deleted car data
        return res.json(deletedCar);
    } catch (error) {
        console.log("Error deleting car data from database", error);
        return res.status(500).json({ message: "Internal server issue" });
    }
};

const deleteAppointment = async (req, res) => {
    console.log("received with data", req.body);  // Optional: log request body for debugging
    try {
        const { id } = req.params;

        // Validate ObjectId format
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid objectId format" });
        }

        // Delete the appointment record
        const deletedAppointment = await Appointment.findByIdAndDelete(id);

        // Check if the appointment was found and deleted
        if (!deletedAppointment) {
            return res.status(400).json({ message: "Appointment not found" });
        }

        // Send the response with the deleted appointment data
        return res.status(200).json({ message: "Deleted appointment successfully" });
    } catch (error) {
        console.log("Error deleting appointment", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

const deleteSvcMaint = async (req, res) => {
    const { id } = req.params;

    try {
        // Validate ObjectId format
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid ObjectId format" });
        }

        // Attempt to find and delete the service maintenance record by id
        const deletedRecord = await ServiceMaintenance.findByIdAndDelete(id);

        // If no record is found, return a 400 response
        if (!deletedRecord) {
            return res.status(400).json({ message: "Record not found" });
        }

        // Return a success response
        return res.status(200).json({ message: "Deleted successfully" });
    } catch (error) {
        console.log("Error deleting service maintenance record", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};


const deleteMessage = async (req, res) => {
    const { _id } = req.params;

    console.log("req body", req.body);

    try {

        // Validate `id`
        if (!mongoose.Types.ObjectId.isValid(_id)) {
            return res.status(400).json({ message: 'Invalid ID format' });
        }

        // Delete the message based on the provided type
        const result = await Message.findOneAndDelete({_id});

        // If the message is not found, return an error
        if (!result) {
            return res.status(400).json({ message: 'Message not found' });
        }

        // Send success response
        return res.status(200).json({ message: 'Deleted successfully' });

    } catch (error) {
        console.error("Error deleting message", error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};





module.exports = { deleteAppointment, deleteCarData, deleteSvcMaint, deleteMessage };




