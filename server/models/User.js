const mongoose = require('mongoose');
// const Schema = mongoose.Schema;
const { Schema } = mongoose;

const userSchema = new Schema({
    googleId : String,
    username: String,
    email:String,
    password:String,
    firstname:String,
    lastname:String,
});

mongoose.model('users', userSchema);