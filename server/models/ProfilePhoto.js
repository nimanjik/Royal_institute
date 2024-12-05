const mongoose = require('mongoose');

const ProfilePhotoSchema = new mongoose.Schema({

    profile_photo: 'String',
    student_id: 'String'

});

const PhotoModel = mongoose.model('Photo', ProfilePhotoSchema);

module.exports = PhotoModel;