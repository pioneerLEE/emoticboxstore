const express = require('express');
const router = express.Router();
const User = require('../schemas/user');
const Author = require('../schemas/author');
const Visitinfo = require('../schemas/visitinfo');
const Normaluser = require('../schemas/normaluser');
const Company = require('../schemas/company');
const Emoji = require('../schemas/emoji');
const Emojipack = require('../schemas/emojipack');
const Proprietaryinfo = require('../schemas/proprietaryinfo');
const Newlist = require('../schemas/newlist');
const auth = require('../middlewares/auth')();
const fs = require('fs');


//보유목록

//구매목록

//


module.exports = router;