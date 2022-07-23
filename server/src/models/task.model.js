const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
    unique: true,
  },
  user: {
    type: mongoose.ObjectId(),
    require: true,
  },
  columnId: {
    type: mongoose.ObjectId(),
    require: true,
  },
  tag: {
    type: String,
    require: true,
  },
});

module.exports = mongoose.models.Task || mongoose.model("Task", TaskSchema);
