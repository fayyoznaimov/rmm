const Part = require("../models/PartModel");

exports.getPartsOfMachine = async (req, res) => {
    const { machineNumber } = req.query; // Получаем номер машины из параметров запроса
    try {
        const parts = await Part.find({ machineNumber: machineNumber }).sort({ date: 1 });
        return res.status(200).json(parts); // Отправляем результат в формате JSON клиенту
    } catch (error) {
        res.status(500).json({ message: 'Ошибка сервера: ' + error });
    }
};