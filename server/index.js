const express = require('express')
const app = express()
const dotenv = require("dotenv")
const cors = require("cors")
const mongoose = require('mongoose');
const Post = require('./data') //database


dotenv.config()
const port = process.env.PORT
app.use(cors())
app.use(express.json())
const auth = process.env.AUTH
const url = "mongodb+srv://" + auth + "@atlascluster.0iwigdk.mongodb.net/Personal"
mongoose.connect(url)

// app.get("/", function (req, res) {
//   res.send("Hello world")
// })


app.get("/", async function (req, res) {
  try {
    const posts = await Post.find(); // Retrieve all posts from the database
    res.status(200).json(posts); // Send the posts as JSON
  } catch (err) {
    console.error("Error retrieving posts:", err);
    res.sendStatus(500);
  }
})

app.delete("/:id", async (req, res) => {
  try {
    const requestDeleteId = req.params.id;
    const deletedPost = await Post.findByIdAndDelete(requestDeleteId);
    if (deletedPost) {
      res.status(200).json({ message: "Post deleted!" });
    } else {
      res.status(404).json({ error: "Post not found" });
    }
  } catch (err) {
    console.error("Error deleting post:", err);
    res.sendStatus(500);
  }
});


app.post("/information", async function (req, res) {
  const { date, message } = req.body;
  console.log({ date, message });
  const post = new Post({
    date,
    message
  })
  try {
    const savedPost = await post.save();
    console.log("Post saved successfully:", savedPost);
    // res.sendStatus(200);
    res.send(savedPost);
  } catch (err) {
    console.error("Error saving post:", err);
    res.sendStatus(500);
  }
})

app.put("/:id", async (req, res) => {
  try {
    const postId = req.params.id;
    const update = req.body;
    const options = { new: true }; // Return the updated document
    const post = await Post.findByIdAndUpdate(postId, update, options);
    if (!post) {
      return res.status(404).send("Post not found");
    }
    res.status(200).send(post);
  } catch (err) {
    console.error("Error updating post:", err);
    res.status(500).send(err);
  }
});

app.listen(parseInt(port), () => {
  console.log(`Example app listening on port ${parseInt(port)}`)
})