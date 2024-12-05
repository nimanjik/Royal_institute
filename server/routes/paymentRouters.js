const express = require('express');
const router = express.Router();
const cors = require('cors');
const { createonline,
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
} = require('../controllers/paymentController');

//middleware
router.use(
    cors({
        origin: 'http://localhost:3000',
        credentials: true
    })
)

router.post('/createonline', createonline)
router.get('/displayonline', getonline)
router.get('/getpayment/:id', getpayment)
router.put('/updatepayment/:id', updateonline)
router.delete('/deletepayment/:id', deleteonline)
/* router.post('/createbank', createbank) */
router.get('/displaybank', getbank)
router.get('/getbank/:id', getbankid)
router.put('/updatebank/:id', updatebank)
router.delete('/deletebank/:id', deletebank)
router.post('/createcash', createcash)
router.get('/displaycash', getcash)
router.get('/getcash/:id', getcashid)
router.delete('/deletecash/:id', deletecash)
router.post('/createwallet', createwallet)
router.get('/displaywallet', getwallet)
router.get('/getwallet/:id', getwalletid)
router.put('/updatewallet/:id', updatewallet)
router.get('/allpayments', allpayments)
router.put('/updateonlinemg/:id', manageronline)
router.put('/updatebankmg/:id', managerbank)
router.put('/updatecashmg/:id', managercash)


module.exports = router;