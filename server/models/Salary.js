const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    TeacherName:'String',
    TeacherID:'String',
    SubjectName:'String',
    Grade:'Number',
    AttendStudents:'Number',
    FreeCardAmount:'Number',
    InstitutePayment:'Number',
    MonthlySalary:'Number',
    Date:'String',
    upload_paymentFiles: 'String',

});

const SalaryModel = mongoose.model('salary',UserSchema);

module.exports = SalaryModel;