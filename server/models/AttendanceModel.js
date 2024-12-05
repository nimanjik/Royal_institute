const mongoose = require('mongoose');

const AttendanceSchema = new mongoose.Schema({
    studentId: {
        type: String,
        required: true
    },
    classId: {
        type: String,
        required: true
    },
    teacherId: {
        type: String

    },
    subject: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    },
    time: {
        type: String,
        default: function() {
            const date = new Date();
            return `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
        }
    }
});

const AttendanceModel = mongoose.model('Attendance', AttendanceSchema);

module.exports = AttendanceModel;