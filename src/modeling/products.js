const mongoose = require("mongoose");

const productmodel = mongoose.Schema({
  logo: {
    type: String,
    required: true,
    trim: true,
  },
  title: {
    type: String,
    required: true,
    trim: true,
  },
  photo: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  likes: {
    type: Number,
    default: 0,
    trim: true,
  },
  noLikes: {
    type: Number,
    default: 0,
    trim: true,
  },
  commant: {
    type: String,
    trim: true,
  },
  trending: {
    type: Number,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("products", productmodel);
