const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv').config();
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const app = express();
// const path = require('path');
const multer = require('multer');
const UserModelLesson = require('./models/Lesson');
const BankModel = require('./models/BankPayments');
const SalaryModel = require('./models/Salary');
const PhotoModel = require('./models/ProfilePhoto');

mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log('Database not connected', err));

// Middleware
app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true
  })
);
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use("/files", express.static("files")); // Accessing files folder
app.use("/files2", express.static("files2")); // Accessing files folder2
app.use("/files3", express.static("files3")); // Accessing files folder3
app.use("/ProfilePhotos", express.static("ProfilePhotos")); // Accessing files folder

// Routes
app.use('/', require('./routes/authRouters'));
app.use('/', require('./routes/timetableRouter'));
app.use('/', require('./routes/InstituenoticeRouter'));
app.use('/', require('./routes/LessonMaterialRouter'));
app.use('/', require('./routes/paymentRouters'));
app.use('/', require('./routes/QA&FeedbackRouter'));
app.use('/', require('./routes/salaryRouters'));
app.use('/', require('./routes/classRouter'));
app.use('/', require('./routes/subjectRouter'));
app.use('/', require('./routes/attendanceRouters'));
app.use('/', require('./routes/EnrollmentsRouter'));
app.use('/', require('./routes/studentRoutes'))

// Setup Multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./files");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    cb(null, uniqueSuffix + file.originalname);
  },
});

// Initialize multer middleware
const upload = multer({ storage: storage });

// Route to handle file uploads for Lesson materials
app.post('/addmaterial', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  const { filename } = req.file;

  // Create a new material document in MongoDB
  UserModelLesson.create({
    lesson_Files: filename,
    lesson_topic: req.body.lesson_topic,
    lesson_fileType: req.body.lesson_fileType,
    lesson_date: req.body.lesson_date,
    lesson_description: req.body.lesson_description,
    subject_name: req.body.subject_name,
    grade: req.body.grade,
    teacher_id: req.body.teacher_id,
    teachername: req.body.teachername
  })
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.status(500).json({ error: 'Internal server error' });
    });
});

// Route to get all materials
app.get('/showmaterials', (req, res) => {
  UserModelLesson.find()
    .then(MyClasses => res.json(MyClasses))
    .catch(err => res.status(500).json({ error: 'Internal server error' }));
});

// Route to get material by id
app.get('/getmaterial/:id', (req, res) => {
  const id = req.params.id;
  UserModelLesson.findById({ _id: id })
    .then(MyClasses => res.json(MyClasses))
    .catch(err => res.status(500).json({ error: 'Internal server error' }));
});

// Route to update material
app.put('/updatematerial/:id', (req, res) => {
  const id = req.params.id;
  UserModelLesson.findByIdAndUpdate({ _id: id }, {
    lesson_topic: req.body.lesson_topic,
    lesson_date: req.body.lesson_date,
    lesson_fileType: req.body.lesson_fileType,
    lesson_description: req.body.lesson_description,
  })
    .then(MyClasses => res.json(MyClasses))
    .catch(err => res.status(500).json({ error: 'Internal server error' }));
});

// Route to delete material
app.delete('/deletematerial/:id', (req, res) => {
  const id = req.params.id;
  UserModelLesson.findByIdAndDelete({ _id: id })
    .then(MyClasses => res.json(MyClasses))
    .catch(err => res.status(500).json({ error: 'Internal server error' }));
});

// Setup Multer for file uploads 2
const storage2 = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./files2");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    cb(null, uniqueSuffix + file.originalname);
  },
});

// Initialize multer middleware 2
const upload2 = multer({ storage: storage2 });

// Route to handle file uploads for bank payments
app.post('/createbank', upload2.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  const { filename } = req.file;

  // Create a new bank document in MongoDB2
  BankModel.create({
    itnumber: req.body.itnumber,
    accountname: req.body.accountname,
    accountnumber: req.body.accountnumber,
    bankname: req.body.bankname,
    description: req.body.description,
    date: req.body.date,
    amount: req.body.amount,
    status: req.body.status,
    type: req.body.type,
    upload_files: filename
  })
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.status(500).json({ error: 'Internal server error' });
    });
});



// Setup Multer for file uploads 3
const storage3 = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./files3");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    cb(null, uniqueSuffix + file.originalname);
  },
});

// Initialize multer middleware 3
const upload3 = multer({ storage: storage3 });

// Route to handle file uploads for bank payments
app.post('/createSalary', upload3.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  const { filename } = req.file;

  // Create a new bank document in MongoDB 3
  SalaryModel.create({

    TeacherName: req.body.TeacherName,
    TeacherID: req.body.TeacherID,
    SubjectName: req.body.SubjectName,
    Grade: req.body.Grade,
    AttendStudents: req.body.AttendStudents,
    FreeCardAmount: req.body.FreeCardAmount,
    InstitutePayment: req.body.InstitutePayment,
    MonthlySalary: req.body.MonthlySalary,
    Date: req.body.Date,
    upload_paymentFiles: filename

  })
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.status(500).json({ error: 'Internal server error' });
    });
});



// Setup Multer for profile photo uploads
const storage4 = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./ProfilePhotos");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    cb(null, uniqueSuffix + file.originalname);
  },
});

// Initialize multer middleware for photo uploads
const upload4 = multer({ storage: storage4 });

// Route to handle file uploads for profile photo
app.post('/addphoto', upload4.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  const { filename } = req.file;

  // Create a profile photo in MongoDB 
  PhotoModel.create({

    profile_photo: filename,
    student_id: req.body.student_id

  })
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.status(500).json({ error: 'Internal server error' });
    });
});


app.get("/getimage/:studentId", async (req, res) => {
  try {
    const studentId = req.params.studentId;
    // Find the photo associated with the given student ID
    PhotoModel.findOne({ student_id: studentId })
      .then((data) => {
        if (!data) {
          return res.status(404).json({ error: 'Profile photo not found for this student ID' });
        }
        res.send({ status: "ok", data: data });
      });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});


// Route to delete Photo
app.delete('/deletephoto/:id', (req, res) => {
  const id = req.params.id;
  PhotoModel.findByIdAndDelete({ _id: id })
      .then(() => {
          res.status(200).json({ message: 'Photo deleted successfully' });
      })
      .catch(err => {
          console.error(err);
          res.status(500).json({ error: 'Internal server error' });
      });
});

// if(process.env.NODE_ENV === 'production') {
//   app.use(express.static(path.join(__dirname, 'frontend', 'build')));
//   app.get('*', (req, res) =>{
//       res.sendFile(path.join(__dirname,"frontend","build","index.html"));
//   });
// }
 

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server is running on port ${port}`));
