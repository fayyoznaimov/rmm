const Part = require("../models/PartModel");

exports.searchByNumberResultCategory = async (req, res) => {
    const { machineNumber } = req.query; // Получаем номер машины из параметров запроса
    try {
      const result = await Part.aggregate([
        {
          $match: {
            machineNumber: machineNumber
          }
        },
        {
          $group: {
            _id: "$category",
            totalAmount: { $sum: "$amount" }
          }
        }
      ]);
      return res.status(200).json(result); // Отправляем результат в формате JSON клиенту
    } catch (error) {
      res.status(500).json({ message: 'Ошибка сервера: ' + error });
    }
  };
