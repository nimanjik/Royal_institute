import { Routes, Route } from 'react-router-dom';
import Portal from './screen/Portal';

import StudentLogin from './screen/Student/User_Management/StudentLogin';
import StudentRegister from './screen/Student/User_Management/StudentRegister';
import StudentProfile from './screen/Student/User_Management/StudentProfile';
import StudentProfileEdit from './screen/Student/User_Management/StudentProfieEdit';
import StudentForgetPassword from './screen/Student/User_Management/Forgetpasswordstudent';
import StudentDashboard from './screen/Student/Dashboard';
import StudentTimetable from './screen/Student/Timetbale_Management/Timetable';
import LessonMaterial from './screen/Student/Lesson_Management/StMyClasses';
import PayOnline from './screen/Student/Financial_Management/StPaymentOnline';
import ViewOnline from './screen/Student/Financial_Management/StViewOnline';
import PayBank from './screen/Student/Financial_Management/StPaymentBank';
import ViewBank from './screen/Student/Financial_Management/StViewBank';
import ViewCash from './screen/Student/Financial_Management/StViewCash';
import EditOnline from './screen/Student/Financial_Management/StEditOnline';
import Wallet from './screen/Student/Financial_Management/StWallet';
import EditBank from './screen/Student/Financial_Management/StEditBank';
import CancelOnline from './screen/Student/Financial_Management/StCancelOnline';
import CancelBank from './screen/Student/Financial_Management/StCancelBank';
import Payment from './screen/Student/Financial_Management/StMain';
import AddQuestion from './screen/Student/QA&Feedback_Management/AddQuestion';
import FAskedQ from './screen/Student/QA&Feedback_Management/FAskedQ';
import MyQuestions from './screen/Student/QA&Feedback_Management/MyQuestions';
import Question from './screen/Student/QA&Feedback_Management/Question';
import UpdateQuestion from './screen/Student/QA&Feedback_Management/UpdateQuestion';
import Feedback from './screen/Student/QA&Feedback_Management/Feedback';
import FeedbackType from './screen/Student/QA&Feedback_Management/FeedbackType';
import MyFeedbacks from './screen/Student/QA&Feedback_Management/MyFeedbacks';
import TFeedback from './screen/Student/QA&Feedback_Management/TFeedback';
import SFeedback from './screen/Student/QA&Feedback_Management/SFeedback';
import UpdateTeacherF from './screen/Student/QA&Feedback_Management/UpdateTeacherF';
import UpdateSFeedback from './screen/Student/QA&Feedback_Management/UpdateSFeedback';
import Test from './screen/Student/Enroll_Mangement/Test';
import ViewClass from './screen/Student/Enroll_Mangement/ViewClass';
import Enrolled from './screen/Student/Enroll_Mangement/Enrolled';
import Enrollments from './screen/Student/Class_Enrollment/Enrollments';
import MyClass from './screen/Student/Class_Enrollment/Myclass';
import AttendStudent from './screen/Student/Attendance/AttendStudent';


import TeacherLogin from './screen/Teacher/User_Management/TeacherLogin';
import TeacherProfile from './screen/Teacher/User_Management/TeacherProfile';
import TeacherProfileEdit from './screen/Teacher/User_Management/TeacherProfileEdit';
import TeacherForgetPassword from './screen/Teacher/User_Management/Forgetpasswordteacher';
import TeacherTimetable from './screen/Teacher/Timetable';
import MyClassess from './screen/Teacher/Lesson_Management/MyClasses';
import CreateNotice from './screen/Teacher/Lesson_Management/CreateNotice';
import EditNotice from './screen/Teacher/Lesson_Management/EditNotice';
import AddMaterials from './screen/Teacher/Lesson_Management/AddMaterials';
import EditMaterials from './screen/Teacher/Lesson_Management/EditMaterials';
import AnswerQ from './screen/Teacher/QA&Feedback_Management/AnswerQ';
import AnswerUpdate from './screen/Teacher/QA&Feedback_Management/AnswerUpdate';
import TeacherQuestion from './screen/Teacher/QA&Feedback_Management/TeacherQuestion';
import THQuestion from './screen/Teacher/QA&Feedback_Management/THQuestion';
import ViewTeacherFeedback from './screen/Teacher/QA&Feedback_Management/ViewTeacherFeedback';
import TeacherViewPayment from './screen/Teacher/Financial_Management/TeView';
import TeacherMyClasses from './screen/Teacher/Class_Management/TeacherMyClasses';
import UpdateClasses from './screen/Teacher/Class_Management/UpdateClasses';
import AdditionalClasses from './screen/Teacher/Class_Management/AdditionalClasses';
import AddAdditionalClasses from './screen/Teacher/Class_Management/AddAdditionalClasses';
import RequestSchedule from './screen/Teacher/Class_Management/RequestSchedule';
import AddClasses from './screen/Teacher/Class_Management/AddClasses';
import TeacherView from './screen/Teacher/Salary_Management/TeacherView';
import AttendTeacher from './screen/Teacher/Attendance/AttendTeacher';

