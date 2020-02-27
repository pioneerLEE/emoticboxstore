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
  isAccount:{
    type:Boolean
  },
  isPaypal:{
    type:Boolean
  },
  data_created:{
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Walletlog', walletlogSchema);