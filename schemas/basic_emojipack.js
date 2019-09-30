const mongoose = require('mongoose');

const { Schema } = mongoose;
const { Types: { ObjectId } } = Schema;
const basicemojipackSchema = new Schema({
    //기본 이모티콘 목록
    list: [
        {
            type: ObjectId,
            ref: 'emojipack',
        }
    ]
});

module.exports = mongoose.model('BasicEmojiPack', basicemojipackSchema);