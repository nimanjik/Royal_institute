const mongoose = require('mongoose');

const TFSchema = new mongoose.Schema({

    grade:'String',
    subject:'String',
    teacher:'String',
    sid:'String',
    feedback:'String',

});

const tfeedbackModel = mongoose.model('teacherfeedbacks', TFSchema);

module.exports = tfeedbackModel;