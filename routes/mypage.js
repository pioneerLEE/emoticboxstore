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
const Payment = require('../schemas/payment');
const auth = require('../middlewares/auth')();
const fs = require('fs');


//보유목록
router.get('/emojipacks',auth.authenticate(),async(req,res,next)=>{
    try{
        const exNormaluser = await Normaluser.findOne({user:req.user._id});
        if(exNormaluser){
            let result = [];
            await Promise.all(exNormaluser.emojipacks.map(async(pack,index)=>{
                let emojipack = await Emojipack.findById(pack);
                await result.push({
                    _id:emojipack._id,
                    thumbnail:emojipack.typicalEmoji,
                    name:emojipack.name,
                    author_nick:emojipack.author_nick
                })
            }));
            res.status(200).json(result);
        }else{
            res.sendStatus(204);
        }
    }catch(error){
        next(error);
    }
});

//구매목록
router.get('/payments',auth.authenticate(),async(req,res,next)=>{
    try{
        const exPayments = await Payment.find({user:req.user._id});
        if(exPayments == []){
            res.sendStatus(204);
        }else{
            let result = [];
            await Promise.all(exPayments.map(async(exPayment,index)=>{
                let exEmojipack = await Emojipack.findById(exPayment.emojipack);
                await result.push({
                    _id:exEmojipack._id,
                    thumbnail:exEmojipack.typicalEmoji,
                    name:exEmojipack.name,
                    author_nick:exEmojipack.author_nick
                })
            }));
            res.status(200).json(result);
        }
    }catch(error){
        next(error);
    }
});

//찜 목록
router.get('/dibs',auth.authenticate(),async(req,res,next)=>{
    try{
        const exNormaluser = await Normaluser.findOne({user:req.user._id});
        if(exNormaluser){
            let result = [];
            await Promise.all(exNormaluser.dibs.map(async(dib,index)=>{
                let exEmojipack = await Emojipack.findById(dib);
                await result.push({
                    _id:exEmojipack._id,
                    thumbnail:exEmojipack.typicalEmoji,
                    name:exEmojipack.name,
                    author_nick:exEmojipack.author_nick
                })
            }));
            res.status(200).json(result);
        }else{
            res.sendStatus(204);
        }
    }catch(error){
        next(error);
    }
});


//추가 연동한 이메일 목록
router.get('/emails',auth.authenticate(),async(req,res,next)=>{
    try{
        const exNormaluser = await Normaluser.findOne({user:req.user._id});
        if(exNormaluser){
            res.status(200).json(exNormaluser.linked_email);
        }else{
            res.sendStatus(204);
        }
    }catch(error){
        next(error);
    }
});

//연결된 서비스 목록
router.get('/services',auth.authenticate(),async(req,res,next)=>{
    try{
        const exNormaluser = await Normaluser.findOne({user:req.user._id});
        if(exNormaluser){
            res.status(200).json(exNormaluser.services);
        }else{
            res.sendStatus(204);
        }
    }catch(error){
        next(error);
    }
});

//이메일 추가 연동하기
router.patch('/newemail',auth.authenticate(),async(req,res,next)=>{
    try{

    }catch(error){
        next(error);
    }
});
//이메일 인증하기

//추가 연동한 이메일 삭제하기




module.exports = router;