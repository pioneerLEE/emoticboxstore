const mongoose = require('mongoose');

const { Schema } = mongoose;
const { Types: { ObjectId }} = Schema;
const accountSchema = new Schema({
  bank:{
    type: String,
    required: true,
  },
  number:{
    type: Number,
    required: true,
  },
  owner:{
    type:ObjectId,
    ref:'User'
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

module.exports = mongoose.model('Account', accountSchema);