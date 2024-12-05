const express = require('express');
const router = express.Router();
const cors = require('cors');
const { test,
    registerStudent,
    loginStudent,
    forgotPasswordstudent,
    getProfile,
    getProfileid,
    getupdateProfile,
    updateProfile,
    updateProfileid,
    registerTeacher,
    loginTeacher,
    forgotPasswordteacher,
    getTeacherProfile,
    getteacherupdateProfile,
    getteacherProfileid,
    updateteacherProfileid,
    updateteacherProfile,
    registerManager,
    loginManager,
    forgotPasswordmanager,
    getManagerProfile,
    registerAdmin,
    loginAdmin,
    forgotPasswordadmin,
    getAdminProfile,
    getallStudent,
    getallTeacher,
    deleteStudent,
    deleteTeacher,
    getTeacherall,
    logout 
} = require('../controllers/authController');

//middleware
router.use(
    cors({
        origin: 'http://localhost:3000',
        credentials: true
    })
)

router.get('/', test)

router.post('/register', registerStudent)
router.post('/login', loginStudent)
router.post('/forgotpassword', forgotPasswordstudent)
router.get('/studentprofile', getProfile)
router.get('/studentprofileid/:id', getProfileid)
router.get('/getstudentprofileedit', getupdateProfile)
router.put('/studentprofileedit', updateProfile)
router.put('/studentprofileeditid/:sid', updateProfileid)

router.post('/teacherregister', registerTeacher)
router.post('/teacherlogin', loginTeacher)
router.post('/teacherforgetpassword', forgotPasswordteacher)
router.get('/teacherprofile', getTeacherProfile)
router.get('/teacherprofileall', getTeacherall)
router.get('/getteacherprofileedit', getteacherupdateProfile)
router.put('/teacherprofileedit', updateteacherProfile)
router.get('/teacherprofileid/:id', getteacherProfileid)
router.put('/teacherprofileeditid/:tid', updateteacherProfileid)

router.post('/managerregister', registerManager)
router.post('/managerlogin', loginManager)
router.post('/managerforgetpassword', forgotPasswordmanager)
router.get('/managerprofile', getManagerProfile)

router.post('/adminregister', registerAdmin)
router.post('/adminlogin', loginAdmin)
router.post('/adminforgetpassword', forgotPasswordadmin)
router.get('/adminprofile', getAdminProfile)
router.get('/getstudentsadmin', getallStudent)
router.get('/getteachersadmin', getallTeacher)
router.delete('/deletestudent/:id', deleteStudent)
router.delete('/deleteteacher/:id', deleteTeacher)


router.get('/logout', logout)



module.exports = router;