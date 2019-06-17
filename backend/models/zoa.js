const mongoose = require('mongoose'); 
const Schema = mongoose.Schema; 

//Create Zoa schema and model
const ZoaSchema = new Schema({
    name: {
        type: String, 
        required: true
    }, 
    hours: {
        type: Number, 
        required: true
    }, 
    available: {
        type: Boolean, 
        default: false
    }
});

const Zoa = mongoose.model('zoa', ZoaSchema); 

module.exports = Zoa;