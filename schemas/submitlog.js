const mongoose = require('mongoose');

const { Schema } = mongoose;
const { Types: { ObjectId }} = Schema;
const submitlogSchema = new Schema({
  author:{
    type:ObjectId,
    ref:'Author'
  },
  emojipack:{
    type:ObjectId,
    ref:'Emojipack'
  },
  data_until:{
    type: Date,
    default: Date.now,
  },
  data_created:{
    type: Date,
    default: Date.now,
  },
  data_fix:{
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Submitlog', submitlogSchema);