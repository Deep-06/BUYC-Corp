const mongoose = require('mongoose');


// OEM Specs Schema

const oemSchema = mongoose.Schema({
    model: { 
        type: String, 
        required: true 
    },
    year: { 
        type: Number, 
        required: true 
    },
    price: { 
        type: Number, 
        required: true 
    },
    color: { 
        type: [String], 
        required: true 
    },
    mileage: { 
        type: Number, 
        required: true 
    },
    power: { 
        type: Number, 
        required: true 
    },
    max_speed: { 
        type: Number, 
        required: true 
    },
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
    versionKey:false
}
)

// OEM Model

const OEMModel = mongoose.model('oem', oemSchema);

module.exports = {
    OEMModel
}