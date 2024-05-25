const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    minLength: 3,
  },
  passwordHash: {
    type: String,
    required: true,
    minLength: 3,
  },
  // organisation: {
  //   type: String,
  //   required: true,
  // },
  role: {
    type: String,
    required: true,
  },
});

userSchema.plugin(uniqueValidator);

// userSchema.set('strictPopulate', false)

userSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject.passwordHash;
    console.log("in user schema:", returnedObject);
  },
});

const User = mongoose.model("Users", userSchema);

module.exports = User;
