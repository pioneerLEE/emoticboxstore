const mongoose = require('mongoose');
const { Schema } = mongoose;
const { Types: { ObjectId }} = Schema;
const agecountSchema = new Schema({
  emojipack:{
    type:ObjectId,
    ref:'Emojipack'
  },
  age0:{
    type: Number,
    required: true,
    default: 0
  },
  age10:{
    type: Number,
    required: true,
    default: 0
  },
  age20:{
    type: Number,
    required: true,
    default: 0
  },
  age30:{
    type: Number,
    required: true,
    default: 0
  },
  age40:{
    type: Number,
    required: true,
    default: 0
  },
  age50:{
    type: Number,
    required: true,
    default: 0
  },
  data_created:{
    type: Date,
    default: Date(),
  },
});
module.exports = mongoose.model('Agecount', agecountSchema);