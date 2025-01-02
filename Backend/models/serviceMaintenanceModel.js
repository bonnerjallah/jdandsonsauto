const mongoose = require("mongoose");

const serviceMaintenanceSchema = new mongoose.Schema({
    vehitype: { type: String, required: true },
    vehiyear: { type: Number, required: true },
    vehivin: { type: String, required: true },
    vehistock: { type: Number, required: true },
    mainttype: { type: String, required: true },
    price: { type: Number, required: true },
}, { collection: "serviceMaintenance" });

const ServiceMaintenance = mongoose.model("ServiceMaintenance", serviceMaintenanceSchema);

module.exports = ServiceMaintenance;
