const mongoose = require('mongoose');

const NoticeSchema = new mongoose.Schema({

    topic: 'String',
    date: 'String',
    description: 'String',
    subject_name: 'String',
    grade: 'Number',
    teacher_id: 'String'
});

const UserModel = mongoose.model('Notice', NoticeSchema);

module.exports = UserModel;