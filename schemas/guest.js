const mongoose = require('mongoose');

const { Schema } = mongoose;
const { Types: { ObjectId }} = Schema;
const guestSchema = new Schema({
  service:{
    type:ObjectId,
    ref:'Service'
  },
  emojipacks:[
    {
        type:ObjectId,
        ref:'Emojipack'
    }
  ],
  guest_id:{
    type: String,
    required: true,
  },
  data_created:{
    type: Date,
    default: Date(),
  },
});

module.exports = mongoose.model('Guest', guestSchema);