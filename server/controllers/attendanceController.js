const AttendanceModel = require('../models/AttendanceModel')

const createAttendance = async (req, res) => {
    try {
        const { studentId, classId, teacherId, subject } = req.body;

        // Create a new attendance record
        const attendance = new AttendanceModel({
            studentId,
            classId,
            teacherId,
            subject
        });

        // Save the attendance record to the database
        await attendance.save();

        res.status(201).json({ success: true, message: 'Attendance recorded successfully' });
    } catch (error) {
        console.error('Error creating attendance:', error);
        res.status(500).json({ success: false, message: 'Failed to record attendance' });
    }
};

const getAllAttendance = async (req, res) => {
    try {
        // Fetch all attendance records from the database
        const attendance = await AttendanceModel.find().sort({time:-1});

        res.status(200).json(attendance);
    } catch (error) {
        console.error('Error fetching attendance:', error);
        res.status(500).json({ success: false, message: 'Failed to fetch attendance records' });
    }
};

const getAttendanceById = async (req, res) => {
    try {
        const attendanceId = req.params.id;

        // Find attendance by ID in the database
        const attendance = await AttendanceModel.findById(attendanceId);

        if (!attendance) {
            return res.status(404).json({ success: false, message: 'Attendance not found' });
        }

        res.status(200).json(attendance);
    } catch (error) {
        console.error('Error fetching attendance by ID:', error);
        res.status(500).json({ success: false, message: 'Failed to fetch attendance' });
    }
};

const deleteAttendance = async (req, res) => {
    try {
        const attendanceId = req.params.id;

        // Delete attendance by ID from the database
        await AttendanceModel.findByIdAndDelete(attendanceId);

        res.status(200).json({ success: true, message: 'Attendance deleted successfully' });
    } catch (error) {
        console.error('Error deleting attendance:', error);
        res.status(500).json({ success: false, message: 'Failed to delete attendance' });
    }
};

module.exports = {
    createAttendance,
    getAllAttendance,
    getAttendanceById,
    deleteAttendance
};