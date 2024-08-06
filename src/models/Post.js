const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const Post = new Schema({
    title: String,
    body: String,
    date: {type: Date, default: Date.now},
    img: {type: String, default:"default_img.png"},
});


module.exports.Post = mongoose.model("Post", Post);

