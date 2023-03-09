const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  image_url: { type: String, required: true },
  quantity: { type: Number, default: 1 }
});

const cartSchema = new mongoose.Schema({
  user_id: {
    type: String,
    required: true
  },
  products: [{
    type: productSchema,
    required: true
  }]
});

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;