const mongoose = require('mongoose');
const validator = require('validator');


// Dealer Schema

const dealerSchema = mongoose.Schema({
 username: {
    type: String,
    required: true,
 },
 email: {
    type: String,
    required: true,
    unique: true,
    validate: {
        validator: validator.isEmail,
        message: 'Invalid email format'
    } 
 },
 password: {
        type: String,
        required: true,
 }
},
{
    versionKey:false
}
)

// Dealer Model

const DealerModel = mongoose.model('dealer', dealerSchema);

module.exports = {
    DealerModel
}