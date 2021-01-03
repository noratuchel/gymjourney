const mongoose = require("mongoose"); // Zugriff auf MongoDB

const postsSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  photo: {
    type: String,
    required: true,
  },
  content_img: {
    type: String,
    required: true,
  },
  user_id: {
    type: String,
    required: true,
  },
  forum_id: {
    type: String,
    required: true,
  },
  firstname: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Post", postsSchema);
