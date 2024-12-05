// attendanceRoutes.js

const express = require('express');
const router = express.Router();
const cors = require('cors'); // Import cors middleware
const {
    createAttendance,
    getAllAttendance,
    getAttendanceById,
    deleteAttendance
} = require('../controllers/attendanceController')

router.use(
    cors({
        origin: 'http://localhost:3000',
        credentials: true
    })
)

// Route to create new attendance record
router.post('/attendancemark', createAttendance);

// Route to get all attendance records
router.get('/attendancemark', getAllAttendance);

// Route to get attendance by ID
router.get('/attendancemark/:id', getAttendanceById);

// Route to delete attendance by ID
router.delete('/attendancemark/:id', deleteAttendance);


router.get('/', (req, res) => {
    res.send('attendance API');
});

module.exports = router;