const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserSchema = require('../models/UserModel');

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Находим пользователя по электронной почте
    const user = await UserSchema.findOne({ email });

    // Проверяем, существует ли пользователь с указанной электронной почтой
    if (!user) {
      return res.status(404).json({ message: 'Пользователь с такой электронной почтой не найден' });
    }

    // Проверяем правильность введенного пароля
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: 'Неправильный пароль' });
    }

    // Генерируем JWT-токен
    const token = jwt.sign({ userId: user._id }, 'your_secret_key_here', { expiresIn: '6h' });

    // Возвращаем токен и информацию о пользователе
    res.status(200).json({ token, userId: user._id, fullName: user.fullName });
  } catch (error) {
    res.status(500).json({ message: 'Ошибка сервера: ' + error });
  }
};
