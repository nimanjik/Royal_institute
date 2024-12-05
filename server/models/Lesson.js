const mongoose = require('mongoose');

const LessonSchema = new mongoose.Schema({

    lesson_Files: 'String',
    lesson_topic: 'String',
    lesson_fileType: 'String',
    lesson_date: 'String',
    lesson_description: 'String',
    subject_name: 'String',
    grade: 'Number',
    teacher_id: 'String',
    teachername: 'String'

});

const UserModelLesson = mongoose.model('Lesson', LessonSchema);

module.exports = UserModelLesson;