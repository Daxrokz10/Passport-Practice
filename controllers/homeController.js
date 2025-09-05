const bcrypt = require('bcrypt');
const User = require('../models/userSchema');
const passport = require('passport');

module.exports.home = (req,res)=>{
    res.render('index');
}

module.exports.login = (req,res)=>{
    res.render('./pages/login.ejs')
}
module.exports.handleLogin = async (req,res)=>{
    passport.authenticate('local',(err,user,info)=>{
        if(err) return next(err);
        if (!user) return res.redirect('/login?error=1');

        req.logIn(user,(err)=>{
            return res.redirect('/');
        })
    })
}

module.exports.signup = (req,res)=>{
    res.render('./pages/signup.ejs')
}
