const PartSchema = require("../models/PartModel");

exports.updatePart = async (req, res) => {
  const { partId } = req.params; // Получаем идентификатор запчасти из URL
  const { title, articul, amount, measurment, category } = req.body; // Получаем данные для обновления

  try {
    // Проверяем, что все поля заполнены
    if (!title || !category || !amount || !measurment) {
      let missingFields = [];
      if (!title) missingFields.push("title");
      if (!category) missingFields.push("category");
      if (!amount) missingFields.push("amount");
      if (!measurment) missingFields.push("measurment");

      return res
        .status(400)
        .json({ message: "Fields cannot be empty", missingFields });
    }
    if (isNaN(amount) || amount <= 0) {
      return res.status(400).json({
        message: "Amount must be a positive number",
      });
    }

    // Находим и обновляем запчасть по ее идентификатору
    const updatedPart = await PartSchema.findByIdAndUpdate(partId, {
      title,
      articul,
      amount,
      measurment,
      category,
    }, { new: true });

    if (!updatedPart) {
      return res.status(404).json({ message: "Part not found" });
    }

    return res.status(200).json({ message: "Part updated successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Server Error: " + error });
  }
};
