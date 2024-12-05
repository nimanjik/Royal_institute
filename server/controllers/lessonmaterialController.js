
const UserModel = require('../models/Notice');


//create a Notice
const createnotice = (req, res) => {
    UserModel.create(req.body)
    .then((data) => {
        res.json(data);
    })
    .catch((err) => {
        res.json(err);
    });
}

//get all Notices
const viewnotice = (req, res) => {
    UserModel.find()
    .then(MyClasses => res.json(MyClasses))
    .catch(err => res.json(err));
}

//Get Notice by id
const getnotice = (req, res) => {
    const id = req.params.id;
    UserModel.findById({_id:id})
    .then(MyClasses => res.json(MyClasses))
    .catch(err => res.json(err));
}

//update Notice
const updatenotice = (req, res) => {
    const id = req.params.id;
    UserModel.findByIdAndUpdate({_id:id}, {
        topic: req.body.topic,
        date: req.body.date,
        description: req.body.description
    })
    .then(MyClasses => res.json(MyClasses))
    .catch(err => res.json(err));
}

//delete Notice
const deletenotice = (req, res) => {
    const id = req.params.id;
    UserModel.findByIdAndDelete({_id:id})
    .then(MyClasses => res.json(MyClasses))
    .catch(err => res.json(err));
}




module.exports = {
    createnotice,
    viewnotice,
    getnotice,
    updatenotice,
    deletenotice
    
}