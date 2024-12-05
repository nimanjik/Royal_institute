const mongoose = require('mongoose');

const RequestScheduleSchema=new mongoose.Schema({
    teacher:'String',
    classid:'String',
    teacherid:'String',
    date1:'String',
    date2:'String',
    date3:'String',
    date4:'String',
    grade:'Number',    
    subject:'String',    
    status: 'String',



});

const RequestScheduleModel=mongoose.model('requestschedule',RequestScheduleSchema);

module.exports = RequestScheduleModel;