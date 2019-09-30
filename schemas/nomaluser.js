const mongoose = require('mongoose');

const { Schema } = mongoose;
const { Types: { ObjectId }} = Schema;
const nomaluserSchema = new Schema({
  user:{
    type: ObjectId,
    ref:'User',
    required: true,
  },
  /*nick:{ //필요한가?
    type:String,
    required: true,
  },*/
  emojipacks:[
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
  //생년월일
  birth:{
    type:Number,
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

module.exports = mongoose.model('Nomaluser', nomaluserSchema);