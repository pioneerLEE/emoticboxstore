const mongoose = require('mongoose');

const { Schema } = mongoose;
const { Types: { ObjectId }} = Schema;
const tagSchema = new Schema({
  name:{
    type: String,
    required: true,
  },
  parent_tag:{
    type:ObjectId,
    ref:'Tag'
  },
});

module.exports = mongoose.model('Tag', tagSchema);