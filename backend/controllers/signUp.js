const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/UserModel');

exports.signUp = async (req, res) => {
  const { email, password, name } = req.body;
console.log("ASDAS")
  try {
    // Проверяем, что все поля заполнены
    if (!email || !password || !name) {
      let missingFields = [];
      if (!email) missingFields.push("email");
      if (!password) missingFields.push("password");
      if (!name) missingFields.push("name");

      return res
        .status(400)
        .json({ message: "Fields cannot be empty", missingFields });
    }

    // Проверяем валидность электронной почты
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        message: "Invalid email format",
      });
    }

    // Проверяем длину пароля
    if (password.length < 6) {
      return res.status(400).json({
        message: "Password must be at least 6 characters long",
      });
    }

    // Хешируем пароль
    const hashedPassword = await bcrypt.hash(password, 10);

    // Создаем нового пользователя
    const newUser = new User({
      email,
      password: hashedPassword,
      name,
    });

    // Сохраняем нового пользователя
    await newUser.save();

    // Генерируем JWT-токен
    const token = jwt.sign({ userId: newUser._id }, 'your_secret_key_here', { expiresIn: '6h' });

    return res.status(200).json({ message: "User added successfully", token });
  } catch (error) {
    return res.status(500).json({ message: "Server Error: " + error });
  }
};
