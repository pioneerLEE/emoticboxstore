const mongoose = require('mongoose');
const { Schema } = mongoose;
const { Types: { ObjectId }} = Schema;
const languageSchema = new Schema({
  name:{
      type:String,
      required:true,
  }
});

module.exports = mongoose.model('Language', languageSchema);