const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  name: String,
  deleted: { type: Boolean, default: false },
  deletedAt: Date,
});

schema.methods.softDelete = async function () {
  this.deleted = true;
  this.deletedAt = new Date();
  return this.save();
};

function excludeDeleted(next) {
  this.where({ deleted: false });
  next();
}

schema.pre("find", excludeDeleted);
schema.pre("findOne", excludeDeleted);
schema.pre("findOneAndUpdate", excludeDeleted);

module.exports = mongoose.model("SoftDelete", schema);