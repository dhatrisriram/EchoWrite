var express = require("express");
const { Article } = require("../Models/article.model");
const { User } = require("../Models/user.model");

var commentRouter = express.Router();

// ✅ Add a test GET route
commentRouter.get("/", (req, res) => {
  res.send("Comments API is working!");
});

// ✅ Fix POST route logic
commentRouter.post("/createComment", async (req, res) => {
  try {
    let { article, comment, userId } = req.body; // Assuming the request has userId

    // Check if the article exists
    let articleDetails = await Article.findOne({ _id: article });
    if (!articleDetails) {
      return res.status(404).json({ Message: "Article not found!" });
    }

    // Check if the user exists
    let userDetails = await User.findOne({ _id: userId });
    if (!userDetails) {
      return res.status(404).json({ Message: "User not found!" });
    }

    // ✅ Create a new comment (You should have a Comment model)
    let newComment = {
      article: article,
      comment: comment,
      user: userId,
    };

    // Assuming you have a Comment model
    const { Comment } = require("../Models/comment.model"); // ✅ Ensure Comment model exists
    let savedComment = await Comment.create(newComment);

    // ✅ Push comment ID to article comments array
    articleDetails.comments.push(savedComment._id);
    await articleDetails.save();

    res.status(201).json({
      Message: "Comment created successfully!",
      response: savedComment,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ Message: "Something went wrong!", error: error });
  }
});

module.exports = { commentRouter };
