const mongoose = require('mongoose');

const { Schema } = mongoose;
const { Types: { ObjectId }} = Schema;
const author_emojipackSchema = new Schema({
  author:{
    type:ObjectId,
    ref:'Author'
  },
  emojipack:{
    type:ObjectId,
    ref:'Emojipack'
  },
  data_created:{
    type: Date,
    default: Date(),
  },
});

module.exports = mongoose.model('Author_emojipack', author_emojipackSchema);