const mongoose = require("mongoose"); // Zugriff auf MongoDB

const forumsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Forum", forumsSchema);
