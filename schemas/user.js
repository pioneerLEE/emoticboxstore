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
  normaluser:{
    type:ObjectId,
    ref:'Normaluser',
    default:null
  },
  author:{
    type:ObjectId,
    ref:'Author',
    default:null
  },
  company:{
    type:ObjectId,
    ref:'Company',
    default:null
  },
  email_verified :{ 
    type: Boolean, 
    default: false 
  },
  key_for_verify :{
    type: String,
  },
  typicalTags: [
    {
      type: ObjectId,
      ref: 'Tag'
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

module.exports = mongoose.model('User', userSchema);