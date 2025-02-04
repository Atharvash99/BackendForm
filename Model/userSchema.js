const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  isActive: {
    type: Boolean,
    default: true,
  }
});
userSchema.set("timestamps", true);
module.exports = mongoose.model("userData", userSchema);