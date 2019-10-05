const mongoose = require('mongoose');

const { Schema } = mongoose;
const { Types: { ObjectId }} = Schema;
const walletSchema = new Schema({
  money:{
    type: Number,
    required: true,
    default:0,
  },
  owner:{
    type:ObjectId,
    ref:'User'
  },
  data_fix:{
    type: Date,
    default: Date(),
  },
});

module.exports = mongoose.model('Wallet', walletSchema);