const mongoose = require('mongoose');

const { Schema } = mongoose;
const { Types: { ObjectId } } = Schema;
const emojipack_userSchema = new Schema({
  owner: {
    type: ObjectId,
    ref: 'User'
  },
  emojipack: {
    type: ObjectId,
    ref: 'Emojipack'
  },
  data_untill: {
    type: Date,
    default: null
  },
  data_created: {
    type: Date,
    default: Date(),
  },
});

module.exports = mongoose.model('Emojipack_User', emojipack_userSchema);