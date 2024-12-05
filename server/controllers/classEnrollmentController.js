const ClassEnrollmentsModel = require('../models/ClassEnrollments');

// Create a new class enrollment record
const createClassEnrollment = async (req, res) => {
    try {
        const { studentId, classId, teacherid, subject, time, grade } = req.body;
        const enrollment = await ClassEnrollmentsModel.create({ studentId, classId, teacherid, subject, time, grade });
        res.json(enrollment);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};


// Retrieve all class enrollment records
const getAllClassEnrollments = async (req, res) => {
    try {
        const enrollments = await ClassEnrollmentsModel.find();
        res.json(enrollments);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Retrieve a class enrollment record by its ID
const getClassEnrollmentById = async (req, res) => {
    try {
        const enrollment = await ClassEnrollmentsModel.findById(req.params.id);
        res.json(enrollment);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Delete a class enrollment record by its ID
const deleteClassEnrollment = async (req, res) => {
    try {
        await ClassEnrollmentsModel.findByIdAndDelete(req.params.id);
        res.json({ message: 'Class enrollment deleted successfully' });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};
// Retrieve all class enrollment records along with classIds
const getAllClassIds = async (req, res) => {
    try {
        const enrollments = await ClassEnrollmentsModel.find();
        // Extract classIds from enrollments
        const classIds = enrollments.map(enrollment => enrollment.classId);
        // Remove duplicate classIds using Set
        const uniqueClassIds = [...new Set(classIds)];
        res.json(uniqueClassIds);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

module.exports = {
    createClassEnrollment,
    getAllClassEnrollments,
    getClassEnrollmentById,
    deleteClassEnrollment,
    getAllClassIds
};