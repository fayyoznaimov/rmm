const mongoose = require("mongoose");

// Определяем регулярные выражения для разных типов номеров машин
const licensePlateRegex = {
  type1: /^[0-9]{2}\/[A-Z]{1}\/[0-9]{3}\/[A-Z]{2}$/, 
  type2: /^[0-9]{2}\/[0-9]{3}\/[A-Z]{3}$/, 
  type3: /^[0-9]{2}\/[A-Z]{1}\/[0-9]{6}\/$/,// 
};
// Добавьте другие типы номеров, если необходимо

const MachineSchema = new mongoose.Schema(
  {
    company: {
      type: String,
      required: true,
      trim: true,
      maxLength: 15,
    },
    model: {
      type: String,
      required: true,
      trim: true,
      maxLength: 50,
    },
    category: {
      type: String,
      required: true,
      trim: true,
      maxLength: 50,
    },
    number: {
      type: String,
      required: true,
      unique:true,
      trim: true,
      maxLength: 15,
    },
    type: {
      type: String,
      required: true,
      trim: true,
      maxLength: 20,
    },
    parts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Part" }], // массив запчастей
    date: {
      type: Date,
      required: true,
      trim: true,
    },
    date: {
      type: Date,
      required: true,
      trim: true,
    },
  },
  { timestamps: true }
);

// Добавляем валидацию номера машины в зависимости от типа
MachineSchema.path("number").validate(function (value) {
  const regex = licensePlateRegex[this.type];
  if (!regex) return false;
  return regex.test(value);
}, "Неверный формат номера машины");

module.exports = mongoose.model("Machine", MachineSchema);
