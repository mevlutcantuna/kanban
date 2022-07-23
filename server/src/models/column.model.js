const mongoose = require("mongoose");

const ColumnSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
    unique: true,
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    require: true,
  },
  taskIds: {
    type: Array,
    default: [],
  },
});

module.exports =
  mongoose.models.Column || mongoose.model("Column", ColumnSchema);
