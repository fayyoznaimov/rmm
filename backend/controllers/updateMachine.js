const Machine = require("../models/MachineModel");

exports.updateMachine = async (req, res) => {
  const { machineId } = req.params; // Получаем идентификатор машины из URL
  const { company, model, category, number, type } = req.body; // Получаем данные для обновления

  try {
    // Проверяем, что все поля заполнены
    if (!company || !model || !category || !number || !type) {
      let missingFields = [];
      if (!company) missingFields.push("company");
      if (!model) missingFields.push("model");
      if (!category) missingFields.push("category");
      if (!number) missingFields.push("number");
      if (!type) missingFields.push("type");

      return res
        .status(400)
        .json({ message: "Fields cannot be empty", missingFields });
    }

    // Находим и обновляем машину по ее идентификатору
    const updatedMachine = await Machine.findByIdAndUpdate(machineId, {
      company,
      model,
      category,
      number,
      type,
    }, { new: true });

    if (!updatedMachine) {
      return res.status(404).json({ message: "Machine not found" });
    }

    return res.status(200).json({ message: "Machine updated successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Server Error: " + error });
  }
};
