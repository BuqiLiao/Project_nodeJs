
const joi = require('joi');

/*
* string() specifies that the value is a string
* alphanum() specifies that the value is a string and a-z, A-Z, 0-9
* min(length) specifies the minimum length of the string
* max(length) specifies the maximum length of the string
* required() specifies that the value is required
* pattern(regexp) specifies the regular expression that the string must match
*/
const id = joi.number().integer().min(1).required();
const username = joi.string().alphanum().min(1).max(10).required();
const password = joi.string().pattern(/^[\S]{6,12}$/).required();
const nickname = joi.string().required();
const email = joi.string().email().required();

const avatar = joi.string().dataUri().required();


exports.reg_login_schema = {
    body: {
        username,
        password
    }
}
exports.update_userinfo_schema = {
    body: {
        id,
        nickname,
        email
    }
}
exports.update_pwd_schema = {
    body: {
        oldPwd: password,
        // joi.ref('oldPwd') specifies that the value must be the same as the value of oldPwd
        // joi.not(joi.ref('oldPwd')) specifies that the value must be different from the value of oldPwd
        // concat() specifies that it also needs to meet the password rules
        newPwd: joi.not(joi.ref('oldPwd')).concat(password)
    }
}
exports.update_avatar_schema = {
    body: {
        avatar
    }
}