const mongoose = require('mongoose');

const { Schema } = mongoose;
const { Types: { ObjectId }} = Schema;
const visitinfoSchema = new Schema({
  visitor:{
    type:ObjectId,
    ref:'Normaluser',
    required:true,
  },
  emojipack:{
    type:ObjectId,
    ref:'Emojipack',
    required:true,
  },
  count:{
      type:Number,
      default:0,
  },
  cumulative_time:{
      type: Number,
      default: 0,
  },
  latest_visit_time:{
    type: Date,
  },
  latest_out_time:{
    type: Date,
  },
  data_created:{
    type: Date,
    default: Date.now,
  },
  data_fix:{
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Visitinfo', visitinfoSchema);