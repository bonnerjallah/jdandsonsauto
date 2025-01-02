const mongoose = require('mongoose');

// Define the schema for the message
const messageSchema = new mongoose.Schema({
    content: { type: String, required: true },
    sender: { type: String, required: true },  // Sender's identifier (could be user ID)
    receiver: { type: String, required: true },  // Receiver's identifier (could be user ID)
    type: { type: String, enum: ['availability', 'carfinder', 'message'], required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

// Create and export the Message model
const Message = mongoose.model('Message', messageSchema);

module.exports = Message;
