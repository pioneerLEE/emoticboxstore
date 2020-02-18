const mongoose = require('mongoose');

const { Schema } = mongoose;
const { Types: { ObjectId }} = Schema;
const translate_reqSchema = new Schema({
  emojipack:{
    type:ObjectId,
    ref:'Emojipack'
  },
  languages: [
    {
      type: ObjectId,
      ref: 'Language'
    }
  ],
  data_created: {
    type: Date,
    default: Date(),
  },
});

module.exports = mongoose.model('Translate_req', translate_reqSchema);