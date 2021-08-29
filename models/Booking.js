const mongoose = require("mongoose");
const { Schema } = mongoose;

const BookingSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    date: {
      type: String,
    },
    time: {
      type: String,
    },
    hospital: {
      type: Schema.Types.ObjectId,
      ref: "Admin",
    },
    token: {
      type: Number
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Booking", BookingSchema);
