const AddClassesModel = require('../models/AddClasses');
const AddAdditionalClassesModel = require('../models/AddAdditionalClasses');
const RequestScheduleModel = require('../models/RequestSchedule');

// Create addadditionalclass
const createaddadditionalclass = async(req, res) => {
    try {
        const data = await AddAdditionalClassesModel.create(req.body);
        res.json(data);
      } catch (err) {
        res.status(400).json({ error: err.message });
      }
}

// Create schedule
const createshedule = async(req, res) => {
    try {
        const data = await RequestScheduleModel.create(req.body);
        res.json(data);
      } catch (err) {
        res.status(400).json({ error: err.message });
      }
}

// Get all requested additional classes
const getallreqadiclass = async(req, res) => {
    try {
        const additionalClasses = await AddAdditionalClassesModel.find();
        res.json(additionalClasses);
      } catch (err) {
        res.status(400).json({ error: err.message });
      }
}

// Get all requested schedules
const getallreqsch = async(req, res) => {
    try {
        const schedules = await RequestScheduleModel.find();
        res.json(schedules);
      } catch (err) {
        res.status(400).json({ error: err.message });
      }
}

// Route to fetch classes for teachers
const getclass = async(req, res) => {
    try {
        const classes = await AddClassesModel.find();
        res.json(classes);
      } catch (err) {
        res.status(400).json({ error: err.message });
      }
}

// Route to add a new class
const addclass = async(req, res) => {
    try {
         const addclass = await AddClassesModel.create({
          teacher: req.body.teacher,
          classid: req.body.classid,
          teacherid: req.body.teacherid,
          subject: req.body.subject,
          time: req.body.time,
          date: req.body.date,
          grade: req.body.grade
         });        
         return res.json({ addclass });
      } catch (err) {
        res.status(400).json({ error: err.message });
      }
}

// Update one selected class
const updateclassid = async(req, res) => {
    try {
        const addClass = await AddClassesModel.findById(req.params.id);
        res.json(addClass);
      } catch (err) {
        res.status(400).json({ error: err.message });
      }
}

// Route to update a class
const updateclass = async(req, res) => {
    try {
        await AddClassesModel.findByIdAndUpdate(req.params.id, req.body);
        res.json({ message: 'Class updated successfully' });
      } catch (err) {
        res.status(400).json({ error: err.message });
      }
}

// Route to delete a class
const deleteclass = async(req, res) => {
    try {
        await AddClassesModel.findByIdAndDelete(req.params.id);
        res.json({ message: 'Class deleted successfully' });
      } catch (err) {
        res.status(400).json({ error: err.message });
      }
}

// Update one additional class
const getadditionalclass = async(req, res) => {
    try {
        const approveClass = await AddAdditionalClassesModel.findById(req.params.id);
        res.json(approveClass);
      } catch (err) {
        res.status(400).json({ error: err.message });
      }
}

// Route to additional a class
const updateadditionalclass = async(req, res) => {
    try {
        await AddAdditionalClassesModel.findByIdAndUpdate(req.params.id, req.body);
        res.json({ message: 'Class updated successfully' });
      } catch (err) {
        res.status(400).json({ error: err.message });
      }
}

// Update one request class
const getadditionalclassid = async(req, res) => {
    try {
        const approveClass = await RequestScheduleModel.findById(req.params.id);
        res.json(approveClass);
      } catch (err) {
        res.status(400).json({ error: err.message });
      }
}

// Route to request classes
const updateadditionalclassid = async(req, res) => {
    try {
        await RequestScheduleModel.findByIdAndUpdate(req.params.id, req.body);
        res.json({ message: 'Class updated successfully' });
      } catch (err) {
        res.status(400).json({ error: err.message });
      }
}

// Route to fetch additionalclasses 
const getadditionalclassextra = async(req, res) => {
    try {
        const classes = await AddAdditionalClassesModel.find();
        res.json(classes);
      } catch (err) {
        res.status(400).json({ error: err.message });
      }
}

// Get data from request schedule
const getschedule = async(req, res) => {
    try {
        const classes = await RequestScheduleModel.find();
        res.json(classes);
      } catch (err) {
        res.status(400).json({ error: err.message });
      }
}

// Route to delete a requested additional class
const deleteadditionalclass = async(req, res) => {
    try {
        await AddAdditionalClassesModel.findByIdAndDelete(req.params.id);
        res.json({ message: 'Additional class deleted successfully' });
      } catch (err) {
        res.status(400).json({ error: err.message });
      }
}

// Route to delete a requested schedule
const deleteschedule = async(req, res) => {
    try {
        await RequestScheduleModel.findByIdAndDelete(req.params.id);
        res.json({ message: 'Schedule deleted successfully' });
      } catch (err) {
        res.status(400).json({ error: err.message });
      }
}

module.exports = {
    createaddadditionalclass,
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
}