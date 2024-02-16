const PartSchema = require("../models/PartModel");

exports.getParts = async (req, res) => {
  let { title, category, articul, machineNumber, page, limit } = req.query;

  // Устанавливаем значения по умолчанию для page и limit
  page = page ? parseInt(page) : 1;
  limit = limit ? parseInt(limit) : 10;

  const query = {};

  if (title) query.title = title;
  if (category) query.category = category;
  if (articul) query.articul = articul;
  if (machineNumber) query.machineNumber = machineNumber;

  const skip = (page - 1) * limit;

  try {
    const parts = await PartSchema.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    res.status(200).json(parts);
  } catch (error) {
    res.status(500).json({ message: "Ошибка сервера", error: error.message });
  }
};