import AdminManagerLogin from './screen/AdminManagerLogin';
import ManagerLogin from './screen/Manager/User_Management/ManagerLogin';
import ManagerForgetPassword from './screen/Manager/User_Management/Forgetpasswordmanager';
import ManagerProfile from './screen/Manager/User_Management/ManagerProfile';
import ManagerFeedback from './screen/Manager/QA&Feedback_Management/ManagerFeedback';
import ManagerNFeedback from './screen/Manager/QA&Feedback_Management/ManagerNFeedback';
import ReplyF from './screen/Manager/QA&Feedback_Management/ReplyF';
import MFeedbackUpdate from './screen/Manager/QA&Feedback_Management/MFeedbackUpdate';
import EditManager from './screen/Manager/Financial_Management/Mgedit';
import Manager from './screen/Manager/Financial_Management/MgMain';
import MgPay from './screen/Manager/Financial_Management/MgPayment';
import MgView from './screen/Manager/Financial_Management/MgView';
import CreateManager from './screen/Manager/Salary_Management/CreateManager';
import Home from './screen/Manager/Salary_Management/Home';
import ManagerSalary from './screen/Manager/Salary_Management/Manager';
import ManagerView from './screen/Manager/Salary_Management/ManagerView';
import UpdateManager from './screen/Manager/Salary_Management/UpdateManager';
import ManagerTimetable from './screen/Manager/Timetable_management/Timetable';
import AddNewClassForm from './screen/Manager/Timetable_management/AddnewClasstime';
import ManagerUpdateTimetable from './screen/Manager/Timetable_management/UpdateTimetable';
import ManagerWallet from './screen/Manager/Financial_Management/ManagerWallet';
import SearchusersManager from './screen/Manager/User_Management/ManagerSearchusers';
import RequestedAdditionalClasses from './screen/Manager/Class_Management/RequestedAdditionalclasses';
import ApprovalClasses from './screen/Manager/Class_Management/ApprovalClasses';
import ManagerEnroll from './screen/Manager/Enroll_Management/ManagerEnroll';
import EnrollmentForm from './screen/Manager/Enroll_Management/EnrollmentForm';
import Attend from './screen/Manager/Attendance/Attend';
import SubjectView from './screen/Manager/Attendance/SubjectView';

import AdminLogin from './screen/Admin/User_Management/AdminLogin';
import AdminForgetPassword from './screen/Admin/User_Management/Forgetpasswordadmin';
import AdminProfile from './screen/Admin/User_Management/AdminProfile';
import AddTeacher from './screen/Admin/User_Management/AddTeacher';
import AddManager from './screen/Admin/User_Management/AddManager';
import AddAdmin from './screen/Admin/User_Management/AddAdmin';
import SearchusersAdmin from './screen/Admin/User_Management/AdminSearchusers';
import UpdateStudent from './screen/Admin/User_Management/UpdateStudent';
import UpdateTeacher from './screen/Admin/User_Management/UpdateTeacher';

import AdMain from './screen/Admin/Financial_Management/AdMain'
import AdGenerate from './screen/Admin/Financial_Management/AdGenerate'
import AdReport from './screen/Admin/Financial_Management/AdReport'

import AdminLessonReport from './screen/Admin/Lesson_Management/AdminLessonReport'
import ReportMonth from './screen/Admin/Lesson_Management/ReportMonth';
import LessonReport from './screen/Admin/Lesson_Management/LessonReport';

import AdgenrateClass from './screen/Admin/Class_Management/AdgenrateClass'
import GenrateClass from './screen/Admin/Class_Management/GenrateClass'

import MangerFeedbackGenrate from './screen/Manager/QA&Feedback_Management/MangerFeedbackGenrate'
import MangerFeedbackReport from './screen/Manager/QA&Feedback_Management/MangerFeedbackReport'

