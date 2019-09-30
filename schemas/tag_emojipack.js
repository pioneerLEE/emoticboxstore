const mongoose = require('mongoose');

const { Schema } = mongoose;
const { Types: { ObjectId } } = Schema;
const tag_emojipackSchema = new Schema({
  tag: {
    type: ObjectId,
    ref: 'Tag'
  },
  emojipack: {
    type: ObjectId,
    ref: 'Emojipack'
  },
  data_created: {
    type: Date,
    default: Date(),
  },
});

module.exports = mongoose.model('Tag_Emojipack', tag_emojipackSchema);