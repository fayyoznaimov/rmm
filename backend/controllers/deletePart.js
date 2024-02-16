const PartSchema = require("../models/PartModel");
const mongoose = require("mongoose");

exports.deletePart = async (req, res) => {
  const { id } = req.params;
  // Проверяем, является ли переданный ID допустимым ObjectID
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid ID provided" });
  }

  PartSchema.findByIdAndDelete(id).then((part) => {
    try {
      if (!part) {
        return res.status(404).json({ message: "Part not found" });
      }
      return res.status(200).json({ message: "Part has been deleted!" });
    } catch (error) {
      return res.status(500).json({ message: "Server Error" });
    }
  });
};
