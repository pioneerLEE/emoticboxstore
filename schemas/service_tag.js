const mongoose = require('mongoose');

const { Schema } = mongoose;
const { Types: { ObjectId } } = Schema;
const service_tagSchema = new Schema({
  tag: {
    type: ObjectId,
    ref: 'Tag'
  },
  service: {
    type: ObjectId,
    ref: 'Service'
  },
  data_created: {
    type: Date,
    default: Date(),
  },
});

module.exports = mongoose.model('Service_Tag', service_tagSchema);