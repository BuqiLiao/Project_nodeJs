const joi = require('joi');

const id = joi.number().integer().min(1).required();
const name = joi.string().required();
const alias = joi.string().alphanum().required();

exports.get_subject_byID_schema = {
    params: {
        id
    }
}
exports.add_subject_schema = {
    body: {
        name,
        alias
    }
}
exports.delete_subject_schema = {
    params: {
        id
    }
}
exports.update_subject_schema = {
    body: {
        id,
        name,
        alias
    }
}