const mongoose = require('mongoose');

const { Schema } = mongoose;
const { Types: { ObjectId }} = Schema;
const submitlogSchema = new Schema({
  user:{
    type:ObjectId,
    ref:'Nomaluser'
  },
  service:{
    type:ObjectId,
    ref:'Service'
  },
  id:{
    type: String,
    required: true,
  },
  data_created:{
    type: Date,
    default: Date.now,
  },
  data_fix:{
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Submitlog', submitlogSchema);