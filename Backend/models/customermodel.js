const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema({
    custName: { type: String, required: true },
    custemail: { type: String, required: true },
    addy: { type: String, required: true },
    itembought: { type: String, required: true },
    datepurchase: { type: Date, required: true },
    purchprice: { type: Number, required: true },
}, { collection: "customers" });

const Customer = mongoose.model("Customer", customerSchema);

module.exports = Customer;
