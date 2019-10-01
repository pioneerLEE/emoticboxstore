const express = require('express');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const router = express.Router();
const User = require('../schemas/user');
const Author = require('../schemas/author');
const Nomaluser = require('../schemas/nomaluser');
const Company = require('../schemas/company');
const Emojipack = require('../schemas/emojipack');
const auth = require('../middlewares/auth')();

//작가 이모티콘
router.get('/author/:nick',auth.authenticate(),async(req,res,next)=>{
    try{
        const exAuthor = await Author.findOne({nick:req.params.nick});
        if(exAuthor){
            const emojipacks = await Emojipack.find({author:exAuthor._id});
            res.json(emojipacks);
        }else{
            res.sendStatus(203);
        }
        
    }catch(error){
        next(error);
    }
});

//이모티콘 이름 작가명   // * 태그 기능 추가 필요
router.get('/:query',auth.authenticate(),async(req,res,next)=>{
    try{
        let result=[];
        const emojipacks = await Emojipack.find({}).select({name:1,author:1}).sort({sold:-1, data_created:-1}); //판매량 내림차순, 최신
        
        for(i in emojipacks){
        
            let author = await Author.findOne({_id:emojipacks[i].author}).select({nick:1});
            emojipacks[i].author=author;
        
            let nameSearch = emojipacks[i].name.indexOf(req.params.query);
            let authorSearch = emojipacks[i].author.nick.indexOf(req.params.query);
        
            if(nameSearch !=-1 ){
                result.push(emojipacks[i]);
            }else if(authorSearch != -1){
                result.push(emojipacks[i]);
            }
        }
    res.json(result);

    }catch(error){
        next(error);
    }
});


module.exports = router;