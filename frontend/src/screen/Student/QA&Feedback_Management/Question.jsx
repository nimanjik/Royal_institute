import React from 'react'
import './QS.css';
import {Link } from 'react-router-dom';
import Head from '../Header/Header';

function Question() {
  return (
    <div>  <Head/>
    <div style={{ backgroundColor: '#ff0000' }}>
      <div className="heading1">Connect with your teachers</div>
      <p className="mainpara">Welcome to Q & A section! We understand the importance of fostering open communication between students and teachers to enhance the learning experience. This platform serves as a direct channel for you to connect with your educators. Our teachers are dedicated to supporting your academic journey, and we encourage you to take advantage of this opportunity to engage with them directly. Effective communication is key to your success, and we're here to facilitate that every step of the way.</p>
       
      <button name="addq" className='btn1 text-btn1'><Link to="/AddQuestion" style={{ textDecoration: 'none',color: '#000000' }}>ADD QUESTIONS</Link></button>
      <button name="mq" className='btn2 text-btn2'><Link to="/MyQuestions" style={{ textDecoration: 'none',color: '#000000' }}>MY QUESTIONS</Link></button>
      <button name="fq" className='btn3 text-btn3'><Link to="/FAskedQ" style={{ textDecoration: 'none',color: '#000000' }}>FAQS</Link></button>
      </div>
    </div>
  )
}

export default Question