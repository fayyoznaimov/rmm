const { response } = require("express");
const MachineSchema = require("../models/MachineModel");

exports.addMachine = async (req, res) => {
  const { company, model, category, number,type } = req.body;

  // Add the current date
  const date = new Date();

  const machine = MachineSchema({
    company,
    model,
    category,
    number,
    type,
    date, // Assigning the current date
  });

  try {
    if (!company || !model || !category || !number || !type) {
      let missingFields = [];
      if (!company) missingFields.push("company");
      if (!model) missingFields.push("model");
      if (!category) missingFields.push("category");
      if (!number) missingFields.push("number");
      if (!type) missingFields.push("type");
      return res
        .status(400)
        .json({ message: "Fields of machine cannot be empty", missingFields });
    }

    await machine.save();
    return res.status(200).json({ message: "Machine added successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Server Error"+ error });
  }
};
