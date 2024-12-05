import React, { useState,useEffect } from 'react'
import './TFeedback.css';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';
import Head from '../Header/Header';

function TFeedback() {

  const [grade, setGrade] = useState();
  const [subject, setSubject] = useState('');
  const [teacherid, setTeacherid] = useState([]);
  const [teacher, setTeacher] = useState('');
  const [sid, setSid] = useState();
  const [tfeedback, setTFeedback] = useState();
  const navigator = useNavigate();

  const submit = (a) =>{
    a.preventDefault();
    axios.post('http://localhost:5000/createTF', {
      grade:grade,
      subject:subject,
      teacher:teacher,
      sid:sid,
      feedback:tfeedback})
    .then(res =>{
      console.log(res);
      console.log( `Feedback Submitted successfully.`);
      
    })
    .catch(err => console.error(err));

  }

  const handleSubmit = (a) => {
    a.preventDefault();
    Swal.fire({
      title: "Submit Feedback",
      text: "Are you sure you want to proceed ?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, proceed!",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        submit(a); // Call submit function if result is confirmed
        Swal.fire({
          title: "Feedback Submitted",
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
        toast.success('Completed!', {
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
          navigator('/Feedback');
        }, 2500); // Wait for 2 seconds after displaying success toast before navigating
      }, 2500); // Wait for 2 seconds after dismissing loading toast before displaying success toast
    }, 5000); // Wait for 5 seconds before dismissing loading toast
  };

  useEffect(()=>{
    axios.get('/studentprofile')
    .then((res)=>{
      setSid(res.data.stdid);   
      setGrade(res.data.grade);       
    })
    .catch((err)=>{
        console.log(err);
    })
  },[])

  useEffect(()=>{
    axios.get('/teacherprofileall')
    .then((res)=>{
      setTeacherid(res.data);             
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

  /*const[questions,setQuestions] = useState([]);
  useEffect(() => {
    axios.get('http://localhost:5000/MyQuestions')
    .then((res) =>{
      setQuestions(res.data);
    })
    .catch((err) => console.error(err));
  },[]);*/

  return (
    <>
    <Head/>
    <h1 className="heading8">We Want to Hear from You - Teacher Feedback</h1>
    <div >
      
        <body className='uthh1'>
      
      <form onSubmit={handleSubmit}>
        
        <label htmlFor="grade" className="tt1">Grade</label>        
        <input id="dropdown1" name="dropdown" value={grade}
        style={{ position: 'absolute', width: '351px', height: '40px', left: '632px', top: '200px', border: '1px solid #000000', borderRadius: '10px' }}  readOnly/>
        
        <label htmlFor="teacher" className="tt2">Select Teacher</label>
        <select id="dropdown3" name="dropdown" style={{ position: 'absolute', width: '351px', height: '40px', left: '632px', top: '270px', background: '#FFFFFF', border: '1px solid #000000', borderRadius: '10px' }} required onChange={(a)=> setTeacher(a.target.value)}>
         
        <option value=""></option>
        {teacherid.map((teache, index) => (
          <option key={index} value={teache.name}>{teache.name}</option>
        ))}
        </select>

        <label htmlFor="subject" className="tt3">Subject</label>
        <input id="dropdown1" name="dropdown" value={subject} style={{ position: 'absolute', width: '351px', height: '40px', left: '632px', top: '346px', background: '#FFFFFF', border: '1px solid #000000', borderRadius: '10px' }}  onChange={(a)=> setSubject(a.target.value)} readOnly/>
        
        <label htmlFor="studentID" className="tt4">Student ID</label>
        <input type="text" name="sSID" pattern="^SD\d{3}$" title="Please enter 'SD001'" value={sid} style={{ boxSizing: 'border-box', position: 'absolute', width: '351px', height: '53px', left: '636px', top: '448px', background: '#FFFFFF', border: '1px solid #000000', borderRadius: '10px' }} readOnly/>
        
        <label htmlFor="feedback" className="tt5">Feedback</label>
        <textarea
          id="feedback"
          required
          style={{ boxSizing: 'border-box', position: 'absolute', width: '914px', height: '238px', left: '465px', top: '625px', background: '#FFFFFF', border: '1px solid #000000' }}
          onChange={(a)=> setTFeedback(a.target.value)}
        ></textarea>
        <button
          id="tfeed"
          className="buttonbb5"
          
        >
          Submit
        </button>
      </form>
    </body>
    </div>
    </>
  )
}

export default TFeedback