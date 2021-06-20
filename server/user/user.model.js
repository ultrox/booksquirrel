const mongoose = require("mongoose");

const { Schema } = mongoose;

mongoose.Promise = global.Promise;

const validator = require("validator");
const mongodbErrorHandler = require("mongoose-mongodb-errors");

const userSchema = new Schema({
  providerId: {
    type: String,
  },
  firstName: {
    required: "Please supply a First Name",
    type: String,
    trim: true,
  },
  lastName: {
    type: String,
    trim: true,
  },
  email: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true,
    validate: [validator.isEmail, "Invalid Email Address"],
    required: "Please Supply an email address",
  },
  lastVisited: { type: Date, default: new Date() },
  profilePhoto: {
    type: String,
    default: "/images/default.png",
  },
  provider: { type: String, required: [true, "source not specified"] },
});

userSchema.plugin(mongodbErrorHandler);

module.exports = mongoose.model("User", userSchema);
