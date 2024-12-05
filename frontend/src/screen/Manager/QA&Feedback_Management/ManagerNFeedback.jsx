import React, { useEffect, useState } from 'react'
import './TeacherQuestion.css';
import {Link } from 'react-router-dom';
import axios from 'axios';
import Head from '../Header/Header'


function ManagerNFeedback() {

    const[feedbacks,setFeedbacks] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/getMFeedbacks')
        .then((res) => {
            setFeedbacks(res.data);
        })
        .catch((err) => console.error(err));
    },[]);

  return (
    <div>
       <Head/>
    <text className="heading300">Connect With Your Teachers - New Questions</text>
    <ul style={{listStyleType: 'none', position: 'absolute', left: '344px', top: '220px',  width: '864px', background: '#FFFFFF',  padding: '10px'}}>
    
      {feedbacks.map((feedback, index) => (
        <li key={index} style={{ marginBottom: '20px',listStyleType: 'none',boxSizing: 'border-box', position: 'relative', width: '864px', height: '200px',  background: '#FFFFFF', border: '2px solid #000000',borderRadius:'10px' }}>
         
            <br/><strong>Grade:</strong>{feedback.grade}<br/><br/><br/><br/>
            <strong>Feedback:</strong>{feedback.feedback} <br/><br/>
            
          <div>
          <Link to = {`/ReplyF/${feedback._id}`} style={{ textDecoration: 'none', color: '#FFFFFF' }}>  
          <button
            name="edit"
            style={{ position: 'absolute', width: '140px', left: '900px', height: '40px', top:'40%', background: '#063a67', borderRadius: '20px' }}
            className="buttn1k"
          >
            Reply
          </button></Link>
          </div>
        </li>
      ))}
    </ul>
    </div>
  )
}

export default ManagerNFeedback