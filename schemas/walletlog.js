const mongoose = require('mongoose');

const { Schema } = mongoose;
const { Types: { ObjectId }} = Schema;
const walletlogSchema = new Schema({
  money:{
    type: Number,
    required: true,
  },
  wallet:{
    type:ObjectId,
    ref:'Wallet'
  },
  data_created:{
    type: Date,
    default: Date(),
  },
});

module.exports = mongoose.model('Walletlog', walletlogSchema);