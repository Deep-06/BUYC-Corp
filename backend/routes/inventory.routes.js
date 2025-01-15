const express = require("express");
const { InventoryModel } = require("../model/inventary.model");
const {auth} = require('../middleware/auth.middleware');

const inventoryRouter = express.Router();
require("dotenv").config();

inventoryRouter.get("/", async (req, res) => {
    try {
      const { color, sort_by, order = "asc" } = req.query;
  
      // Fetch data and populate references
      let data = await InventoryModel.find().populate("oem_spec").populate("dealer");
  
      // Color filter
      if (color) {
        data = data.filter((el) => el.oem_spec.color.includes(color));
      }
  
      // Sort by price or mileage
      if (sort_by === "price" || sort_by === "mileage") {
        data.sort((a, b) => {
          const aValue = +a.oem_spec[sort_by];
          const bValue = +b.oem_spec[sort_by];
          return order === "asc" ? aValue - bValue : bValue - aValue;
        });
      }
  
      res.status(200).send(data);
    } catch (error) {
      res.status(400).send("Not able to get the data");
    }
  });
  

inventoryRouter.get("/:id", async (req, res) => {
  const {id }= req.params;
  try {
    let data = await InventoryModel.findById(id)
      .populate("oem_spec")
      .populate("dealer");

    res.status(200).send(data);
  } catch (error) {
    res.status(400).send("Not able to get the data");
  }
});

// Adding new inventory data
inventoryRouter.post("/add", auth, async (req, res) => {
  const userid = req.headers.userid;
    try {
      const item = new InventoryModel({ ...req.body, dealer: userid });
      const savedItem = await item.save();
      res.status(200).send({ message: "Item created successfully", data: savedItem });
    } catch (error) {
      res.status(401).send({ message: "Not able to create the Item", error: error.message });
    }
  });
  

// Updating inventory data
inventoryRouter.patch("/:id", auth, async (req, res) => {
  const { id } = req.params;
  const userid = req.headers.userid;

  try {
    const data = await InventoryModel.findById(id);

    if (data) {
      if (data.dealer.toString() === userid) {
        const updatedData = await InventoryModel.findByIdAndUpdate(id, req.body, { new: true });
        res.status(200).json({ message: "Item updated successfully", updatedData });
      } else {
        res.status(401).send("Not authorized to update");
      }
    } else {
      res.status(404).send("Data not found");
    }
  } catch (err) {
    res.status(400).send("Something went wrong");
  }
});



// Deleting data
inventoryRouter.delete("/:id", auth, async (req, res) => {
  const { id } = req.params; 
  const userid = req.headers.userid; 

  try {
    const data = await InventoryModel.findById(id); 

    if (data) {
      // Convert ObjectId to string for comparison
      if (data.dealer.toString() === userid) {
        await InventoryModel.findByIdAndDelete(id);
        res.status(202).send("Item Deleted");
      } else {
        res.status(401).send("You are not authorized to delete this item");
      }
    } else {
      res.status(404).send("Item not found");
    }
  } catch (error) {
    res.status(400).send("Error in deleting the data");
  }
});



module.exports = { 
    inventoryRouter 
};


// inventoryRouter.get("/", async (req, res) => {
//   try {
//     const { color, sort_by, order = "asc" } = req.query;
//     const sortOrder = order === "asc" ? 1 : -1;

//     // Build query object
//     const query = {};
//     if (color) {
//       query["oem_spec.color"] = color; // Filter by color
//     }

//     // Fetch and populate data with filters and sorting
//     const data = await InventoryModel.find(query)
//       .populate("oem_spec")
//       .populate("dealer")
//       .sort(sort_by ? { [`oem_spec.${sort_by}`]: sortOrder } : {}); // Sort by price or mileage

//     res.status(200).send(data);
//   } catch (error) {
//     res.status(400).send("Not able to get the data");
//   }
// });
