const mongoose = require('mongoose');

const { Schema } = mongoose;
const { Types: { ObjectId }} = Schema;
const dibsSchema = new Schema({
  emojipack:{  //이름 변경함
    type:ObjectId,
    ref:'Emojipack'
  },
  user:{
    type:ObjectId,
    ref:'Normaluser'
  },
  data_created:{
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Dibs', dibsSchema);