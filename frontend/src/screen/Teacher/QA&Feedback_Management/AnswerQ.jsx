import React, { useEffect, useState } from 'react'
import './AnswerQ.css';
import axios from 'axios';
import { useParams,useNavigate } from 'react-router-dom';
import Head from '../Header/Header';

function AnswerQ() {

  const { id } = useParams();
    const [questions,setQuestions] = useState([]);
    const [answer, setAnswer] = useState();
    const navigator = useNavigate();

    useEffect(() =>{

        axios.get(`http://localhost:5000/giveToAnswers/${id}`)
        .then((res) => {
            setQuestions(res.data);
        })
        .catch((err) => console.error(err));
    },[id]);

    

    const reply = (event) => {
      event.preventDefault();
        axios.put(`http://localhost:5000/getToAnswers/${id}`, {answer})
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
    <div>
      <Head/>
    <div className=''>
    <text className="heading12">Connect with your teachers </text>
    <div >
    <form onSubmit={reply}> 
        <text className="ttt3">Student ID</text>
        <text className="ta1">{questions.sid}</text>
        <text className="ttt4">Grade</text>
        <text className="ta2">{questions.grade}</text>
        <text className="ttt5">Subject</text>
        <text className="ta3">{questions.subject}</text>
        <text className="ttt6">Question</text>
        <text className="ta4">{questions.question}</text>
        <text className="ttt7">Answer</text>
        <input type="text" style={{ boxSizing: 'border-box', position: 'absolute', width: '920px', height: '163px', left: '513px', top: '718px', background: '#FFFFFF', border: '1px solid #000000' }}  id="answer"  onChange={(event) => setAnswer(event.target.value)}/>
        <div>
        <button type='submit' id="reply" className="anst" style={{ position: 'absolute', width: '280px', height: '60px', left: '1079px', top: '906px', background: '#063a67', borderRadius: '20px' }}>SUBMIT ANSWER</button>
        </div>
    </form>
    </div>
    </div>
    </div>
  )
}

export default AnswerQ