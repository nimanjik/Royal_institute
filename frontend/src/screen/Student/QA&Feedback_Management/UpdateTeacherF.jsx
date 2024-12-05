import React, { useEffect, useState } from 'react';
import './TFeedback.css';
import axios from 'axios';
import {useParams,useNavigate} from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import Swal from 'sweetalert2';
import Head from '../Header/Header';

function UpdateTeacherF() {

  const {id} = useParams();
  const [grade, setGrade] = useState();
  const [subject, setSubject] = useState();
  const [teacher, setTeacher] = useState();
  const [sid, setSid] = useState();
  const [tfeedback, setTFeedback] = useState();
  const navigator = useNavigate();
  const [teacherid, setteacherid] = useState([]);

  
  useEffect(() =>{
    //get teacher feedback
    axios.get('http://localhost:5000/getTFeedback/' + id)
    .then((res) =>{
      setGrade(res.data.grade);
      setSubject(res.data.subject);
      setTeacher(res.data.teacher);
      setSid(res.data.sid);
      setTFeedback(res.data.feedback);
    })
    .catch((err) => console.error(err));

  },[id]);

  
  const update = (a) =>{
    a.preventDefault();
  
  axios.put('http://localhost:5000/updateTFeedback/'+ id, {
    grade:grade,
    subject:subject,
    teacher:teacher,
    sid:sid,
    tfeedback:tfeedback
  })
    .then(res =>{
      
      
    })
    .catch(err => console.error(err));

  }

  /*const[questions,setQuestions] = useState([]);
  useEffect(() => {
    axios.get('http://localhost:5000/MyQuestions')
    .then((res) =>{
      setQuestions(res.data);
    })
    .catch((err) => console.error(err));
  },[]);*/
  
  const handleSubmit = (a) => {
    a.preventDefault();
    Swal.fire({
      title: "Submit ",
      text: "Are you sure you want to proceed ?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, proceed!",
      cancelButtonText: "Cancel",
      
    }).then((result) => {
      if (result.isConfirmed) {
        update(a); // Call submit function if result is confirmed
        Swal.fire({
          title: "Updated",
          icon: "success",
        });
        handleClick2();
      } else {
        Swal.fire({
          title: "Failed",
          icon: "error",
        });
        // Call submit function even if result is canceled
      }
    });
  };
  
  

  const handleClick2 = () => {
    toast.loading('Processing...', {
      style: {
        background: 'black', // Customize the background color
        color: '#ffffff', // Customize the text color
        borderRadius: '10px', // Add border radius
        border: '2px solid #ffffff', // Add border
      },
    });
  
    setTimeout(() => {
      toast.dismiss();
      setTimeout(() => {
        toast.success('Updated!', {
          style: {
            background: '#28a745', // Green background color
            color: '#ffffff', // White text color
            borderRadius: '10px', // Rounded corners
            border: '2px solid #ffffff', // White border
          },
          duration: 2000, // Display duration in milliseconds (3 seconds)
          iconTheme: {
            primary: '#ffffff', // White icon color
            secondary: '#28a745', // Green icon color
          },
        });
        setTimeout(() => {
          navigator('/MyFeedbacks');
        }, 2500); // Wait for 2 seconds after displaying success toast before navigating
      }, 2500); // Wait for 2 seconds after dismissing loading toast before displaying success toast
    }, 5000); // Wait for 5 seconds before dismissing loading toast
  };

  useEffect(()=>{
    axios.get('/teacherprofileall')
    .then((res)=>{
        setteacherid(res.data);             
    })
    .catch((err)=>{
        console.log(err);
    })
  },[])

  useEffect(() => {
    if (teacher) {
      axios.get('/teacherprofileall')
        .then(res => {
          const selectedTeacher = res.data.find(t => t.name === teacher);
          if (selectedTeacher) {
            setSubject(selectedTeacher.subject);
          }
        })
        .catch(err => console.error(err));
    }
  }, [teacher]);


  return (
    <>
    <Head/>
    <div className='uth1'>
       
      <Toaster/>
        <body >
      <h1 className="heading8">We Want to Hear from You - Teacher Feedback</h1>
      <form onSubmit={handleSubmit}>
        
        <label htmlFor="grade1" className="tt1">Select Grade</label>
        <input id="dropdown1" name="dropdown" value={grade}
        style={{ position: 'absolute', width: '351px', height: '40px', left: '632px', top: '200px', border: '1px solid #000000', borderRadius: '10px' }}  readOnly/>
        
        <label htmlFor="teacher1" className="tt2">Select Teacher</label>
        <select id="dropdown3" name="dropdown" style={{ position: 'absolute', width: '351px', height: '40px', left: '632px', top: '270px', background: '#FFFFFF', border: '1px solid #000000', borderRadius: '10px' }} required value={teacher} onChange={(a)=> setTeacher(a.target.value)}>
         
         <option value=""></option>
         {teacherid.map((teacher, index) => (
           <option key={index} value={teacher.name}>{teacher.name}</option>
         ))}
         </select>
        
        <label htmlFor="subject1" className="tt3">Select Subject</label>
        <input id="dropdown1" name="dropdown" value={subject} style={{ position: 'absolute', width: '351px', height: '40px', left: '632px', top: '350px', background: '#FFFFFF', border: '1px solid #000000', borderRadius: '10px' }}   readOnly/>
        
        <label htmlFor="studentID1" className="tt4">Student ID</label>
        <input type="text" name="sSID" pattern="^SD\d{3}$" title="Please enter 'SD001'" value={sid} style={{ boxSizing: 'border-box', position: 'absolute', width: '351px', height: '53px', left: '636px', top: '440px', background: '#FFFFFF', border: '1px solid #000000', borderRadius: '10px' }} readOnly/>
        <label htmlFor="feedback1" className="tt5">Feedback</label>
        <textarea
          id="feedback1"
          style={{ boxSizing: 'border-box', position: 'absolute', width: '914px', height: '238px', left: '465px', top: '625px', background: '#FFFFFF', border: '1px solid #000000' }}
          value={tfeedback}
          onChange={(a)=> setTFeedback(a.target.value)}
        ></textarea>
        <button
          id="tfeed1"
          className="tfet"
          style={{ position: 'absolute', width: '334px', height: '77px', left: '1045px', background: '#6C9DE2', borderRadius: '20px' }}
        >
          Submit
        </button>
      </form>
    </body>
    </div>
    </>
  )
}

export default UpdateTeacherF