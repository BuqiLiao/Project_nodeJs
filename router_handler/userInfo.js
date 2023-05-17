const db = require('../db/index.js');
const bcrypt = require('bcryptjs');


exports.getUserInfo = (req, res) => {
    const sql = 'select id, username, nickname, email, user_pic from ev_users where id=?';
    db.query(sql, req.auth.id, (err, results) => {
        if(err) return res.cc(err);
        if(results.length !== 1) return res.cc('Get user information failed');
        res.send({
            status: 0,
            message: 'Get user information successfully',
            data: results[0]
        });
    }
)}

exports.updateUserInfo = (req, res) => {
    const sql = 'update ev_users set ? where id=?';
    db.query(sql, [req.body, req.body.id], (err, results) => {
        if(err) return res.cc(err);
        if(results.affectedRows !== 1) return res.cc('Update user information failed');
        res.cc('Update user information successfully', 0);
    });
}

exports.updatePassword = (req, res) => {
    const sql = 'select * from ev_users where id=?';
    db.query(sql, req.auth.id, (err, results) => {
        if(err) return res.cc(err);
        if(results.length !== 1) return res.cc('User does not exist');

        const compareResult = bcrypt.compareSync(req.body.oldPwd, results[0].password);
        if(!compareResult) return res.cc('Old password is incorrect');

        const sql = 'update ev_users set password=? where id=?';
        const newPwd = bcrypt.hashSync(req.body.newPwd, 10);
        db.query(sql, [newPwd, req.auth.id], (err, results) => {
            if(err) return res.cc(err);
            if(results.affectedRows !== 1) return res.cc('Update password failed');
            res.cc('Update password successfully', 0);
        });
    });
}
exports.updateAvatar = (req, res) => {
    const sql = 'update ev_users set user_pic=? where id=?';
    db.query(sql, [req.body.avatar, req.auth.id], (err, results) => {
        if(err) return res.cc(err);
        if(results.affectedRows !== 1) return res.cc('Update avatar failed');
        res.cc('Update avatar successfully', 0);
    });
}
