const MachineSchema = require("../models/MachineModel");
const PartSchema = require("../models/PartModel");


exports.addPart = async (req, res) => {
  const { title, articul, amount, measurment, category, machineNumber } = req.body;

  try {
    if (!title || !category || !amount || !measurment || !machineNumber) {
      let missingFields = [];
      if (!title) missingFields.push("title");
      if (!category) missingFields.push("category");
      if (!amount) missingFields.push("amount");
      if (!measurment) missingFields.push("measurment");
      if (!machineNumber) missingFields.push("machineNumber");

      return res
        .status(400)
        .json({ message: "Fields cannot be empty", missingFields });
    }
    if (isNaN(amount) || amount <= 0) {
      return res.status(400).json({
        message: "Amount must be a positive number",
      });
    }

    // Создаем новую запчасть
    const newPart = new PartSchema({
      title,
      articul,
      amount,
      measurment,
      category,
      machineNumber: machineNumber
    });

    // Сохраняем новую запчасть
    const savedPart = await newPart.save();

    // Получаем идентификатор новой запчасти
    const newPartId = savedPart._id;

    // Находим объект машины по его номеру
    const machine = await MachineSchema.findOne({ number: machineNumber });

    // Добавляем идентификатор новой запчасти в массив parts объекта машины
    machine.parts.push(newPartId);

    // Сохраняем изменения в объекте машины
    await machine.save();

    return res.status(200).json({ message: "Part added successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Нет такой машины: " + error });
  }
};

