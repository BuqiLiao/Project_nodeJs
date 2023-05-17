const db = require('../db/index.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../config.js');


exports.regUser = (req, res) => {
    const userInfo = req.body;

    if(!userInfo.username || !userInfo.password) {
        return res.send({status: 1, message: 'Username or password cannot be empty'});
    }
    
    const sqlStr = 'select * from ev_users where username=?';

    db.query(sqlStr, userInfo.username, (err, results) => {
        if(err) {
            return res.cc(err);
        }
        if(results.length > 0) {
            return res.cc('Username already exists');
        }
        // Encrypt the password
        userInfo.password = bcrypt.hashSync(userInfo.password, 10);
        
        const sql = 'insert into ev_users set ?';
        db.query(sql, {username: userInfo.username, password: userInfo.password}, (err, results) => {
            if(err) {
                return res.cc(err);
            }
            if(results.affectedRows !== 1) {
                return res.cc('Register failed');
            }
            res.cc('Register successfully', 0);
        })
    });
}
exports.login = (req, res) => {
    const userInfo = req.body;
    const sql = 'select * from ev_users where username=?';
    db.query(sql, userInfo.username, (err, results) => {
        if(err) return res.cc(err);
        if(results.length !== 1) return res.cc('Username does not exist');

        const compareResult = bcrypt.compareSync(userInfo.password, results[0].password);
        if(!compareResult) return res.cc('Password is incorrect');

        //Remove the password and user_pic from the results
        const user = {...results[0], password: '', user_pic: ''};
        //Generate a token
        const tokenStr = jwt.sign(user, config.jwtSecretKey, {expiresIn: config.expiresIn});
        
        res.send({
            status: 0,
            message: 'Login successfully',
            token: 'Bearer ' + tokenStr
        });
    });
}