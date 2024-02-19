exports.getCategories = async (req, res) => {
  let category = ["Кран", "Погрузчик", "Грузовые"];
  try {
    return res.status(200).json(category);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Could not get categories", error: error.message });
  }
};
