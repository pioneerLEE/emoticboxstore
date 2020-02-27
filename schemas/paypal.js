const mongoose = require('mongoose');

const { Schema } = mongoose;
const { Types: { ObjectId }} = Schema;
const paypalSchema = new Schema({
  email:{
    type: String,
    required: true,
  },
  owner:{
    type:ObjectId,
    ref:'User'
  },
  data_created:{
    type: Date,
    default: Date.now,
  },
  data_fix:{
    type: Date,
    default: Date.now,
  }
});

module.exports = mongoose.model('Paypal', paypalSchema);