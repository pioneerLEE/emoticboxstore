const mongoose = require('mongoose');

const { Schema } = mongoose;
const { Types: { ObjectId } } = Schema;
const proprietaryinfoSchema = new Schema({
  owner: {
    type: ObjectId,
    ref: 'Normaluser'
  },
  emojipack: {
    type: ObjectId,
    ref: 'Emojipack'
  },
  date_untill: {
    type: Date,
    default: null
  },
  data_created: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Proprietaryinfo', proprietaryinfoSchema);