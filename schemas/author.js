const mongoose = require('mongoose');

const { Schema } = mongoose;
const { Types: { ObjectId }} = Schema;
const authorSchema = new Schema({
  user:{
    type: ObjectId,
    ref:'User',
    required: true,
  },
  profile:{
    type: String,
  },
  nick:{
    type: String,
    required: true,
  },
  emojipacks:[
    {
        type:ObjectId,
        ref:'Emojipack'
    }
  ],
  fans:[
    {
      type:ObjectId,
      ref:'Normaluser'
    }
  ],
  //생년월일 ex)19980111
  birth:{
      type:Number,
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

module.exports = mongoose.model('Author', authorSchema);