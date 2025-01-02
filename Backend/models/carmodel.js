const mongoose = require('mongoose');

const CarSchema = new mongoose.Schema({
    carname: {
        type: String,
        required: true
    },
    caryear: {
        type: Number,
        required: true,
        min: 1886 // Cars didn't exist before this year
    },
    drivetrain: {
        type: String,
        required: true
    },
    transmiss: {
        type: String,
        required: true
    },
    engine: {
        type: String,
        required: true
    },
    miles: {
        type: Number,
        required: true,
        min: 0
    },
    extcolor: {
        type: String,
        required: true
    },
    intecolor: {
        type: String,
        required: true
    },
    stocknum: {
        type: Number,
        required: true,
        unique: true // Ensures stock numbers are unique
    },
    vinnum: {
        type: String,
        required: true,
        unique: true // VIN numbers should also be unique
    },
    fueltype: {
        type: String,
        required: true
    },
    condi: {
        type: String,
        required: true
    },
    priceamount: {
        type: Number,
        required: true,
        min: 0 // Ensures price can't be negative
    },
    trim: {
        type: String,
        required: true
    },
    doors: {
        type: Number,
        required: true,
        min: 2, // Most cars have at least 2 doors
        max: 5  // Assuming no more than 5 doors
    },
    carimages: {
        type: [String], // Array to store multiple image filenames
        required: true
    },
    features: {
        type: Array,
        required: true,
        default: [] // Sets an empty array as default
    }
}, { collection: "Car" });

const Car = mongoose.model("Car", CarSchema);

module.exports = Car;
