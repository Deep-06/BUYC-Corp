const mongoose = require('mongoose');


// inventory Schema

const inventorySchema = mongoose.Schema({
    image: { 
        type: String, 
        required: true 
    },
    odometer: { 
        type: Number, 
        required: true 
    },
    scratches: { 
        type: Number, 
        required: true 
    },
    original_paint: { 
        type: String, 
        required: true 
    },
    reported_accident: { 
        type: Number, 
        required: true 
    },
    previous_buyer: { 
        type: Number, 
        required: true 
    },
    registration_place: { 
        type: String, 
        required: true 
    },
    oem_spec: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "OEM_Spec",
    },
    dealer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "dealer",
      required: true,
    },
    description: { 
        type: [String], 
        required: true 
    },
    title: { 
        type: String, 
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

// inventory Model

const InventoryModel = mongoose.model('inventory', inventorySchema);

module.exports = {
    InventoryModel
}