const express = require('express');
const router = express.Router();
const cors = require('cors');
const { InstituteNotices,
    createInstituteNotices,
    deleteInstituteNotices
 } = require('../controllers/InstituenoticeController');

//middleware
router.use(
    cors({
        origin: 'http://localhost:3000',
        credentials: true
    })
)


router.get('/getinstitutenotices', InstituteNotices);
router.get('/createInstitutenotice', createInstituteNotices);
router.get('/deleteInotice/:id', deleteInstituteNotices);


module.exports = router;