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

//신규 이모티콘 리스트
router.get('/newlist',async(req,res,next)=>{
    try{
        const [exNewlist] = await Newlist.find({});
        if(exNewlist){
            res.status(200).json(exNewlist);
        }else{
            res.sendStatus(204);
        }
    }catch(error){
        next(error);
    }
})

//특정작가
router.get('/detail/author/:id',async(req,res,next)=>{
    try{
        const exAuthor = await Author.findOne({_id:req.params.id}).populate('emojipacks');
        if(exAuthor){
            res.json(exAuthor);
        }else{
            res.sendStatus(204);
        }
    }catch(error){
        next(error);
    }
});

//팬되기
router.post('/fan/author/:id',auth.authenticate(),async(req,res,next)=>{
    try{
        const exAuthor = await Author.findOne({_id:req.params.id});
        const exNormaluser = await Normaluser.findOne({user:req.user._id});

        if(exAuthor){
            await exAuthor.fans.push(exNormaluser._id);
            await exNormaluser.favorite.push(exAuthor._id);
            await Author.findOneAndUpdate({_id:exAuthor._id},{fans:exAuthor.fans});
            await Normaluser.findOneAndUpdate({user:req.user._id},{favorite:exNormaluser.favorite});
            res.sendStatus(200);
        }else{
            res.sendStatus(202);
        }
    }catch(error){
        next(error);
    }
});

//팬취소하기
router.post('/unfan/author/:id',auth.authenticate(),async(req,res,next)=>{
    try{
        const exAuthor = await Author.findOne({_id:req.params.id});
        const exNormaluser = await Normaluser.findOne({user:req.user._id});
        if(!exAuthor){
            res.sendStatus(202);
        }
        else{
            //작가의 DB에서 삭제
            await Promise.all(exAuthor.fans.map(async(fan,index)=>{
                if(fan.equals(exNormaluser._id)){
                    await exAuthor.fans.splice(index,1);
                }
            }));
            await Promise.all(exNormaluser.favorite.map(async(author,index)=>{
                if(author.equals(exAuthor._id)){
                    await exNormaluser.favorite.splice(index,1);
                }
            }));
            await Author.findOneAndUpdate({_id:exAuthor._id},{fans:exAuthor.fans});
            await Normaluser.findOneAndUpdate({user:req.user._id},{favorite:exNormaluser.favorite});
            res.sendStatus(200);
        }
    }catch(error){
        next(error);
    }
})

//이미지파일가져오기
router.get('/load',async(req,res,next)=>{ //추가적인 용량, 파일 형식도 잡을 수 있도록
    const { path,emojiId } = req.query;
    try{
        if(path){
            fs.readFile((path), (error, data) => {
                if (error) {
                  console.error(error);
                  next(error);
                }
                res.end(data);
            });
        }
        else if(emojiId){
            emoji = await Emoji.findOne({_id:emojiId});
            fs.readFile((emoji.png512), (error, data) => {
                if (error) {
                  console.error(error);
                  next(error);
                }
                res.end(data);
            });
        }
        
    }catch(error){
        next(error);
    }
});

//특정 이모티콘
router.get('/detail/emojipack/:id',async(req,res,next)=>{
    try{
        const exEmojipack = await Emojipack.findOne({_id:req.params.id});
        if(exEmojipack){
            res.json(exEmojipack);
        }else{
            res.sendStatus(204);
        }
    }catch(error){
        next(error);
    }
});

//검색 이모티콘 이름, 작가이름 같은거 찾고 해당 작가 검색결과, 
router.get('/search/:searchWord',async(req,res,next)=>{
    const searchWord = req.params.searchWord;
    try{
        const exEmojipack = await Emojipack.find({name: new RegExp(searchWord)});
        const exAuthor = await Author.find({nick:searchWord}).populate('emojipacks');
        if(exAuthor[0]){
            var result = exEmojipack.concat(exAuthor[0].emojipacks);
        }else{
            res.json(exEmojipack);
        }
        if(result){
            for(let i=0;i<result.length;i++){
                check = false;
                for(let j=0;j<result.length;j++){
                    if(i !== j && result[i].name===result[j].name){
                        result[i]=-1;
                    }
                }
            }
            for(let i=0;i<result.length;i++){
                if(result[i]==-1){
                    result.splice(i, 1);
                    i--;
                }
            }
            res.json(result);
        }
        
    }catch(error){
        next(error);
    }
})



module.exports = router;