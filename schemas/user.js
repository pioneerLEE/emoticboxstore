const mongoose = require('mongoose');

const { Schema } = mongoose;
const { Types: { ObjectId }} = Schema;
const userSchema = new Schema({
  provider:{
    type: String,
  },
  sns_id:{
    type: String,
  },
  email:{
    type: String,
  },
  password:{
    type: String,
  },
  nomaluser:{
    type:ObjectId,
    ref:'Nomaluser'
  },
  author:{
    type:ObjectId,
    ref:'Author'
  },
  company:{
    type:ObjectId,
    ref:'Company'
  },
  email_verified :{ 
    type: Boolean, 
    default: false 
  },
  key_for_verify :{
    type: String,
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

module.exports = mongoose.model('User', userSchema);