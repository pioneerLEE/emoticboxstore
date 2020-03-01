const express = require('express');
const asyncify = require('express-asyncify');
const router = asyncify(express.Router());
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const User = require('../schemas/user');
const Author = require('../schemas/author');
const Normaluser = require('../schemas/normaluser');
const Emojipack = require('../schemas/emojipack');
const Emoji = require('../schemas/emoji')
const Company = require('../schemas/company');
const Dibs = require('../schemas/dibs');
const auth = require('../middlewares/auth')();

//보유한 이모티콘
router.get('/myemoji',auth.authenticate(),async(req,res,next)=>{
    try{
        const exUser = await Normaluser.findOne({user:req.user._id})
        let result=[];
        
        for(var i=0;i<exUser.emojipacks.length;i++){
            exUser.emojipacks[i] = await Emojipack.findOne({_id:exUser.emojipacks[i]});
            exUser.emojipacks[i].author = await Author.findOne({_id:exUser.emojipacks[i].author})
            let pack={
                _id: exUser.emojipacks[i]._id,
                name: exUser.emojipacks[i].name,
                author: {nick:exUser.emojipacks[i].author.nick , _id: exUser.emojipacks[i].author._id},
                typicalEmoji: exUser.emojipacks[i].typicalEmoji,
                isFree: exUser.emojipacks[i].isFree,
                price: exUser.emojipacks[i].price,
            }
            result.push(pack);
        }
        res.status(201).json(result)
    }catch(error){
        next(error);
    }
});

//찜 목록
router.get('/dibs', auth.authenticate(),async(req,res,next)=>{
    try{
        const exUser = await User.findOne({_id:req.user._id});
        const dibs = await Dibs.find({user:exUser.normaluser}).populate('emojipack');
        let result=[];
        if(dibs===[]){
            res.json(result);
        }
        for(i in dibs){
            dibs[i].emojipack.typicalEmoji = await Emoji.findOne({_id:dibs[i].emojipack.typicalEmoji});
            dibs[i].emojipack.author = await Author.findOne({_id:dibs[i].emojipack.author})
            let pack={
                _id:dibs[i].emojipack._id,
                packname:dibs[i].emojipack.name,
                author:{nick:dibs[i].emojipack.author.nick , _id: dibs[i].emojipack.author._id},
                typicalEmoji:dibs[i].emojipack.typicalEmoji.png512
            }
            console.log('1',result)
            result.push(pack);
        }
        res.json(result);

    }catch(error){
        next(error);
    }
})

//등록한 회사 목록



module.exports = router;