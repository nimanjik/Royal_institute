const OnlineModel = require('../models/OnlinePayments');
const BankModel = require('../models/BankPayments');
const CashModel = require('../models/CashPayments');
const WalletModel = require('../models/Wallets');

 //create online
const createonline = (req, res) => {
    OnlineModel.create(req.body)

    .then((data)=>{
        res.json(data);
    })
    .catch((err) =>{
        res.json(err);
    })
}

//all online payments
const getonline = (req, res) => {
    OnlineModel.find()
    .then(Payments => res.json(Payments))
    .catch(err => res.json(err));
}

//get payment
const getpayment = (req, res) => {
    const id = req.params.id;
    OnlineModel.findById({_id:id})
    .then(Payments => res.json(Payments))
    .catch(err => res.json(err));
}

//update online
const updateonline = (req, res) => {
    const id = req.params.id;
    OnlineModel.findByIdAndUpdate({_id:id},{itnumber:req.body.itnumber ,description:req.body.description,date:req.body.date,amount:req.body.amount, })
    .then(Payments => res.json(Payments))
    .catch(err => res.json(err));
}

//delete Online
const deleteonline = (req, res) => {
    const id = req.params.id;
    OnlineModel.findByIdAndDelete({_id:id})
    .then(Payments => res.json(Payments))
    .catch(err => res.json(err));
}
/* 
//create Bank
const createbank = (req, res) => {
    BankModel.create(req.body)
    .then((data)=>{
        res.json(data);
    })
    .catch((err) =>{
        res.json(err);
    })
}
 */
//all bank payments
const getbank = (req, res) => {
    BankModel.find()
    .then(Payments => res.json(Payments))
    .catch(err => res.json(err));
}

//update one select payment
const getbankid = (req, res) => {
    const id = req.params.id;
    BankModel.findById({_id:id})
    .then(Payments => res.json(Payments))
    .catch(err => res.json(err));
}

//update Bank
const updatebank = (req, res) => {
    const id = req.params.id;
    BankModel.findByIdAndUpdate({_id:id},{itnumber:req.body.itnumber ,accountname:req.body.accountname,accountnumber:req.body.accountnumber,bankname:req.body.bankname,
    description:req.body.description,date:req.body.date,amount:req.body.amount, })
    .then(Payments => res.json(Payments))
    .catch(err => res.json(err));
}

//delete Bank
const deletebank = (req, res) => {
    const id = req.params.id;
    BankModel.findByIdAndDelete({_id:id})
    .then(Payments => res.json(Payments))
    .catch(err => res.json(err));
}

//create cash
const createcash = (req, res) => {
    CashModel.create(req.body)
    .then((data)=>{
        res.json(data);
    })
    .catch((err) =>{
        res.json(err);
    })
}

//all cash payments
const getcash = (req, res) => {
    CashModel.find()
    .then(Payments => res.json(Payments))
    .catch(err => res.json(err));
}

//get cash payments by id
const getcashid = (req, res) => {
    const id = req.params.id;
    CashModel.findById({_id:id})
    .then(Payments => res.json(Payments))
    .catch(err => res.json(err));
}

//get cash payments by id
const deletecash = (req, res) => {
    const id = req.params.id;
    CashModel.findByIdAndDelete({_id:id})
    .then(Payments => res.json(Payments))
    .catch(err => res.json(err));
}

//create wallet
const createwallet = (req, res) => {
    WalletModel.create(req.body)

    .then((data)=>{
        res.json(data);
    })
    .catch((err) =>{
        res.json(err);
    })
}

//display all wallet
const getwallet = (req, res) => {
    WalletModel.find()
    .then(Payments => res.json(Payments))
    .catch(err => res.json(err));
}

//display wallet id
const getwalletid = (req, res) => {
    const id = req.params.id;
    WalletModel.findById({_id:id})
    .then(Payments => res.json(Payments))
    .catch(err => res.json(err));
}

//update wallet id
const updatewallet = (req, res) => {
    const id = req.params.id;
    WalletModel.findByIdAndUpdate({_id:id},{balance:req.body.balance })
    .then(Payments => res.json(Payments))
    .catch(err => res.json(err));
}

//all online payments
const allpayments = (req, res) => {
    Promise.all([
        OnlineModel.find(),
        BankModel.find(),
        CashModel.find()
    ])
    .then(([onlinepayments, bankpayments, cashpayments]) => {
        res.json({ onlinepayments, bankpayments, cashpayments });
    })
    .catch(err => {
        res.json(err);
    });
}

//Manager online
const manageronline = (req, res) => {
    const id = req.params.id;
    OnlineModel.findByIdAndUpdate({_id:id},{itnumber:req.body.itnumber ,
        description:req.body.description,date:req.body.date,amount:req.body.amount,type:req.body.type,status:req.body.status,  })
    .then(Payments => res.json(Payments))
    .catch(err => res.json(err));
}

//Manager bank
const managerbank = (req, res) => {
    const id = req.params.id;
    BankModel.findByIdAndUpdate({_id:id},{itnumber:req.body.itnumber ,
        description:req.body.description,date:req.body.date,amount:req.body.amount,type:req.body.type,status:req.body.status,  })
    .then(Payments => res.json(Payments))
    .catch(err => res.json(err));
}

//Manager cash
const managercash = (req, res) => {
    const id = req.params.id;
    CashModel.findByIdAndUpdate({_id:id},{itnumber:req.body.itnumber ,
        description:req.body.description,date:req.body.date,amount:req.body.amount,type:req.body.type,status:req.body.status,  })
    .then(Payments => res.json(Payments))
    .catch(err => res.json(err));
}


module.exports = {
    createonline,
    getonline,
    getpayment,
    updateonline,
    deleteonline,
    /* createbank, */
    getbank,
    getbankid,
    updatebank,
    deletebank,
    createcash,
    getcash,
    getcashid,
    deletecash,
    createwallet,
    getwallet,
    getwalletid,
    updatewallet,
    allpayments,
    manageronline,
    managerbank,
    managercash
}