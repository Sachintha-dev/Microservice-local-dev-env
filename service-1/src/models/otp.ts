const mongoose = require('mongoose');

const otpSchema = new mongoose.Schema({
  referenceId: {
    type: String,
    required: true,
    unique: true,
    index: true, // To allow quick lookup
  },
  mobileNumber: {
    type: String,
    required: true,
  },
  otp: {
    type: String,
    required: true,
  },
  expiresAt: {
    type: Date,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 600, // TTL index to automatically remove documents after 10 minutes
  },
});

// Create the model
const Otp = mongoose.model('Otp', otpSchema);

export default Otp;