import Adgenratesalary from './screen/Admin/Salary_Management/AdGenrateSalary'
import Genratesalary from './screen/Admin/Salary_Management/AdSalaryReport'

import AdminGenerateUser from './screen/Admin/User_Management/AdminGenerateUser'
import AdminGenerateReport from './screen/Admin/User_Management/AdminGenerateReport'

import axios from 'axios';
import {Toaster} from 'react-hot-toast';




axios.defaults.baseURL = 'http://localhost:5000';
axios.defaults.withCredentials = true;

function App() {
  return (
    <>
    <Toaster position='top-center' toastOptions={{duration: 2000}}/>
    <Routes>
      <Route path='/' element={<Portal/>}/>

      <Route path="/login" element={ <StudentLogin /> } />
      <Route path="/register" element={ <StudentRegister />} />
      <Route path="/studentprofile" element={<StudentProfile />} />
      <Route path='/studentprofileedit' element={<StudentProfileEdit/>}/> 
      <Route path='/studentforgetpassword' element={<StudentForgetPassword/>}/>
      <Route path="/studentdashboard" element={<StudentDashboard />} />
      <Route path="/studenttimetable" element={<StudentTimetable />} />
      <Route path="/lessonmaterial/:description" element={<LessonMaterial />} />
      <Route path= '/payment' element = {<Payment/>} />
      <Route path= '/payonline/:subid' element = {<PayOnline/>} />
      <Route path= '/viewonline' element = {<ViewOnline/>} />
      <Route path= '/paybank/:subid' element = {<PayBank/>} />      
      <Route path= '/viewbank' element = {<ViewBank/>} />
      <Route path= '/viewcash' element = {<ViewCash/>} />      
      <Route path= '/editonline/:id' element = {<EditOnline/>} />
      <Route path= '/Wallet' element = {<Wallet/>} />
      <Route path= '/editbank/:id' element = {<EditBank/>} />     
      <Route path= '/cancelonline/:id' element = {<CancelOnline/>} />
      <Route path= '/cancelbank/:id' element = {<CancelBank/>} /> 
      <Route path='/AddQuestion' element={<AddQuestion/>}/>
      <Route path='/FAskedQ' element={<FAskedQ/>}/>
      <Route path='/MyQuestions' element={<MyQuestions/>}/>
      <Route path='/question' element={<Question/>}/>
      <Route path='/UpdateQuestion/:id' element={<UpdateQuestion/>}/>
      <Route path='/Feedback' element={<Feedback/>}/>
      <Route path='/FeedbackType' element={<FeedbackType/>}/>
      <Route path='/MyFeedbacks' element={<MyFeedbacks/>}/>
      <Route path='/TFeedback' element={<TFeedback/>}/>
      <Route path='/SFeedback' element={<SFeedback/>}/>
      <Route path='/UpdateTeacherF/:id' element={<UpdateTeacherF/>}/>
      <Route path='/UpdateSFeedback/:id' element={<UpdateSFeedback/>}/>
      <Route path='/test' element={<Test/>}/>
      <Route path='/viewclass/:subid' element={<ViewClass />} />
      <Route path='/enrolled' element={<Enrolled />} />
      <Route path="/Enrollments" element={<Enrollments />} />     
      <Route path="/MyClass" element={<MyClass />} />  
      <Route path='/AttendStudent' element={<AttendStudent/>}/>

      <Route path="/teacherlogin" element={<TeacherLogin />} />
      <Route path="/teacherprofile" element={<TeacherProfile />} />
      <Route path='/teacherprofileedit' element={<TeacherProfileEdit/>}/>
      <Route path='/teacherforgetpassword' element={<TeacherForgetPassword/>}/>
      <Route path="/teachertimetable" element={<TeacherTimetable />} />
      <Route path="/myclasses" element={<MyClassess />} />
      <Route path="/createnotice" element={<CreateNotice />} />
      <Route path="/editnotice/:id" element={<EditNotice />} />
      <Route path="/addmaterial" element={<AddMaterials />} />
      <Route path="/editmaterial/:id" element={<EditMaterials />} />   
      <Route path='/AnswerQ/:id' element={<AnswerQ/>}/>
      <Route path='/AnswerUpdate/:id' element={<AnswerUpdate/>}/>         
      <Route path='/THQuestion' element={<THQuestion/>}/>
      <Route path='/ViewTeacherFeedback' element={<ViewTeacherFeedback/>}/>   
      <Route path='/TeacherQuestion' element={<TeacherQuestion/>}/>     
      <Route path= '/teacherfinancial' element = {<TeacherViewPayment/>} />
      <Route path='/viewclasses' element={<TeacherMyClasses />} />
      <Route path='/update/:id' element={<UpdateClasses />} />
      <Route path='/additionalclasses' element={<AdditionalClasses/>} />
      <Route path='/AddAdditionalClasses' element={<AddAdditionalClasses />} />
      <Route path='/requestschedule' element={<RequestSchedule />} />
      <Route path='/addclasses' element={<AddClasses/>} />
      <Route path='/tesalaryview' element={<TeacherView/>} />
      <Route path="/AttendTeacher" element={ <AttendTeacher/>} />
      
      <Route path="/adminmanagerlogin" element={<AdminManagerLogin />} />
      <Route path="/managerlogin" element={<ManagerLogin />} />
      <Route path='/managerforgetpassword' element={<ManagerForgetPassword/>}/>
      <Route path="/managerprofile" element={<ManagerProfile />} />
      <Route path='/ManagerFeedback' element={<ManagerFeedback/>}/>
      <Route path='/ManagerNFeedback' element={<ManagerNFeedback/>}/>
      <Route path='/ReplyF/:id' element={<ReplyF/>}/>
      <Route path='/MFeedbackUpdate/:id' element={<MFeedbackUpdate/>}/>     
      <Route path= '/editmanager/:id' element = {<EditManager/>} /> 
      <Route path= '/managerfinancial' element = {<Manager/>} />
      <Route path= '/mgpay' element = {<MgPay/>} />
      <Route path= '/mgview' element = {<MgView/>} />
      <Route path='/create' element={<CreateManager />} />
      <Route path='/homemain' element={<Home />} />      
      <Route path='/managersalary' element={<ManagerSalary />} />
      <Route path='/home' element={<ManagerView />} />
      <Route path='/updatesal/:id' element={<UpdateManager />} />
      <Route path="/Manager/Timetable" element={<ManagerTimetable/>} />
      <Route path='/Manager/AddnewClasstime' element={<AddNewClassForm/>}/>
      <Route path='/Manager/UpdateTimetable/:id' element={< ManagerUpdateTimetable/>}/>
      <Route path='/ManagerWallet' element={<ManagerWallet/>}/>
      <Route path='/searchusersmanager' element={<SearchusersManager/>}/>
      <Route path='/requestedadditionalclasses' element={<RequestedAdditionalClasses/>}/>
      <Route path='/approvalclasses/:id' element={<ApprovalClasses/>}/>
      <Route path='/ManagerEnroll' element={<ManagerEnroll/>}/>
      <Route path='/EnrollmentForm' element={<EnrollmentForm/>}/>
      <Route path='/Attend' element={<Attend/>}/>
      <Route path='/SubjectView' element={<SubjectView/>}/>

      <Route path="/adminlogin" element={<AdminLogin />} />
      <Route path='/adminforgetpassword' element={<AdminForgetPassword/>}/>
      <Route path="/adminprofile" element={<AdminProfile />} />
      <Route path="/addteacher" element={<AddTeacher />} />
      <Route path="/addmanager" element={<AddManager />} />
      <Route path="/addadmin" element={<AddAdmin />} />
      <Route path="/searchusersadmin" element={<SearchusersAdmin />} />  
      <Route path="/updatestudent/:id" element={<UpdateStudent />} />  
      <Route path="/updateteacher/:id" element={<UpdateTeacher />} />

      <Route path="/admain" element={<AdMain />} />  
      <Route path="/adgenrate" element={<AdGenerate />} />  
      <Route path="/adreport" element={<AdReport />} />

      <Route path="/adlessonreport" element={<AdminLessonReport/>} />   
      <Route path="/adgenratelesson" element={<ReportMonth />} />  
      <Route path="/lessonReport" element={<LessonReport />} />

       <Route path="/adgenerateclass" element={<AdgenrateClass />} />  
      <Route path="/adreportclass" element={<GenrateClass />} />
 
      <Route path="/managerfeedbackgenrate" element={<MangerFeedbackGenrate />} />  
      <Route path="/managerfeedbackreport" element={<MangerFeedbackReport />} />

      <Route path="/adreportsalary" element={<Genratesalary />} />  
      <Route path="/adgenratesalry" element={<Adgenratesalary />} />

      <Route path="/adgenerateuser" element={<AdminGenerateUser />} />  
      <Route path="/adgeneratereport" element={<AdminGenerateReport />} />


    </Routes>    
    </>
  );
}

export default App;
