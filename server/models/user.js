const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "name is required"],
  },
  email: {
    type: String,
    required: [true, "name is required"],
  },
  googleId: {
    type: String,
    required: false
  },
  password: {
    type: String,
    required: [false],
  },
});

module.exports = mongoose.model("User", userSchema);
