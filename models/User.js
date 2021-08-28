const mongoose = require("mongoose");
const { Schema } = mongoose;

const crypto = require("crypto");

const userSchema = new Schema({
  name: {
    type: String,
  },
  age: {
    type: String,
  },
  gender: {
    type: String,
  },
  NIC: {
      type: String,
  },
  address: {
    type: String,
  },
  province: {
      type: String
  },
  district: {
      type: String
  },
  contactNo: {
    type: String
  },
  email: {
    type: String,
  },
  hash: String,
  salt: String,
});

userSchema.methods.setPassword = function (password) {
  // Creating a unique salt for a particular user
  this.salt = crypto.randomBytes(16).toString("hex");

  // Hashing user's salt and password with 1000 iterations,

  this.hash = crypto
    .pbkdf2Sync(password, this.salt, 1000, 64, `sha512`)
    .toString(`hex`);
};

// Method to check the entered password is correct or not
userSchema.methods.validPassword = function (password) {
  var hash2 = crypto
    .pbkdf2Sync(password, this.salt, 1000, 64, `sha512`)
    .toString(`hex`);
  return this.hash === hash2;
};

module.exports = mongoose.model("User", userSchema);
