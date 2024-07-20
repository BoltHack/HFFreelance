const express = require('express');
const {registerView, registerNewUser, loginView, loginUser, logout} = require('../controller/AuthController')
const {validateRegister, validateLogin} =require('../middlewares/validate')
const {checkEmail} = require("../middlewares/checkEmail");
const {verifyToken} = require("../middlewares/authorization");
const {homeInfo} = require("../controller/IndexController");
const router = express.Router();

router.get('/register', registerView );
router.post('/register', validateRegister, checkEmail, registerNewUser);

router.get('/login', loginView);
router.post('/login',  validateLogin, loginUser);

router.post('/logout', verifyToken, logout);

module.exports = router;