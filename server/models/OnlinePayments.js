const mongoose = require('mongoose');

const OnlineSchema = new mongoose.Schema({
    itnumber:'String',
    // cardname:'String',
    // cardnumber: 'Number',
    // securitycode: 'Number',
    // expiredate: 'String',    
    description: 'String',
    date: 'String',
    amount: 'String',
    status : 'String',
    type : 'String',
});

const OnlineModel = mongoose.model('OnlinePayments' ,OnlineSchema)

module.exports = OnlineModel;