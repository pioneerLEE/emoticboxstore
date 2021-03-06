const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth')();

const User = require('../schemas/user');
const Normaluser = require('../schemas/normaluser');
const Emojipack = require('../schemas/emojipack');
const Service = require('../schemas/service');
const Payment = require('../schemas/payment')

//결제 완료
router.post('/purchase/service',auth.authenticate(),async(req,res,next)=>{
    const { serviceid, emojipackid, platform, money, useService } = req.body;
    //결제 완료에 대한 정보가 req.body를 통해 전달 되어야함.
    try{
        const exUser = await User.findOne({_id:req.user._id});
        const exNormaluser = await Normaluser.findOne({_id:exUser.normaluser});
        const exEmojipack = await Emojipack.findOne({_id:emojipackid});
        const exService = useService ? await Service.findOne({_id:serviceid}) : null;
        await exNormaluser.services.push(exEmojipack._id);
        await exNormaluser.save()
        if(exUser && exEmojipack){
            const newPayment = useService ? new Payment({
                user:exUser._id,
                emojipack: exEmojipack._id,
                service: exService._id,
                platform, //platform -> 'android' 'ios' 'web' ...
                money,
                useService:true
            }) : new Payment({
                user:exUser._id,
                emojipack: exEmojipack._id,
                platform, //platform -> 'android' 'ios' 'web' ...
                money,
                useService:false
            })
            newPayment.save();    
        }else{
            res.sendStatus(204)
        }
    }catch(error){
        next(error);
    }
})

//임시방편
router.post('/getpack',auth.authenticate(),async(req,res,next)=>{
    const { emojipackid } = req.body;
    try{
        console.log(emojipackid);
        const exNormaluser = await Normaluser.findOne({user:req.user._id});
        const exEmojipack = await Emojipack.findOne({_id:emojipackid});
        if(exNormaluser && exEmojipack){
            let isExist = (exNormaluser.emojipacks.indexOf(emojipackid) !==-1);
            if(!isExist){
                exNormaluser.emojipacks.push(emojipackid);
                await exNormaluser.save();
                res.sendStatus(200);
            }else{
                res.sendStatus(202);
            }
        }else{
            res.sendStatus(204);
        }    
    }catch(error){
        next(error);
    }
})


module.exports = router;