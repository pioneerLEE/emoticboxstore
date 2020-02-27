const mongoose = require('mongoose');

const { Schema } = mongoose;
const { Types: { ObjectId }} = Schema;
const withdraw_reqSchema = new Schema({ //상태, 요청한 유저하고(user), 뭘로 요청했는지(paypal or account),  
  status:{
    type:String,
    required:true,
    default:"waiting", //complete
  },
  user:{
    type:ObjectId,
    ref: 'User',
  },
  way:{//paypal , account
    type:String,
    required:true,
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

module.exports = mongoose.model('Withdraw_req', withdraw_reqSchema);