const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    name: String,
    category: String,
    gender: String,
    price: Number,
    qty: {type: Number, default: 1},
    img: String
})

module.exports = mongoose.model('product', ProductSchema);