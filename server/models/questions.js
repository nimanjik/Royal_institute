const mongoose = require('mongoose');

const QSchema = new mongoose.Schema({

    grade:'String',
    subject:'String',
    teacher:'String',
    sid:'String',
    question:'String',
    answer:'String',

});

const questionModel = mongoose.model('questions', QSchema);

module.exports = questionModel;