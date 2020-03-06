const express = require('express');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const router = express.Router();
const User = require('../schemas/user');
const Normaluser = require('../schemas/normaluser');
const Email_directory = require('../schemas/email_directory');
const JWT = require("jsonwebtoken");
const auth = require('../middlewares/auth')();
const cfg = require('../jwt_config');
const nodemailer = require('nodemailer');
require('dotenv').config();

const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);//sendgrid 설정

//이메일 인증
router.get('/signup/confirmEmail',async(req,res,next)=>{
  const key_for_verify=req.query.key
  try{
    const exUser = await User.updateOne({key_for_verify},{email_verified:true});
    if(exUser.n){
      res.send(200)
    }else{
      res.send(401)
    }
  }catch(error){
    next(error);
  }
});


//회원가입(유저)
router.post('/signup/user',async(req,res,next)=>{
  const { email, password } = req.body;
  try{
    const checkUser = await User.findOne({email});
    if(checkUser){ //email 중복 체크
      res.sendStatus(401);
    }else{ //회원가입
      let key_for_verify = crypto.randomBytes(256).toString('hex').substr(100, 5)
      key_for_verify += crypto.randomBytes(256).toString('base64').substr(50, 5); //인증 키
      const url = 'http://' + req.get('host')+'/signup/confirmEmail'+'?key='+key_for_verify; //인증을 위한 주소
      const hash = await bcrypt.hash(password, 5);
      const exUser = new User({
        email,
        password:hash,
        key_for_verify
      });
      let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'kde740998@gmail.com',  // gmail 계정 아이디를 입력
          pass: 'youngju3791'          // gmail 계정의 비밀번호를 입력
        }
      });

      const msg = { //인증 메일
        to: email,
        from: 'sltkdaks@naver.com', //나중에 회사 메일 하나 만들기
        subject: '회원가입 완료',
        html : '<h1>이메일 인증을 위해 URL을 클릭해주세요.</h1><br>'+url
      };

      transporter.sendMail(msg, function(error, info){
        if (error) {
          console.log(error);
        }
        else {
          console.log('Email sent: ' + info.response);
        }
      });

      exUser.save();
      res.sendStatus(201);
    }
  }catch(error){
    next(error);
  }
});


//등록(일반회원)
router.post('/register/user',auth.authenticate(),async(req,res,next)=>{
  const { birth } = req.body;
  try{
    const exUser = await User.findOne({_id:req.user._id});
    const exNormaluser = await Normaluser.findOne({user:exUser._id});
    if(exNormaluser){
      res.sendStatus(202);
    }else{
      const newNormaluser = new Normaluser({
        user:exUser._id,
        birth
      })
      exUser.normaluser = newNormaluser._id;
      exUser.save();
      newNormaluser.save();
      res.sendStatus(201);
    }
  }catch(error){
    next(error);
  }
});

//이메일 중복 체크
router.get('/signup/email/:email',async(req,res,next)=>{
  try{
    const checkUser = await User.findOne({email:req.params.email});
    if(checkUser){ //email 중복됨
      res.sendStatus(200);
    }else{ //중복되지 않는 이메일
      res.sendStatus(202);
    }
  }catch(error){
    next(error);
  }
});

//로그인
router.post('/signin',async(req,res,next)=>{
  const {email, password} = req.body;
  try{
    const exUser = await User.findOne({email});
    const result = await bcrypt.compare(password,exUser.password);
    if(result){
      let token = JWT.sign({
        _id:exUser._id
      },
      cfg.jwtSecret,    // 비밀 키
      {
        expiresIn: '30 days'    // 유효 시간은 30일
      });
      res.status(200).json({
        token: token,
        User:exUser
      });
    }else{
      res.sendStatus(401); //수정해야함  
    }
  }catch(error){
    next(error);
  }
});

//비밀번호 변경
router.patch('/password',auth.authenticate(),async(req,res,next)=>{
  const { currentPassword, newPassword } = req.body;
  try{
    const exUser = await User.findOne({_id:req.user._id});
    const result = await bcrypt.compare(currentPassword,exUser.password);
    if(result){
      const hash = await bcrypt.hash(newPassword, 5);
      await User.findOneAndUpdate({_id:req.user._id},{password:hash});
      res.sendStatus(200);
    }else{
      res.sendStatus(401);
    }
  }catch(error){
    next(error);
  }
});

//이메일 추가 연동하기
router.post('/linkedemail',auth.authenticate(),async(req,res,next)=>{
  const { newEmail } = req.body;
  try{
    const isNew = await Email_directory.findOne({email:newEmail});
    const exUser  = await User.findOne({_id:req.user._id});
    const exNormaluser = await Normaluser.findOne({user:req.user._id});
    console.log(exNormaluser);
    console.log(exNormaluser.linked_email.length);
    if(!isNew && exNormaluser.linked_email.length<3){
      await exNormaluser.linked_email.push(newEmail);
      await exNormaluser.email_varify.push(false);
      let key = crypto.randomBytes(256).toString('hex').substr(100, 5) + crypto.randomBytes(256).toString('base64').substr(50, 5); //인증 키
      await exNormaluser.email_keys.push(key);
      const url = 'http://' + req.get('host')+'/linkedemail/confirmEmail'+'?key='+key+'?user='+exUser._id; //인증을 위한 주소
      let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'kde740998@gmail.com',  // gmail 계정 아이디를 입력
          pass: 'youngju3791'          // gmail 계정의 비밀번호를 입력
        }
      });
      const msg = { //인증 메일
        to: newEmail,
        from: 'sltkdaks@naver.com', //나중에 회사 메일 하나 만들기
        subject: '회원가입 완료',
        html : '<h1>이메일 인증을 위해 URL을 클릭해주세요.</h1><br>'+url
      };

      transporter.sendMail(msg, function(error, info){
        if (error) {
          console.log(error);
        }
        else {
          console.log('Email sent: ' + info.response);
        }
      });
      const updateNormaluser= await Normaluser.findOneAndUpdate({_id:exNormaluser._id},{
        linked_email:exNormaluser.linked_email,
        email_varify:exNormaluser.email_varify,
        email_keys:exNormaluser.email_keys
      });
      res.status(200).json(updateNormaluser);
    }else if(exNormaluser.linked_email.length>=3){
      res.sendStatus(202);
    }else{
      res.send("not new");
    }
  }catch(error){
    next(error);
  }
});

router.get('/linkedemail/confirmEmail',async(req,res,next)=>{
  const {key_for_verify, user}=req.query.key
  try{
    const exNormaluser = await Normaluser.findOne({user});
    
    if(exNormaluser){
      res.send(200)
    }else{
      res.send(401)
    }
  }catch(error){
    next(error);
  }
});


module.exports = router;
