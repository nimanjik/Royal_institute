const express = require('express');
const router = express.Router();
const cors = require('cors');
const {
   /*   createuser, */
    getusers,
    getusersid,
    updateuser,
    deleteuser
} = require('../controllers/salaryController');

//middleware
router.use(
    cors({
        origin: 'http://localhost:3000',
        credentials: true
    })
)

/* router.post('/createUser', createuser) */
router.get('/users', getusers)
router.get('/getUser/:id', getusersid)
router.put('/updateUser/:id', updateuser)
router.delete('/deleteUser/:id', deleteuser)


module.exports = router;