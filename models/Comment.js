const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = new Schema({
  content: String,
  description: String,
  author: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  comments: [{
    type: Schema.Types.ObjectId,
    ref: "Comment"
  }]
});

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;