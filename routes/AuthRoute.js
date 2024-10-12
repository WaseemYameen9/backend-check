const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/AuthController')
//const auth = require('../middleware/Auth');


router.post('/create',AuthController.SignUp);
router.post('/login',AuthController.Login)
router.post('/admin-login',AuthController.AdminLogin)
router.post('/admin-signup',AuthController.AdminSignUp)
router.post('/logout' ,AuthController.Logout)
router.post('/forgotpassword' ,AuthController.ForgotPassword)
router.post('/refresh' ,AuthController.ForgotPassword)

module.exports = router;