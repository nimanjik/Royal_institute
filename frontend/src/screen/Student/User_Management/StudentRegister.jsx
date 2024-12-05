import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import loginimg from './photos/studentlogin.png';
import logofull from './photos/logofull.png';

function StudentRegister() {
  const navigate = useNavigate();

  // Function to get the current year
  function getCurrentYear() {
    return new Date().getFullYear().toString().slice(-2); // Get last two digits of the current year
  }

  // Function to generate a random 6-digit number
  function generateRandomNumber() {
    return Math.floor(1000 + Math.random() * 9000); // Generates a random 6-digit number
  }

  // Function to generate a student ID
  function generateStudentId() {
    const year = getCurrentYear(); // Get last two digits of the current year
    const randomNumber = generateRandomNumber(); // Get random 6-digit number
    return `SID${year}${randomNumber}`; // Concatenate SID, year, and random number
  }

   // Function to generate a wallet ID
   function generateWalletId() {   
    const randomNumber = generateRandomNumber(); // Get random 6-digit number
    return `WID${randomNumber}`; // Concatenate SID, year, and random number
  }

  const [data, setData] = useState({
    name: '',
    email: '',
    contactnumber: '',
    grade: '',
    username: '',
    stdid: generateStudentId(), // Auto-generate studentId
    password: '',
    repassword: ''  ,
    walletid: generateWalletId() // Auto-generate walletId 
  });

  const registerStudent = async (e) => {
    e.preventDefault();
    if (data.password !== data.repassword) {
      toast.error('Passwords do not match');
      return;
    } else {
      const { name, email, contactnumber, grade, username, stdid, password, walletid } = data;
      try {
        const response = await axios.post('/register', { name, email, contactnumber, grade, username, stdid, password, walletid });
        if (response.data.error) {
          toast.error(response.data.error);
        } else {
          setData({
            name: '',
            email: '',
            contactnumber: '',
            grade: '',
            username: '',
            stdid: generateStudentId(), // Auto-generate studentId for the next registration
            password: '',
            repassword: ''
          });
          toast.success("Register Successfully!");
          navigate('/login');
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <main>
      <div className="mainlogin">
        <div className="loginphoto">
          <img src={loginimg} alt='loginimage' className='loginimg' />
        </div>
        <div className="login">
          <img src={logofull} alt='loginimage' />
          <p className="wel">Welcome to Royal Academy</p>
          <form onSubmit={registerStudent}>
            <div className="username">
              <label htmlFor="name" className="logintxt">FULL NAME</label><br/>
              <input type="text" id="name" name="name" placeholder="Enter your full name" className="loginbox" value={data.name} onChange={(e) => setData({...data, name: e.target.value})}/>                        
            </div>  
            <div className="username">
              <label htmlFor="email" className="logintxt">EMAIL</label><br/>
              <input type="email" id="email" name="email" placeholder="Enter your email" className="loginbox" value={data.email} onChange={(e) => setData({...data, email: e.target.value})}/>
            </div>
            <div className="username">
              <label htmlFor="contactnumber" className="logintxt">Contact Number</label><br/>
              <input type="number" id="contactnumber" name="contactnumber" placeholder="Enter your contact number" className="loginbox" value={data.contactnumber} onChange={(e) => setData({...data, contactnumber: e.target.value})} />
            </div>
            <div className="username">
              <label htmlFor="grade" className="logintxt">GRADE</label><br/>
              <select id="grade" name="grade" className="loginbox" value={data.grade} onChange={(e) => setData({...data, grade: e.target.value})}>
                <option value="">Select Grade</option>
                <option value="6">Grade 6</option>
                <option value="7">Grade 7</option>
                <option value="8">Grade 8</option>
                <option value="9">Grade 9</option>
                <option value="10">Grade 10</option>
                <option value="11">Grade 11</option>
              </select>
            </div>
            <div className="username">
              <label htmlFor="username" className="logintxt">USERNAME</label><br/>
              <input type="text" id="username" name="username" placeholder="Enter your username" className="loginbox" value={data.username} onChange={(e) => setData({...data, username: e.target.value})}/>
            </div>      
            <div className="username">
              <label htmlFor="username" className="logintxt">STUDENT ID</label><br/>
              <input type="text" id="stdid" name="stdid" placeholder="Enter your student id" className="loginbox" value={data.stdid} onChange={(e) => setData({...data, stdid: e.target.value})} readOnly /> {/* Set as readOnly */}
            </div>         
            <div className="username">
              <label htmlFor="password" className="logintxt">PASSWORD</label><br/>
              <input type="password" id="password" name="password" placeholder="Enter your password" className="loginbox" value={data.password} onChange={(e) => setData({...data, password: e.target.value})}/>
            </div>
            <div className="username">
              <label htmlFor="repassword" className="logintxt">RE-ENTER PASSWORD</label><br/>
              <input type="password" id="repassword" name="repassword" placeholder="Enter your password again" className="loginbox" value={data.repassword} onChange={(e) => setData({...data, repassword: e.target.value})}/>
            </div>
            <br/>
            <button type="submit" className='btnloging'> SIGN UP</button>
            <a href='/login'><p className="register">Already have an Account? <b>Log IN</b></p></a>
          </form>
        </div>
      </div>
      
    </main>
  )
}

export default StudentRegister;
