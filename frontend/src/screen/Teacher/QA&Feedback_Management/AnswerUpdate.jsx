import React, { useEffect, useState } from 'react'
import './AnswerQ.css';
import axios from 'axios';
import { useParams,useNavigate } from 'react-router-dom';
import Head from '../Header/Header';



function AnswerUpdate() {
    const {id} = useParams();
    const [grade, setGrade] = useState();
    const [subject, setSubject] = useState();
    const [teacher, setTeacher] = useState();
    const [sid, setSid] = useState();
    const [question, setQuestion] = useState();
    const [answer, setAnswer] = useState();
    const navigator = useNavigate();

    useEffect(() =>{

        axios.get(`http://localhost:5000/getAnswer/${id}`)
        .then((res) => {
            setGrade(res.data.grade);
            setSubject(res.data.subject);
            setTeacher(res.data.teacher);
            setSid(res.data.sid);
            setQuestion(res.data.question);
            setAnswer(res.data.answer);
        })
        .catch((err) => console.error(err));
    },[id]); 

    

    const reply = (event) => {
      event.preventDefault();
        axios.put(`http://localhost:5000/updateAnswers/${id}`, {answer:answer})
          .then((response) => {
            console.log('Answer updated:', response.data);
            navigator('/THQuestion');
            // Optionally, you can update the UI to reflect the updated answer
          })
          .catch((error) => {
            console.error('Error updating answer:', error);
          });
      };


  return (
    <div >
       <Head/>
    <text className="heading12">Connect with your teachers </text>
    
    <form onSubmit={reply}> 
        <text className="ttt3">Student ID</text>
        <text className="ta1">{sid}</text>
        <text className="ttt4">Grade</text>
        <text className="ta2">{grade}</text>
        <text className="ttt5">Subject</text>
        <text className="ta3">{subject}</text>
        <text className="ttt6">Question</text>
        <text className="ta4">{question}</text>
        <text className="ttt7">Answer</text>
        <input type="text" style={{ boxSizing: 'border-box', position: 'absolute', width: '920px', height: '163px', left: '513px', top: '718px', background: '#FFFFFF', border: '1px solid #000000' }}  id="answer1"  value={answer} onChange={(event) => setAnswer(event.target.value)}></input>
        <div>
        <button type='submit' id="reply" className="anst" style={{ position: 'absolute', width: '280px', height: '60px', left: '1079px', top: '906px', background: '#063a67', borderRadius: '20px' }}>UPDATE ANSWER</button>
        </div>
    </form>
    
    </div>
  )
}


export default AnswerUpdate