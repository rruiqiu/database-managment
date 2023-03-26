const mongoose = require("mongoose")

const postSchema = new mongoose.Schema({
  date: String,
  message: String
})

// const Post = mongoose.model("Post", postSchema)
module.exports = mongoose.model("Post", postSchema);