const mongoose = require('mongoose');

const { Schema } = mongoose;
const { Types: { ObjectId }} = Schema;
const paymentSchema = new Schema({
  emojipack:{
    type:ObjectId,
    ref:'Emojipack'
  },
  user:{
    type:ObjectId,
    ref:'User'
  },
  platform:{
    type:ObjectId,
    ref:'Platform'
  },
  money:{
    type: Number,
    required: true,
  },
  info:{
    type:String
  },
  data_created:{
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Payment', paymentSchema);