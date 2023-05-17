const express = require('express');
const router = express.Router();
const subjectHandler = require('../router_handler/subject');

const expressJoi = require('@escook/express-joi');
const {
    get_subject_byID_schema,
    add_subject_schema,
    delete_subject_schema,
    update_subject_schema
} = require('../schema/subject');

router.get('/subject/list', subjectHandler.getSubjectList);
router.get('/subject/list/:id',expressJoi(get_subject_byID_schema), subjectHandler.getSubjectListById);
router.post('/subject/add',expressJoi(add_subject_schema), subjectHandler.addSubject);
router.get('/subject/delete/:id',expressJoi(delete_subject_schema), subjectHandler.deleteSubject);
router.post('/subject/update',expressJoi(update_subject_schema), subjectHandler.updateSubject);

module.exports = router;