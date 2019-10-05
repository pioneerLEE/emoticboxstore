const mongoose = require('mongoose');

const { Schema } = mongoose;
const { Types: { ObjectId }} = Schema;
const platformSchema = new Schema({
  name:{
    type:String,
    required:true,
  },
  info:{
    type: String,
  },
});

module.exports = mongoose.model('Platform', platformSchema);