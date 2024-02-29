const MachineSchema = require("../models/MachineModel");

exports.getMachines = async (req, res) => {
  const { category, company, model, number, page = 1, limit = 10 } = req.query;

  const query = {};

  if (category) query.category = category;
  if (company) query.company = company;
  if (model) query.model = model;
  if (number) query.number = number;

  const skip = (page - 1) * limit;

  try {
    const machines = await MachineSchema.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    res.status(200).json(machines);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};
