const mongoose = require('mongoose');

const avilibilityAuotesSchema = new mongoose.Schema({
  id: { type: String, required: true }, // Unique identifier for the customer inquiry
  first_name: { type: String, required: true }, // Customer's first name
  last_name: { type: String, required: true }, // Customer's last name
  phone_number: { type: String, required: true }, // Customer's phone number
  availability_email: { type: String, required: true }, // Email address for availability inquiries
  contactpref: { type: String, required: true }, // Contact preference, e.g., "By Phone"
  availability_message: { type: String, required: true }, // Message or inquiry text
  car_id: { type: String, required: true }, // Reference to the car ID
}, {timestamps: true } ); // Adds createdAt and updatedAt fields automatically

const AvilibilityQuotes = mongoose.model('AvilibilityQuotes', avilibilityAuotesSchema);

module.exports = AvilibilityQuotes;
