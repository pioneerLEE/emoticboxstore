const mongoose = require('mongoose');

const { Schema } = mongoose;
const { Types: { ObjectId }} = Schema;
const giftSchema = new Schema({
  money:{
    type: Number,
    required: true,
  },
  sender:{
    type:ObjectId,
    ref:'User'
  },
  receiver:{
    type:ObjectId,
    ref:'User'
  },
  receiver_email:{
    type:String
  },
  emojipack:{
    type:ObjectId,
    ref:'Emojipack'
  },
  payment:{
    type:ObjectId,
    ref:'Payment'
  },
  emojipack_name:{
    type:String,
  },
  emojipack_thumbnail:{
    type:String,
  },
  emojipack_author:{
    type:String,
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

module.exports = mongoose.model('Gift', giftSchema);