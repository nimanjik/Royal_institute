import React, { useEffect, useState } from 'react'
import './TeacherQuestion.css';
import {Link } from 'react-router-dom';
import axios from 'axios';
import Head from '../Header/Header';


function TeacherQuestion() {

    const[questions,setQuestions] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/getTQuestions')
        .then((res) => {
            setQuestions(res.data);
        })
        .catch((err) => console.error(err));
    },[]);

    useEffect(() => {
      axios.get('/teacherprofile')
        .then((res) => {
          const tsub= res.data.subject;
          axios.get('/getTQuestions')
            .then((res) => {
              const getequestion = res.data.filter(getequestions => getequestions.subject === tsub );
              setQuestions(getequestion);
            })
            .catch((err) => {
              console.log(err);
            });
        })
        .catch((err) => {
          console.log(err);
        });
    }, []);
  return (
    <div>
       <Head/>
    <text className="heading33">Connect With Your Teachers - New Questions</text>
    <ul style={{listStyleType: 'none', position: 'absolute', left: '344px', top: '220px',  width: '864px', background: '#FFFFFF',  padding: '10px'}}>
    
      {questions.map((question, index) => (
        <li key={index} style={{ marginBottom: '20px',listStyleType: 'none',boxSizing: 'border-box', position: 'relative', width: '864px', height: '250px',  background: '#FFFFFF', border: '2px solid #000000',borderRadius:'10px' }}>
         
          
            <br/><strong>Subject:</strong>{question.subject}<br/><br/>
            <strong>Grade:</strong>{question.grade}<br/><br/>
            <strong>Student ID:</strong>{question.sid}<br/><br/>
            <strong>Question:</strong>{question.question} <br/><br/>
            
          <div>
          <Link to = {`/AnswerQ/${question._id}`} style={{ textDecoration: 'none', color: '#FFFFFF' }}>  
          <button
            name="edit"
            style={{ position: 'absolute', width: '140px', left: '900px', height: '50px', top:'40%', background: '#063a67', borderRadius: '20px' }}
            className="buttn1"
          >
            Answer
          </button></Link>
          </div>
        </li>
      ))}
    </ul>
    </div>
    
  )
}

export default TeacherQuestion