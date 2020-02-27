const mongoose = require('mongoose');

const { Schema } = mongoose;
const { Types: { ObjectId } } = Schema;
const company_serviceSchema = new Schema({
  company: {
    type: ObjectId,
    ref: 'Company'
  },
  service: {
    type: ObjectId,
    ref: 'Service'
  },
  data_created: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Company_Service', company_serviceSchema);