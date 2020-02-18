const mongoose = require('mongoose');

const { Schema } = mongoose;
const { Types: { ObjectId }} = Schema;
const serviceSchema = new Schema({
  name:{
    type: String,
    required: true,
  },
  api_key:{
    type: String,
    required: true,
  },
  consumer_age:{
    type: Number,
    required: true,
  },
  company:{
    type:ObjectId,
    ref:'Company'
  },
  language:{
    type:ObjectId,
    ref:'Language'
  },
  tags:[
    {
      type:ObjectId,
      ref:'Tag'
    }
  ],
  antitags:[
    {
      type:ObjectId,
      ref:'Tag'
    }
  ],
  category:{
    type:ObjectId,
    ref:'ServiceCategory'
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

module.exports = mongoose.model('Service', serviceSchema);