const mongoose = require('mongoose');

const { Schema } = mongoose;
const { Types: { ObjectId }} = Schema;
const countrycountSchema = new Schema({
  emojipack:{
    type:ObjectId,
    ref:'Emojipack'
  },
  country: {
    type:ObjectId,
    ref:'Country'
  },
  count:{
    type: Number,
    required: true,
    default:0,
  },
  data_created: {
    type: Date,
    default: Date(),
  },
});

module.exports = mongoose.model('Countrycount', countrycountSchema);