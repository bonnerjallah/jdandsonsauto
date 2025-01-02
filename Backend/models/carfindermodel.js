const mongoose = require('mongoose');

const customerSearchSchema = new mongoose.Schema({
  id: { type: String, required: true }, 
  searchyear: { type: String, required: true }, 
  searchmake: { type: String, required: true }, 
  searchmodal: { type: String, required: true }, 
  searchmileage: { type: String, required: true }, 
  searchprice: { type: String, required: true }, 
  desiredfeature: { type: String, required: true }, 
  searchcustname: { type: String, required: true }, 
  searchcustphone: { type: String, required: true }, 
  searchcustemail: { type: String, required: true }, 
  searchreachyou: { type: String, required: true }, 
}, { timestamps: true }); 

const CustomerSearch = mongoose.model('CustomerSearch', customerSearchSchema);

module.exports = CustomerSearch;
