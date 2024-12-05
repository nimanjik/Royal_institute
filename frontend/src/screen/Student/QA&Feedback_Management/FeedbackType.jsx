import React from 'react';
import './FeedbackType.css';
import {Link } from 'react-router-dom';
import Head from '../Header/Header';

function FeedbackType() {
  return (
    <div>
       <Head/>
        <text className="heading7">We Want to Hear from You - Add Your Feedbacks</text>
        <text className="pv">Pick Feedback Type</text>

        <button id="tf" className="tft1" style={{ position: 'absolute', width: '400px', height: '86px', left: '550px', top: '350px', background: '#83B2CD', borderRadius: '10px' }}><Link to="/TFeedback" style={{ textDecoration: 'none',color: '#000000' }}>TEACHER FEEDBACK</Link></button>
        <button id="sf" className="sft1" style={{ position: 'absolute', width: '400px', height: '97px', left: '550px', top: '500px', background: '#83B2CD', borderRadius: '10px' }}><Link to="/SFeedback" style={{ textDecoration: 'none',color: '#000000' }}>SERVICE FEEDBACK</Link></button>
    </div>
  )
}

export default FeedbackType