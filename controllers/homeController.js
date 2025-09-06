const bcrypt = require("bcrypt");
const User = require("../models/userSchema");
const passport = require("passport");

module.exports.home = (req, res) => {
  res.render("index");
};

module.exports.login = (req, res) => {
  res.render("./pages/login.ejs");
};
module.exports.handleLogin = async (req, res ,next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) return next(err);
    if (!user) return res.redirect('/login?error=1');

    req.logIn(user, (err) => {
      if (err){
         return next(err);
        }else{
            return res.redirect("/");
        }
    });
  })(req, res, next);
};

module.exports.signup = (req, res) => {
  res.render("./pages/signup.ejs");
};
module.exports.signupHandle = async (req, res) => {
  const { username, email, password} = req.body;
  try {
    const existing = await User.findOne({ $or: [{ username }, { email }] });
    if (existing) {
      return res.redirect("/?signupError=1");
    } else {
      const hashed = await bcrypt.hash(password, 10);
      const newUser = await User.create({
        username,
        email,
        password: hashed
      });
      console.log("New User Created", newUser);
    }

    return res.redirect("/login");
  } catch (error) {
    console.log(error.message);
    return res.redirect("/signup");
  }
};
