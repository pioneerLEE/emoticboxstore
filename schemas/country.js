const mongoose = require('mongoose');

const { Schema } = mongoose;
const { Types: { ObjectId }} = Schema;
const countrySchema = new Schema({
  name:{
    type: String,
    required: true,
  },
  language:{
    type:ObjectId,
    ref:'Language'
  },
});

module.exports = mongoose.model('Country', countrySchema);