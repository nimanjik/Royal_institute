const mongoose = require('mongoose');

const CashSchema = new mongoose.Schema({
    itnumber:'String',
    studentname:'String',
    description: 'String',
    date: 'String',
    amount: 'String',
    status : 'String',
    type : 'String',
});

const CashModel = mongoose.model('cashpayments' ,CashSchema)

module.exports = CashModel;
