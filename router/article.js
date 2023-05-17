const express = require('express');
const router = express.Router();

const articleHandler = require('../router_handler/article');

const expressJoi = require('@escook/express-joi');
const {add_article_schema} = require('../schema/article');


router.post('/add',upload.single('cover_img'),expressJoi(add_article_schema), articleHandler.addArticle);

module.exports = router;