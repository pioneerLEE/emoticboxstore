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
  data_created:{
    type: Date,
    default: Date.now,
  },
  data_fix:{
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Company', companySchema);