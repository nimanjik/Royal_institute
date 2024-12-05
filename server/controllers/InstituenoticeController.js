const NoticeModel = require('../models/InstituteNotice');

const InstituteNotices = (req, res) => {
    NoticeModel.find()
    .then(MyClasses => res.json(MyClasses))
    .catch(err => res.json(err));
}

const createInstituteNotices = (req, res) => {
    NoticeModel.create(req.body)
    .then((data) => {
        res.json(data);
    })
    .catch((err) => {
        res.json(err);
    });
}

const deleteInstituteNotices = (req, res) => {
    const id = req.params.id;
    NoticeModel.findByIdAndDelete({_id:id})
    .then(MyClasses => res.json(MyClasses))
    .catch(err => res.json(err));
}

module.exports = {
    InstituteNotices,
    createInstituteNotices,
    deleteInstituteNotices
}