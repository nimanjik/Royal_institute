import React, { useEffect, useState } from 'react';
import './MyFeedbacks.css';

import axios from 'axios';
import Head from '../Header/Header';


function ViewTeacherFeedback() {

    const[tfeedbacks,setTFeedbacks] = useState([]);

    useEffect(() => {
        //get teacher feedback
      axios.get('http://localhost:5000/MyTFeedbacks')
      .then((res) =>{
        setTFeedbacks(res.data);
      })
      .catch((err) => console.error(err));

    },[]);

    useEffect(() => {
      axios.get('/teacherprofile')
        .then((res) => {
          const tsub= res.data.subject;
          axios.get('/MyTFeedbacks')
            .then((res) => {
              const feedback = res.data.filter(feedbacks => feedbacks.subject === tsub );
              setTFeedbacks(feedback);
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
        <h2 className="heading10">We Want to Hear from You - My Feedbacks</h2>

<ul style={{ position: 'absolute',listStyleType: 'none'}}>
  {tfeedbacks.map((tfeedback, index) => (
    <li key={index} style={{ position: 'relative', marginBottom: '20px' }}>
      <label className="tt91">Feedback</label>
      <ul style={{ listStyleType: 'none' ,boxSizing: 'border-box', position: 'absolute', height: '165px', width: '830px', left: '520px', top: '150px', background: '#FFFFFF', border: '2px solid #000000',borderRadius:'10px' }}>
        <li><strong>Grade:</strong> {tfeedback.grade}</li><br/>
        <li><strong>Subject:</strong> {tfeedback.subject}</li><br/>
        <li><strong>Teacher:</strong> {tfeedback.teacher}</li><br/>
        <li><strong>Feedback:</strong> {tfeedback.feedback}</li><br/>
      </ul>

    
      
      <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
    </li>
  ))}
</ul>
    </div>
  )
}

export default ViewTeacherFeedback