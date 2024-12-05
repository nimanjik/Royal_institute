const Subject = require('../models/Subject');

const createSubject = (req, res) => {
    Subject.create(req.body)
    .then((data) => {
        res.json(data);
    })
    .catch((err) => {
        res.json(err);
    });
}

const getSubject = (req, res) => {
    Subject.find()
        .then(users => res.json(users))
        .catch(err => {
            console.error("Error fetching subject:", err);
            res.status(500).json({ error: "An error occurred while fetching subject." });
        });
}

const getSubjectid = (req, res) => {
    const id = req.params.id;
    Subject.findOne({sbid:id})
    .then(id => res.json(id))
    .catch(err => res.json(err));
}

const getSubjectname = (req, res) => {
    const name = req.params.name;
    const grade = req.params.grade;
    Subject.find({subjectname:name, grade:grade})    
    .then(id => res.json(id))
    .catch(err => res.json(err));
}



module.exports = {
    createSubject,
    getSubject,
    getSubjectid,
    getSubjectname
}