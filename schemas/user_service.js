const mongoose = require('mongoose');

const { Schema } = mongoose;
const { Types: { ObjectId } } = Schema;
const user_serviceSchema = new Schema({
  user: {
    type: ObjectId,
    ref: 'User'
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

module.exports = mongoose.model('User_Service', user_serviceSchema);