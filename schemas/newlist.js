const mongoose = require('mongoose');

const { Schema } = mongoose;
const { Types: { ObjectId }} = Schema;
const newlistSchema = new Schema({
  emojipacks:[
    {
        type:ObjectId,
        ref:'Emojipack'
    }
  ],
  emojipacks_thumbnail:{
    type:Array
  },
  emojipacks_name:{
    type:Array
  },
  emojipacks_author_nick:{
    type:Array
  },
  count:{ //MAX은 200
    type: Number,
    default:0,
    required: true,
  },
  data_fix:{
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Newlist', newlistSchema);