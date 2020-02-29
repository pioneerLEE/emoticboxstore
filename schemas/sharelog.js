const mongoose = require('mongoose');

const { Schema } = mongoose;
const { Types: {ObjectId }} = Schema;
const sharelogSchema = new Schema({
    author:{
        type: ObjectId,
        ref: 'Author',
        required: true
    },
    payment:{
        type: ObjectId,
        ref: 'Payment',
        required: true
    },
    money:{
        type: Number,
        required: true
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

module.exports = mongoose.model('Sharelog', sharelogSchema);