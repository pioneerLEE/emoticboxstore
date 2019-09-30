const mongoose = require('mongoose');

const { Schema } = mongoose;
const { Types: { ObjectId }} = Schema;
const countrySchema = new Schema({
  name:{
    type: String,
    required: true,
  }
});

module.exports = mongoose.model('Country', countrySchema);