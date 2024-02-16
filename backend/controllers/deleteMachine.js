const MachineSchema = require("../models/MachineModel");
const mongoose = require("mongoose");

exports.deleteMachine = async (req, res) => {
    const { id } = req.params;
    // Проверяем, является ли переданный ID допустимым ObjectID
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: "Invalid ID provided" });
    }

    MachineSchema.findByIdAndDelete(id)
        .then((machine) => {
            if (!machine) {
                return res.status(404).json({ message: "Machine not found" });
            }
            return res.status(200).json({ message: "Machine has been deleted!" });
        })
        .catch((error) => {
            res.status(500).json({ message: "Server Error" + error });
        });
};
