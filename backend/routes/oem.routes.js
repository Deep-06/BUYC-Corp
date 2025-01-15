const express = require("express");
const { OEMModel } = require("../model/oem_specs.model");

const oemRouter = express.Router();

// For fetching oem_specs data and filtering 
oemRouter.get("/", async (req, res) => {
    const { model } = req.query;
    try {
      const filter = model ? { model: new RegExp(model, "i") } : {};
      let data = await OEMModel.find(filter);
      res.status(200).send(data);
    } catch (error) {
      res.status(400).send("Not able to get the data");
    }
  });
  
// For adding oem_specs data
oemRouter.post("/add", async (req, res) => {
  try {
    const data = new OEMModel(req.body);
    await data.save();
    res.status(200).send({ msg: "OEM is created" });
  } catch (error) {
    res.status(400).send({ msg: "Error in creating new OEM" });
  }
});

module.exports = { 
    oemRouter 
};