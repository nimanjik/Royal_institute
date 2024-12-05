const mongoose = require('mongoose');

const SFSchema = new mongoose.Schema({

    sid:'String',
    grade:'String',
    feedback:'String',
    date:'Date',
    reply:'String',

});

const sfeedbackModel = mongoose.model('servicefeedbacks', SFSchema);

module.exports = sfeedbackModel;