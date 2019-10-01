const express = require('express');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const router = express.Router();
const User = require('../schemas/user');
const Author = require('../schemas/author');
const Nomaluser = require('../schemas/nomaluser');
const Emojipack = require('../schemas/emojipack');
const Emoji = require('../schemas/emoji')
const Company = require('../schemas/company');
const auth = require('../middlewares/auth')();

//보유한 이모티콘
router.get('/myemoji',auth.authenticate(),async(req,res,next)=>{
    try{
        const exUser = await Nomaluser.findOne({user:req.user._id})
        let result=[];
        exUser.emojipacks.map(async(emojipack,i)=>{
            try{
                exUser.emojipacks[i] = await Emojipack.findOne({_id:emojipack});
                exUser.emojipacks[i].typicalEmoji = await Emoji.findOne({_id:exUser.emojipacks[i].typicalEmoji});
                let pack={
                    packname:exUser.emojipacks[i].name,
                    author:exUser.emojipacks[i].author,
                    typicalEmoji:exUser.emojipacks[i].typicalEmoji.png512
                }
                console.log('1',result)
                return result.push(pack);
                
            }catch(error){
                next(error);
            }
        }.then(()=>{res.json(result)}))
        console.log("2",result);
        //res.json(result)
    }catch(error){
        next(error);
    }
});
//등록한 회사 목록



module.exports = router;