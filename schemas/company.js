const mongoose = require('mongoose');

const { Schema } = mongoose;
const { Types: { ObjectId }} = Schema;
const companySchema = new Schema({
  user:{
    type: ObjectId,
    ref:'User',
    required: true,
  },
  name:{
    type: String,
    required: true,
  },
  link:{
    type: String,
  },
  logo:{
    type: String,
  },
  summary:{
    type: String,
  },
  services:[
      {
        type:ObjectId,
        ref:'Service'
      }
  ],
  account:{
    type:ObjectId,
    ref:'Account'
  },
  paypal:{
    type:ObjectId,
    ref:'Paypal'
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

module.exports = mongoose.model('Company', companySchema);