const mongoose = require('mongoose');

const BankSchema = new mongoose.Schema({
    itnumber:'String',
    accountname:'String',
    accountnumber: 'Number',
    bankname: 'String',
    description: 'String',
    date: 'String',
    amount: 'String',
    status : 'String',
    type : 'String',
    upload_files: 'String',

});

const BankModel = mongoose.model('bankpayments' ,BankSchema)

module.exports = BankModel;
