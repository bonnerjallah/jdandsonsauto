const mongoose = require('mongoose');

const PurchaseSchema = new mongoose.Schema({
    auctionName: {
        type: String,
        required: true,
    },
    vechPurch: {
        type: String,
        required: true,
    },
    purchPrice: {
        type: Number,
        required: true,
    },
    vechiYear: {
        type: Number,
        required: true,
    },
}, { timestamps: true });

const Purchase = mongoose.model('Purchase', PurchaseSchema);

module.exports = Purchase;
