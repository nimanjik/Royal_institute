import React, { useEffect, useState } from 'react';
import './ReplyF.css';
import axios from 'axios';
import { useParams,useNavigate } from 'react-router-dom';
import Head from '../Header/Header'

function ReplyF() {

    const { id } = useParams();
    const [feedbacks,setFeedbacks] = useState([]);
    const [reply, setReply] = useState();
    const navigator = useNavigate();

    useEffect(() =>{

        axios.get(`http://localhost:5000/giveToReply/${id}`)
        .then((res) => {
            setFeedbacks(res.data);
        })
        .catch((err) => console.error(err));
    },[id]);

    const replyS = (event) => {
        event.preventDefault();
          axios.put(`http://localhost:5000/getToReply/${id}`, {reply})
            .then((response) => {
              console.log('Answer updated:', response.data);
              navigator('/ManagerFeedback');
              // Optionally, you can update the UI to reflect the updated answer
            })
            .catch((error) => {
              console.error('Error updating answer:', error);
            });
        };

  return (
    <div>
       <Head/>
        <div>
      <text className="heading14k">We Want to Hear from You - Service Feedabacks</text>

      <form onSubmit={replyS}>
        <text className="t1t">Student ID</text>
        <text style={{ boxSizing: 'border-box', position: 'absolute', width: '884px', height: '53px', left: '529px', top: '227px', background: '#FFFFFF', border: '1px solid #000000' }}>{feedbacks.sid}</text>
        <text className="t2t">Feedback</text>
        <text style={{ boxSizing: 'border-box', position: 'absolute', width: '884px', height: '163px', left: '528px', top: '333px', background: '#FFFFFF', border: '1px solid #000000' }}>{feedbacks.feedback}</text>
        <text className="t3t">Response</text>
        <input type="text" id="sfr" style={{ position: 'absolute', width: '887px', height: '253px', left: '528px', top: '554px' }} onChange={(event) => setReply(event.target.value)}></input>

        <button id="sfrbtn" type='submit' className="sfrt" style={{ position: 'absolute', width: '200px', height: '50px', left: '1200px', top: '850px', background: '#063a67', borderRadius: '20px' }}>SUBMIT </button>
      </form>
    </div>
    </div>
  )
}

export default ReplyF