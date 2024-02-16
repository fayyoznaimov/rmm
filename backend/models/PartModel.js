const mongoose = require("mongoose");

const PartSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxLength: 50,
    },
    articul: {
      type: String,
      required: true,
      trim: true,
      maxLength: 50,
    },
    amount: {
      type: Number,
      required: true,
      trim: true,
      maxLength: 3,
    },
    measurment: {
      type: String,
      required: true,
      trim: true,
      maxLength: 5,
    },
    category: {
      type: String,
      required: true,
      trim: true,
      maxLength: 50,
    },
    machineNumber: {
      type: String,
      ref: "Machine",
      unique:"false",
      required: true, // Обязательное поле для номеров машин
    },
    date: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Part", PartSchema);
