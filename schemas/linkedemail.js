const mongoose = require('mongoose');

const { Schema } = mongoose;
const { Types: { ObjectId }} = Schema;

const normaluserSchema = new Schema({
  user:{
    type: ObjectId,
    ref:'User',
    required: true,
  },
  email:{
      type:Array
  },
  isvarify:{
    type:Array
  },
  key_for_verify:{
    type:Array
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

module.exports = mongoose.model('Normaluser', normaluserSchema);