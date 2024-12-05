const express = require('express');
const router = express.Router();
const cors = require('cors');
const {
    createClassEnrollment,
    getAllClassEnrollments,
    getClassEnrollmentById,
    getAllClassIds,
    deleteClassEnrollment
} = require('../controllers/classEnrollmentController');


router.use(
    cors({
        origin: 'http://localhost:3000',
        credentials: true
    })
)


router.post('/classenrollments', createClassEnrollment);
router.get('/classenrollments', getAllClassEnrollments);
router.get('/classenrollments/:id', getClassEnrollmentById);
router.delete('/classenrollments/:id', deleteClassEnrollment);
router.get('/classenrollments/classids', getAllClassIds);

router.get('/', (req, res) => {
    res.send('class management API');
});

module.exports = router;