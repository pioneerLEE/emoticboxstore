const mongoose = require('mongoose');

const { Schema } = mongoose;
const { Types: { ObjectId }} = Schema;
const withdraw_reqSchema = new Schema({
  money:{
    type: Number,
    required: true,
    default:0,
  },
  status:{
    type:String,
    required:true,
    default:"waiting", //complete
  },
  account:{
    type:ObjectId,
    ref:'Account'
  },
  data_created:{
    type: Date,
    default: Date(),
  },
  data_fix:{
    type: Date,
    default: Date(),
  },
});

module.exports = mongoose.model('Withdraw_req', withdraw_reqSchema);