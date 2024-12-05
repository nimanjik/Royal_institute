import React, { useState,useEffect } from 'react'
import './THQuestion.css';
import {Link } from 'react-router-dom';
import axios from 'axios';
import Head from '../Header/Header';


function THQuestion() {

  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    // Fetch questions from backend
    axios.get('http://localhost:5000/questionsShow')
      .then((response) => {
        setQuestions(response.data);
      })
      .catch((error) => {
        console.error('Error fetching questions:', error);
      });
  }, []);

  useEffect(() => {
    axios.get('/teacherprofile')
      .then((res) => {
        const tsub= res.data.subject;
        axios.get('/questionsShow')
          .then((res) => {
            const tequestion = res.data.filter(tequestions => tequestions.subject === tsub );
            setQuestions(tequestion);
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);



  const handleDeleteA = (id) => {
    axios.put(`http://localhost:5000/deleteAnswer/${id}`)
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
        <text className="heading5">Connect With Your Teachers</text>
        <p className="parag2">Welcome to our online platform dedicated to supporting students' learning journey! Our platform is designed to enhance collaboration, engagement, and support within the educational community.</p>
        <Link to="/TeacherQuestion" style={{ textDecoration: 'none',color: '#000000' }}><button id="nQuestion" style={{ position: 'absolute', width: '280px', height: '50px', left: '336px', top: '323px', background: '#063a67', borderRadius: '20px' }} className="buttn3">NEW QUESTIONS</button></Link>
        <text className="tttt1">Solved Questions</text>
        <ul style={{listStyleType: 'none'}}>
        {questions.map((question, index) => (
          <li key={index} style={{ marginBottom: '20px' }}  >
            <div style={{boxSizing: "border-box", position: "relative", width: "995px", height: "217px", left: "347px", top: "380px", background: "#FFFFFF", border: "5px solid #000000",borderRadius:'10px'}}>
              <strong style={{marginLeft:'20px'}}>Student ID: </strong>{question.sid}<br/>
              <strong style={{marginLeft:'20px'}}>Grade: </strong>{question.grade}<br/>
              <strong style={{marginLeft:'20px'}}>Subject: </strong>{question.subject}<br/>
              <strong style={{marginLeft:'20px'}}>Question: </strong>{question.question}<br/><br/>
              <strong style={{marginLeft:'20px'}}>Answer: </strong>{question.answer}<br/><br/>
              
            </div>
            
            <div >
            <Link to={`/AnswerUpdate/${question._id}`} style={{ textDecoration: 'none', color: '#FFFFFF' }}>
              <button id={`edit${index + 1}`} style={{ position: 'relative', width: '140px', height: '40px', left: '1040px', top:'380px', background: '#136845', borderRadius: '20px' }} className="bt1">Edit</button></Link>
              <button onClick={() => handleDeleteA(question._id)} id={`delete${index + 1}` } style={{ position: 'relative', width: '140px', height: '40px', left: '1050px', top:'380px', background: '#4a2032', borderRadius: '20px' }} className="bt2">Delete</button>
            </div>
          </li>
        ))}
      </ul>
        
    </div>
  )
}

export default THQuestion