const mongoose = require("mongoose");

const formDataSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  add: {
    type: String,
    required: true,
  },
  zip: {
    type: String,
    required: true,
  },
  c_no: {
    type: String,
    required: true,
  },
  payment: {
    type: String,
    required: true,
  },
});

const cartItemSchema = mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  size: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
});

const dataSchema = mongoose.Schema({
  uid: {
    type: String,
    required: true,
    unique: true,
  },
  formData: [formDataSchema],
  cartItems: [cartItemSchema],
  cartTotal: {
    type: Number,
    required: true,
  },
});

const Data = mongoose.model("Data", dataSchema);

module.exports = Data;
