const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        start: {
            type: Date,
            required: true,
        },
        end: {
            type: Date,
            required: true,
        },
        description: {
            type: String,
            required: false,  // Optional field
        },
        location: {
            type: String,
            required: false,  // Optional field
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
    },
    { timestamps: true }
);

const Appointment = mongoose.model("Appointment", appointmentSchema);

module.exports = Appointment;
