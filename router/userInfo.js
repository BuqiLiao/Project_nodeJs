const express = require('express');
const router = express.Router();

const userInfoHandler = require('../router_handler/userInfo');

const expressJoi = require('@escook/express-joi');
const {update_userinfo_schema, update_pwd_schema, update_avatar_schema} = require('../schema/user');

router.get('/userinfo', userInfoHandler.getUserInfo);
router.post('/userinfo',expressJoi(update_userinfo_schema), userInfoHandler.updateUserInfo);
router.post('/updatepwd',expressJoi(update_pwd_schema), userInfoHandler.updatePassword);
router.post('/update/avatar',expressJoi(update_avatar_schema), userInfoHandler.updateAvatar);

module.exports = router;