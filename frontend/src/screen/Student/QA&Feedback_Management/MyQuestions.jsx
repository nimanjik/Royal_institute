import React, { useEffect, useState } from 'react'
import {Link } from 'react-router-dom';
import './MyQuestions.css';
import axios from 'axios';
import Head from '../Header/Header';

function MyQuestions() {

  const[questions,setQuestions] = useState([]);
  const [name, setName] = useState();

  useEffect(()=>{
    axios.get('/studentprofile')
    .then((res)=>{
        setName(res.data.stdid);            
    })
    .catch((err)=>{
        console.log(err);
    })
  },[]) 

  useEffect(() => {
   
    if (name) {
    axios.get('http://localhost:5000/MyQuestions')
      .then(res => {
        const FilterQuestions = res.data.filter(question =>
          question.sid === name
        );
        setQuestions(FilterQuestions);
      })
      .catch(err => console.error(err));
    }
  }, [name]);

  const handleDelete = (id) =>{
    axios.delete('http://localhost:5000/deleteQuestion/' + id)
    .then((res) => {
      window.location.reload();
    })
    .catch((err) => console.error(err));
  }


  return (
    <div>
      <Head/>
      
                
   
    <div>
      <label className="heading31">Connect With Your Teachers - My Questions</label>
      <ul style={{ position: 'absolute', left: '344px', top: '220px',  width: '864px', background: '#FFFFFF',  padding: '10px',listStyleType: 'none'}}>
        {questions.map((question, index) => (
          <li key={index} style={{ marginBottom: '20px',boxSizing: 'border-box', width: '864px', height: '191px', background: '#FFFFFF',borderRadius:'10px', border: '5px solid #000000'  }}>
            <strong style={{ marginLeft: '40px'}}>Question:</strong> {question.question}<br /><br/><br/>
            <strong style={{ marginLeft: '40px'}}>Answer:</strong> {question.answer}<br /><br/><br/><br/>
            <div>
              <Link to={`/UpdateQuestion/${question._id}`} style={{ textDecoration: 'none', color: '#FFFFFF' }}>
                <button className='buttonbb2'>Edit</button>
              </Link>
              <button onClick={(a) => handleDelete(question._id)} className='buttonbb3'>Delete</button><br/><br/><br/><br/>
            </div>
          </li>
        ))}
      </ul>
    </div>
    </div>
  )
}

export default MyQuestions