const express = require('express');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const router = express.Router();
const User = require('../schemas/user');
const Author = require('../schemas/author');
const Nomaluser = require('../schemas/nomaluser');
const Company = require('../schemas/company');
const Dibs = require('../schemas/dibs');
const Emoji = require('../schemas/emoji');
const Emojipack = require('../schemas/emojipack');
const Emojipack_User = require('../schemas/emojipack_user');
const auth = require('../middlewares/auth')();

//이모티콘 상세 페이지(작가 보유 확인) ...? 작가가 보유한건지 따로 빼야할까? 
router.get('/detail/:id',auth.authenticate(),async(req,res,next)=>{
    try{
        let exEmojipack = await Emojipack.findOne({_id:req.params.id}).populate('author emojis')
        const isPurchsed = await Emojipack_User.findOne({owner:req.user._id,emojipack:exEmojipack._id});
        res.json({exEmojipack,isPurchsed});
    }catch(error){
        next(error);
    }
});
//새로나온 이모티콘
router.get('/newlist', async(req,res,next)=>{
    try{
        const emojipacks = await Emojipack.find({}).sort({data_created:-1}).limit(100);

        let result=[];
        
        for(var i=0;i<emojipacks.length;i++){
            emojipacks[i].typicalEmoji = await Emoji.findOne({_id:emojipacks[i].typicalEmoji});
            emojipacks[i].author = await Author.findOne({_id:emojipacks[i].author})
            let pack={
                _id:emojipacks[i]._id,
                packname:emojipacks[i].name,
                author:{nick:emojipacks[i].author.nick , _id: emojipacks[i].author._id},
                typicalEmoji:emojipacks[i].typicalEmoji.png512
            }
            result.push(pack);
        }

        res.json(result)
    }catch(error){
        next(error);
    }
})

//찜 추가
router.post('/dibs/:emojipackid', auth.authenticate(),async(req,res,next)=>{
    try{
        const exEmojipack = await Emojipack.findOne({_id:req.params.emojipackid});
        const exDibs = await Dibs.findOne({emojipack : exEmojipack._id,user:req.user._id});

        if(!exDibs && exEmojipack){
            const newDibs = await new Dibs({
                emojipack : exEmojipack._id,
                user:req.user._id
            });
            newDibs.save();
            res.sendStatus(201)
        }
        else{
            res.sendStatus(203)
        }
    }catch(error){
        next(error);
    }
})
//찜 삭제
router.delete('/dibs/:emojipackid', auth.authenticate(),async(req,res,next)=>{
    try{
        const exEmojipack = await Emojipack.findOne({_id:req.params.emojipackid});
        const exDibs = await Dibs.findOneAndRemove({emojipack : exEmojipack._id,user:req.user._id});

        if(exDibs && exEmojipack){
            res.sendStatus(200);
        }
        else{
            res.sendStatus(203);
        }
    }catch(error){
        next(error);
    }
})

//인기있는 이모티콘(판매량)
router.get('/popularlist', async(req,res,next)=>{
    try{
        const emojipacks = await Emojipack.find({}).sort({sold:-1}).limit(100);

        let result=[];
        
        for(var i=0;i<emojipacks.length;i++){
            emojipacks[i].typicalEmoji = await Emoji.findOne({_id:emojipacks[i].typicalEmoji});
            emojipacks[i].author = await Author.findOne({_id:emojipacks[i].author})
            let pack={
                _id:emojipacks[i]._id,
                packname:emojipacks[i].name,
                author:{nick:emojipacks[i].author.nick , _id: emojipacks[i].author._id},
                typicalEmoji:emojipacks[i].typicalEmoji.png512
            }
            result.push(pack);
        }

        res.json(result)
    }catch(error){
        next(error);
    }
})

//해당 작가 작품
//금주의 인기있는 이모티콘


module.exports = router;