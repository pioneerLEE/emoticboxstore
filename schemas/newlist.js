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

module.exports = mongoose.model('newlist', newlistSchema);