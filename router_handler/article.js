const db = require('../db/index');
const multer = require('multer');
const path = require('path');

const upload = multer({dest: path.join(__dirname, '../uploads')});


exports.addArticle = (req, res) => {
    console.log(req.body);
    console.log(req.file);
    
    if(!req.file || req.file.fieldname !== 'cover_img') return res.cc('Article cover image is required');

    const articleInfo = {
        ...req.body,
        cover_img: path.join('/uploads', req.file.filename),
        pub_date: new Date(),
        author_id: req.auth.id
    }

    const sql = 'insert into ev_articles set ?';
    db.query(sql, articleInfo, (err, results) => {
        if(err) return res.cc(err);
        if(results.affectedRows !== 1) return res.cc('Add article failed');
        res.cc('Add article successfully', 0);
    });
}