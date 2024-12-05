const mongoose = require('mongoose');

const AddClassesSchema=new mongoose.Schema({
    
    teacher: 'String',
    classid: 'String',
    teacherid: 'String',
    subject: 'String',
    time:'String',
    date:'String',
    grade:'Number',
    


});

const AddClassesModel=mongoose.model('Class_details',AddClassesSchema);

module.exports = AddClassesModel;