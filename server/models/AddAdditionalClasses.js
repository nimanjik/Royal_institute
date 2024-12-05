const mongoose = require('mongoose');

const AddAdditionalClassesSchema = new mongoose.Schema({
    teacher: 'String',
    grade: 'String', 
    date: 'String',
    hall: 'String',
    subject: 'String',
    time: 'String',
    status: 'String',
});

const AddAdditionalClassesModel = mongoose.model('AdditionalClasses', AddAdditionalClassesSchema);

module.exports = AddAdditionalClassesModel;
