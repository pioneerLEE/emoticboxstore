const mongoose = require('mongoose');

const { Schema } = mongoose;
const { Types: { ObjectId }} = Schema;
const popularlistSchema = new Schema({
  emojipacks:[
    {
        type:ObjectId,
        ref:'Emojipack'
    }
  ],
  min:{
    type: Number,
    default:-1,
    required: true,
  },
  count:{
    type: Number,
    default:0,
    required: true,
  },
  data_fix:{
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('popularlist', popularlistSchema);