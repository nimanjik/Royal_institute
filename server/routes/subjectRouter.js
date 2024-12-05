const express = require('express');
const router = express.Router();
const cors = require('cors');
const { createSubject,
    getSubject,
    getSubjectid,
    getSubjectname
} = require('../controllers/subjectController');

//middleware
router.use(
    cors({
        origin: 'http://localhost:3000',
        credentials: true
    })
)

router.post('/createSubject', createSubject)
router.get('/viewSubject', getSubject)
router.get('/getSubject/:id', getSubjectid)
router.get('/getSubjectname/:name/:grade', getSubjectname)


module.exports = router;