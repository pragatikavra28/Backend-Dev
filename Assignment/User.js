const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: String,
  password: String,
  lastLogin: Date,
  lastLogout: Date,
  lastActive: Date,
});

userSchema.pre("save", function (next) {
  this.lastActive = new Date();
  next();
});

userSchema.statics.recordLogin = async function (userId) {
  return this.findByIdAndUpdate(userId, {
    lastLogin: new Date(),
    lastActive: new Date(),
  });
};

userSchema.statics.recordLogout = async function (userId) {
  return this.findByIdAndUpdate(userId, {
    lastLogout: new Date(),
  });
};

module.exports = mongoose.model("User", userSchema);