const express = require('express');
const router = express.Router();
const cors = require('cors');
const { createaddadditionalclass,
    createshedule,
    getallreqadiclass,
    getallreqsch,
    getclass,
    addclass,
    updateclassid,
    updateclass,
    deleteclass,
    getadditionalclass,
    updateadditionalclass,
    getadditionalclassid,
    updateadditionalclassid,
    getadditionalclassextra,
    getschedule,
    deleteadditionalclass,
    deleteschedule
} = require('../controllers/classController');

//middleware
router.use(
    cors({
        origin: 'http://localhost:3000',
        credentials: true
    })
)


router.post('/createaddadditionalclass', createaddadditionalclass)
router.post('/createschedule', createshedule)
router.get('/requestedadditionalclasses/additionalclasses', getallreqadiclass)
router.get('/requestedadditionalclasses/schedules', getallreqsch)
router.get('/teachermyclasses/addclasses', getclass)
router.post('/addclass', addclass)
router.get('/getClass/:id', updateclassid)
router.put('/updateClass/:id', updateclass)
router.delete('/deleteClass/:id', deleteclass)
router.get('/approveclass/:id', getadditionalclass)
router.put('/request/:id', updateadditionalclass)
router.get('/approveclass/:id', getadditionalclassid)
router.put('/request/:id', updateadditionalclassid)
router.get('/additionalclasses/approveclasses', getadditionalclassextra)
router.get('/additionalclasses/approveclasses', getschedule)
router.delete('/deleteAdditionalClass/:id', deleteadditionalclass)
router.delete('/deleteSchedule/:id', deleteschedule)


module.exports = router;