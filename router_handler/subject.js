
const db = require('../db/index.js');

exports.getSubjectList = (req, res) => {
    const sql = 'select * from ev_subjects where is_delete=0 order by id asc';
    db.query(sql, (err, results) => {
        if(err) return res.cc(err);
        res.send({
            status: 0,
            message: 'Get subject list successfully',
            data: results
        });
    });
}
exports.getSubjectListById = (req, res) => {
    const sql = 'select * from ev_subjects where id=?';
    db.query(sql, req.params.id, (err, results) => {
        if(err) return res.cc(err);
        if(results.length !== 1) return res.cc('Subject does not exist');
        if(results[0].is_delete === 1) return res.cc('Subject has been deleted');
        res.send({
            status: 0,
            message: 'Get subject information successfully',
            data: results[0]
        });
    });
}
exports.addSubject = (req, res) => {
    const sql = 'select * from ev_subjects where name=? or alias=?';
    db.query(sql, [req.body.name, req.body.alias], (err, results) => {
        if(err) return res.cc(err);
        if(results.length === 2) return res.cc('Subject name and alias already exist');
        if(results.length === 1 && results[0].name === req.body.name) return res.cc('Subject name already exist');
        if(results.length === 1 && results[0].alias === req.body.alias) return res.cc('Subject alias already exist');

        const sql = 'insert into ev_subjects set ?';
        db.query(sql, req.body, (err, results) => {
            if(err) return res.cc(err);
            if(results.affectedRows !== 1) return res.cc('Add subject failed');
            res.cc('Add subject successfully', 0);
        });
    });
}
exports.deleteSubject = (req, res) => {
    const sql = 'update ev_subjects set is_delete=1 where id=?';
    db.query(sql, req.params.id, (err, results) => {
        if(err) return res.cc(err);
        if(results.affectedRows !== 1) return res.cc('Delete subject failed');
        res.cc('Delete subject successfully', 0);
    });
}
exports.updateSubject = (req, res) => {
    const sql = 'select * from ev_subjects where id<>? and (name=? or alias=?)';
    db.query(sql, [req.body.id, req.body.name, req.body.alias], (err, results) => {
        if(err) return res.cc(err);
        if(results.length === 2) return res.cc('Subject name and alias already exist');
        if(results.length === 1 && results[0].name === req.body.name) return res.cc('Subject name already exist');
        if(results.length === 1 && results[0].alias === req.body.alias) return res.cc('Subject alias already exist');

        const sql = 'update ev_subjects set ? where id=?';
        db.query(sql, [req.body, req.body.id], (err, results) => {
            if(err) return res.cc(err);
            if(results.affectedRows !== 1) return res.cc('Update subject failed');
            res.cc('Update subject successfully', 0);
        });
    });
}