const mongoose = require("mongoose");
const { Schema } = mongoose;

const RecordSchema = new Schema({
  patient: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  hospital: {
    type: Schema.Types.ObjectId,
    ref: "Admin",
  },
  testId: {
    type: String
  },
  pending: {
    type: Boolean,
    default: true,
  },
  result: {
    type: String,
    default: "",
  },
}, { timestamps: true });

module.exports = mongoose.model("Record", RecordSchema)
