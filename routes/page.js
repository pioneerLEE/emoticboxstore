const express = require('express');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const router = express.Router();
const User = require('../schemas/user');
const Author = require('../schemas/author');
const Visitinfo = require('../schemas/visitinfo');
const Normaluser = require('../schemas/normaluser');
const Company = require('../schemas/company');
const Dibs = require('../schemas/dibs');
const Emoji = require('../schemas/emoji');
const Emojipack = require('../schemas/emojipack');
const Emojipack_User = require('../schemas/emojipack_user');
const auth = require('../middlewares/auth')();

//이모티콘 상세 페이지 이탈 후 페이지 머문 시간 저장
router.put('/out/:id',auth.authenticate(),async(req,res,next)=>{
    try{
        let now = new Date();
        const exUser = await User.findOne({_id:req.user._id});
        const exEmojipack = await Emojipack.findOne({_id:req.params.id})
        const exVisitinfo = await Visitinfo.findOne({visitor:exUser.normaluser, emojipack:exEmojipack._id});
        if(!exUser || !exEmojipack || !exVisitinfo){
            res.sendStatus(404);
        }else if(exVisitinfo.cumulative_time+now-exVisitinfo.latest_visit_time>60000){
            Visitinfo.update({
                visitor:exUser.normaluser, emojipack:exEmojipack._id
            },{
                cumulative_time:60000,
                latest_out_time:now
            })
            res.sendStatus(200);
        }else{
            Visitinfo.update({
                visitor:exUser.normaluser, emojipack:exEmojipack._id
            },{
                cumulative_time:exVisitinfo.cumulative_time+now-exVisitinfo.latest_visit_time,
                latest_out_time:now
            }) 
            res.sendStatus(200);   
        }
    }catch(error){
        next(error);
    }
})


//이모티콘 상세 페이지 방문 후 로그인 정보 및 방문기록
router.get('/visit/:id',auth.authenticate(),async(req,res,next)=>{
    try{
        let now = new Date();
        let exEmojipack = await Emojipack.findOne({_id:req.params.id})
        if(!exEmojipack){
            res.sendStatus(404);
        }
        const isPurchsed = await Emojipack_User.findOne({owner:req.user._id,emojipack:exEmojipack._id});
        const exUser = await User.findOne({_id:req.user._id});
        if(exUser.normaluser){
            const isVisted = await Visitinfo.findOne({visitor:exUser.normaluser, emojipack:exEmojipack._id});
            if(isVisted && isVisted.cumulative_time<60000){
                Visitinfo.update({
                    visitor:exUser.normaluser,
                    emojipack:exEmojipack._id,
                },{
                    latest_visit_time:now,
                    count:isVisted.count+1
                })
            }else{
                const newVisitinfo = new Visitinfo({
                    emojipack:exEmojipack._id,
                    visitor:exUser.normaluser,
                    latest_visit_time:now
                });
                newVisitinfo.save();
            }
        }
        if(isPurchsed){
            res.json({isPurchsed:true});
        }else{
            res.json({isPurchsed:false});
        }
        
    }catch(error){
        next(error);
    }
});
//이모티콘 상세 페이지(로그인 상관 없음)
router.get('/detail/:id',async(req,res,next)=>{
    try{
        let exEmojipack = await Emojipack.findOne({_id:req.params.id}).populate('author emojis');
        if(!exEmojipack){
            res.sendStatus(404);
        }
        res.json({exEmojipack,isPurchsed:false});
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
        const exUser = await User.findOne({_id:req.user._id});
        const exDibs = await Dibs.findOne({emojipack : exEmojipack._id,user:exUser.normalUser});

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
        const exUser = await User.findOne({_id:req.user._id});
        const exDibs = await Dibs.findOneAndRemove({emojipack : exEmojipack._id,user:exUser.normalUser});

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