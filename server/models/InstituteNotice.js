const mongoose = require('mongoose');

const InstituteNoticeSchema = new mongoose.Schema({

    I_topic: 'String',
    I_date: 'String',
    I_description: 'String',
   
});

const UserModel = mongoose.model('InstituteNotice', InstituteNoticeSchema);

module.exports = UserModel;