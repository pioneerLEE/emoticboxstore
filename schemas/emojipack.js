const mongoose = require('mongoose');

const { Schema } = mongoose;
const { Types: { ObjectId } } = Schema;
const emojipackSchema = new Schema({
  //이모티콘 이름
  name: {
    type: String,
    required: true,
  },
  author: {
    type: ObjectId,
    ref: 'Author',
    required:true,
  },
  author_nick: {
    type: String
  },
  //이모티콘 설명
  summary: {
    type: String,
    default:""
  },
  keyword:{
    type:String,
    default:""
  },
  //이모티콘 지원 언어 ex) global, En, Kr, JP
  language: {
    type: ObjectId,
    ref: 'Language',
  },
  //해당 팩에 속한 낱개의 이모티콘들
  emojis: [
    {
      type: ObjectId,
      ref: 'Emoji'
    }
  ],
  //해당 이모티콘팩에 포함된 태그들
  tags: [
    {
      type: ObjectId,
      ref: 'Tag'
    }
  ],
  //해당 이모티콘팩에 대표되는 태그들
  typicalTags: [
    {
      type: ObjectId,
      ref: 'Tag'
    }
  ],
  //해당 이모티콘팩의 대표 이모티콘
  typicalEmoji: {
    type: ObjectId,
    ref: 'Emoji',
  },
  //기본 이모티콘 여부
  isBasic: {
    type: Boolean,
    default: false,
  },
  //종류
  isAnimated: {
    type: Boolean,
    default: false,
  },
  isBrand: {
    type: Boolean,
    default: false,
  },
  isFree: {
    type: Boolean,
    default: false,
  },
  isReqTrans: {
    type: Boolean,
    default: false,
  },
  emojiCount: {
    type: Number,
    default: 0,
  },
  sale: {
    type: Boolean,
    default: false,
  },
  sold: {
    type: Number,
    default: 0,
  },
  price: {
    type: Number,
    default: 0,
  },
  //심사 중: "decision in process" 완료: "complete" 반려:"return" 수정 확인중 : 'checking modification'
  status:{
    type:String,
    required:true,
    default:"decision in process"
  },
  data_created: {
    type: Date,
    default: Date.now,
  },
  data_fix: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Emojipack', emojipackSchema);
