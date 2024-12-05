import React, { useState,useEffect } from 'react'
import './ManagerFeedback.css';
import {Link } from 'react-router-dom';
import axios from 'axios';
import Head from '../Header/Header'

function ManagerFeedback() {

    const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
    // Fetch feedbacks from backend
    axios.get('http://localhost:5000/feedbacksShow')
      .then((response) => {
        setFeedbacks(response.data);
      })
      .catch((error) => {
        console.error('Error fetching questions:', error);
      });
  }, []);

  const handleDeleteA = (id) => {
    axios.put(`http://localhost:5000/deleteReply/${id}`)
      .then(res => {
        window.location.reload();
        // Optionally, you can handle success or show a message here
      })
      .catch(error => {
        console.error('Error deleting answer:', error);
      });
  };
  return (
    <div>
        <Head/>
      <text className="heading131">Over View of Feedbacks</text>
      <p className="pm">The goal is to turn data into information, and information into insight.</p>
      <Link to="/ManagerNFeedback" style={{ textDecoration: 'none',color: '#000000' }}><button id="vf" className="vft" style={{ position: 'absolute', width: '350px', height: '60px', left: '354px', top: '286px', background: '#063a67', borderRadius: '20px' }}>VIEW NEW FEEDBACKS</button></Link>
      <text className="ttt8">Feedbacks</text>
      
      <Link to="/managerfeedbackgenrate">
        
      <button id="gf" className="gft" style={{ position: 'absolute', width: '400px', height: '70px', left: '910px', top: '440px', background: '#063a67', borderRadius: '20px' }}>Generate Feedback Report</button>
      </Link>

      <ul style={{listStyleType: 'none'}}>
        {feedbacks.map((feedback, index) => (
          <li key={index} >
            <div style={{boxSizing: "border-box", position: "relative", width: "995px", height: "217px", left: "347px", top: "450px", background: "#FFFFFF", border: "2px solid #000000",borderRadius:'10px'}}>
              
              <strong>Grade: </strong>{feedback.grade}<br/><br/>
              <strong>Feedback: </strong>{feedback.feedback}<br/><br/><br/>
              <strong>Reply: </strong>{feedback.reply}<br/><br/>
              
            </div>
            
            <div >
            <Link to={`/MFeedbackUpdate/${feedback._id}`} style={{ textDecoration: 'none', color: '#FFFFFF' }}>
              <button id={`edit${index + 1}`} style={{ position: 'relative', width: '140px', height: '40px', left: '1040px', top:'470px', background: '#136845', borderRadius: '20px' }} className="bt1">Edit</button></Link>
              <button onClick={() => handleDeleteA(feedback._id)} id={`delete${index + 1}` } style={{ position: 'relative', width: '140px', height: '40px', left: '1050px', top:'470px', background: '#4a2032', borderRadius: '20px' }} className="bt2">Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default ManagerFeedback