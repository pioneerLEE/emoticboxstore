const mongoose = require('mongoose');
const { Schema } = mongoose;
const { Types: { ObjectId }} = Schema;
const emojiSchema = new Schema({
  emojipack:{
    type:ObjectId,
    ref:'Emojipack'
  },
  gif128:{
    type: String,
  },
  gif256:{
    type: String,
  },
  gif512:{
    type: String,
  },
  png128:{
    type: String,
  },
  png256:{
    type: String,
  },
  png512:{
    type: String,
  },
  tmpGif128:{
    type: String,
  },
  tmpGif256:{
    type: String,
  },
  tmpGif512:{
    type: String,
  },
  tmpPng128:{
    type: String,
  },
  tmpPng256:{
    type: String,
  },
  tmpPng512:{
    type: String,
  },
  word:{
    type:String,
  },
  //이모티콘 번호 / 1번은 해당 이모티콘팩의 메인
  number:{
      type:Number,
  },
  //해당 이모티콘에 포함된 태그들
  tags:[
    {
        type:ObjectId,
        ref:'Tag'
    }
  ],
  emojicolors:[
    {
        type:ObjectId,
        ref:'Emojicolor'
    }
  ],
  data_created:{
    type: Date,
    default: Date(),
  },
  data_fix:{
    type: Date,
    default: Date(),
  },
});
module.exports = mongoose.model('Emoji', emojiSchema);