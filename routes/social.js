const express = require('express');
const router = express.Router();
const User = require('../schemas/user');
const Nomaluser = require('../schemas/nomaluser');
const cfg = require('../jwt_config');
const passport = require('passport');
const Strategy = require('passport-facebook').Strategy;
const JWT = require("jsonwebtoken");

passport.use(new Strategy({
    clientID: "728295241017802",
    clientSecret: "d9ca379b3dec2992a887e37627406099",
    callbackURL: 'http://localhost:8001/social/auth/facebook/callback',
    passReqToCallback: true,
    profileFields: [ "birthday", "email", "gender", "last_name"],
  }, (req, accessToken, refreshToken, profile, done) => {
    User.findOne({ sns_id: profile.id, provider:'facebook' }, (err, user) => {
      if (user) {
        console.log('시작되었다',profile);
        return done(err, user);
      }
      const newUser = new User({
        sns_id: profile.id,
        provider:'facebook',
        email_verified:true,
      });
      const nomaluser = new Nomaluser({
        user:newUser._id
        //나중에 생일 업데이트 필요
      })
      nomaluser.save();
      newUser.save((user) => {
        return done(null, user);
      });
    });
  }));
  passport.serializeUser(function(user, done) {
    done(null, user);
  });
  passport.deserializeUser(function(user, done) {
    done(null, user);
  });

  router.get('/auth/facebook', passport.authenticate('facebook', {
    authType: 'rerequest', scope: ['email']
  }));
  
  router.get('/auth/facebook/callback', passport.authenticate('facebook', { failureRedirect: '/' }), async(req, res,next)=>{
    try{
      const token = await JWT.sign({_id:req.user._id},cfg.jwtSecret,{expiresIn:'30 days'});
      res.json(token)
    }catch(error){
      next(error);
    }
  });

module.exports = router;
