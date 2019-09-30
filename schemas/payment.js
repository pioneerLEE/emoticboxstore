const mongoose = require('mongoose');

const { Schema } = mongoose;
const { Types: { ObjectId }} = Schema;
const paymentSchema = new Schema({
  service:{
    type:ObjectId,
    ref:'Service'
  },
  emojipacks:{
    type:ObjectId,
    ref:'Emojipack'
  },
  user:{
    type:ObjectId,
    ref:'User'
  },
  money:{
    type: Number,
    required: true,
  },
  data_created:{
    type: Date,
    default: Date(),
  },
});

module.exports = mongoose.model('Payment', paymentSchema);