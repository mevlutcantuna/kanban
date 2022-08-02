const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
  content: {
    type: String,
    require: true,
    unique: false,
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    require: true,
  },
  columnId: {
    type: mongoose.Schema.ObjectId,
    ref: "Column",
    require: true,
  },
  tag: {
    type: String,
    require: true,
  },
});

module.exports = mongoose.models.Task || mongoose.model("Task", TaskSchema);
