const mongoose = require('mongoose');
const {
    Schema
} = mongoose;

const userSchema = new Schema({
    "username": String,
    "telephone": String,
    "password": String,
    "email": String,
    "favoriteProducts": Array,
    "viewedProducts": Array,
    "orders": Array
});


const User = mongoose.model('User', userSchema);

module.exports = User;