const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const User = new Schema({
    email: String,
    password: String,
    entries: Array
});


module.exports.User = mongoose.model("User", User);