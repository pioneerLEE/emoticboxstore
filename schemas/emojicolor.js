const mongoose = require('mongoose');

const { Schema } = mongoose;
const { Types: { ObjectId } } = Schema;
const emojicolorSchema = new Schema({
  color: {
    type: String,
    required: true,
  },
  precent: {
    type: String,
    required: true,
  },
  emoji: {
    type: ObjectId,
    ref: 'Emoji'
  },
  data_created: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('EmojiColor', emojicolorSchema);