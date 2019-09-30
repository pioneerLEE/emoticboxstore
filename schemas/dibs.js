const mongoose = require('mongoose');

const { Schema } = mongoose;
const { Types: { ObjectId }} = Schema;
const dibsSchema = new Schema({
  emojipacks:{
    type:ObjectId,
    ref:'Emojipack'
  },
  user:{
    type:ObjectId,
    ref:'User'
  },
  data_created:{
    type: Date,
    default: Date(),
  },
});

module.exports = mongoose.model('Dibs', dibsSchema);