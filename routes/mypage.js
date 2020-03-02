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
router.get('/emojipacks',auth.authenticate(),async(req,res,next)=>{
    try{
        const exNormaluser = await Normaluser.findOne({user:req.user._id});
        if(exNormaluser){
            res.status(200).json(exNormaluser.emojipacks);
        }else{
            res.sendStatus(204);
        }
    }catch(error){
        next(error);
    }
});

//구매목록

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