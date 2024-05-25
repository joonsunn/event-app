const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  eventDate: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  completed: {
    type: mongoose.Schema.Types.Boolean,
    required: true,
  },
  imageUrl: {
    type: String,
    required: false,
  },
  // organisation: {
  //   type: String,
  //   required: true,
  // },
  organiser: {
    type: String,
    required: true,
  },
  // username: {
  //   type: String,
  //   required: true,
  // },
  createdDate: {
    type: Date,
    default: Date.now,
  },
  edittedDate: {
    type: Date,
    default: Date.now,
  },
});

eventSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Events", eventSchema);
