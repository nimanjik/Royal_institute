const mongoose = require('mongoose');

const subject = new mongoose.Schema({
    sbid: {type: 'String'},
    subjectname: {type: 'String'},
    grade: {type: 'Number'},
    teid: {type: 'String'},
    teachername: {type: 'String'},
    amount: {type: 'String'}


});

const Subject = mongoose.model('subject', subject);

module.exports = Subject;