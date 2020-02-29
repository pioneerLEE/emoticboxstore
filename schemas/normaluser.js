const mongoose = require('mongoose');

const { Schema } = mongoose;
const { Types: { ObjectId }} = Schema;
const normaluserSchema = new Schema({
  user:{
    type: ObjectId,
    ref:'User',
    required: true,
  },
  emojipacks:[
    {
        type:ObjectId,
        ref:'Emojipack'
    }
  ],
  dibs:[
    {
        type:ObjectId,
        ref:'Emojipack'
    }
  ],
  services:[
    {
    type:ObjectId,
    ref:'Service'
    }
  ],
  favorite:[
    {
      type:ObjectId,
      ref:'Author'
    }
  ],
  search_log:{
    type: Array
  },
  usedpack:{
    type: Array
  },
  linked_email:{
    type: Array
  },
  //생년월일
  birth:{
    type:Number,
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