import React, { useState, useEffect } from 'react'
import axios from 'axios';
import './FAskedQ.css';
import Head from '../Header/Header';

function FAskedQ() {
  const [questions, setQuestions] = useState([]);
  const [grade, setGrade] = useState();
  const [subject, setSubject] = useState();

//fasked get

useEffect(() => {
    axios.get('http://localhost:5000/fAskQs')
      .then(response => {
        setQuestions(response.data);
      })
      .catch(error => {
        console.error('Error fetching questions:', error);
      });
}, []);

useEffect(() => {
  const fetchQuestions = () => {
    const queryParams = {};
    if (grade) queryParams.grade = grade;
    if (subject) queryParams.subject = subject;

    axios.get('http://localhost:5000/fASearch', { params: queryParams })
      .then(response => {
        setQuestions(response.data);
      })
      .catch(error => {
        console.error('Error fetching questions:', error);
      });
  };

  fetchQuestions();
}, [grade, subject]);



const handleGradeChange = (event) => {
  setGrade(event.target.value);
};

const handleSubjectChange = (event) => {
  setSubject(event.target.value);
};


  return (
    <div>
       <Head/>
        <h4 className="heading4">Connect With Your Teachers - FAQS</h4>
        
        <input type="text" onChange={handleGradeChange} name="grade" className="gi1" placeholder="Grade" />
        <input type="text" name="subject" onChange={handleSubjectChange}  className="si1" placeholder="Subject" />

        <ul style={{ marginTop: '-80px'}}>
                {questions.map((question, index) => (
                  <div style={{ marginBottom: '40px',listStyleType: 'none', boxSizing: 'border-box', position: 'relative', width: '800px', height: '250px', left: '359px', top: '300px', background: '#FFFFFF',borderRadius:'10px', border: '5px solid #000000' }}>
                    <li key={index} style={{marginLeft:'20px', marginTop:'20px'}}>
                        <div >Grade: {question.grade}</div><br/><br/>
                        <div>Subject: {question.subject}</div><br/><br/>
                        <div>Question: {question.question}</div><br/><br/>
                        <div>Answer: {question.answer}</div><br/><br/>
                        
                    </li>
                    </div>
                ))}
            </ul>
    </div>
  )
}

export default FAskedQ