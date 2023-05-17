const joi = require('joi');

const title = joi.string().required();
const subject_id = joi.number().integer().min(1).required();
const content = joi.string().required().allow('');
const state = joi.string().valid('Published', 'Drafted').required();


exports.add_article_schema = {
    body: {
        title,
        subject_id,
        content,
        state
    }
}