const mongoose = require('mongoose');

const ClassEnrollmentsSchema = new mongoose.Schema({
    studentId: {
        type: String,
        required: true
    },
    classId: {
        type: String,
        required: true
    },
    teacherid:{
        type:String,
        required:true

    },
    subject:{
        type:String,
        required:true
    },
    time:{
        type:String,
        required:true
    },
    grade:{ 
        type:Number,
        required:true

    },   

    date: {
        type: Date,
        default: Date.now
    }
});


ClassEnrollmentsSchema.index({ studentId: 1, classId: 1 }, { unique: true });

const ClassEnrollmentsModel = mongoose.model('ClassEnrollment', ClassEnrollmentsSchema);

module.exports = ClassEnrollmentsModel;