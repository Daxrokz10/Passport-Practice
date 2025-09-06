const { Router } = require("express");
const  homeCtrl  = require("../controllers/homeController");
const { isAuth } = require("../middleware/isAuth");

const router = Router();

router.get("/",isAuth,homeCtrl.home);

router.get("/login",homeCtrl.login);
router.post('/login',homeCtrl.handleLogin);

router.get("/signup",homeCtrl.signup);
router.post("/signup",homeCtrl.signupHandle);

module.exports = router;