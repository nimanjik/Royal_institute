import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Test.css';
import axios from 'axios';
import Head from '../Header/Header';

function Enrolled() {
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    axios.get('/studentprofile')
      .then((res) => {
        const itnum = res.data.stdid;
        axios.all([
          axios.get('/displaybank'),
          axios.get('/displayonline')
        ])
        .then(axios.spread((bankRes, onlineRes) => {
          const bankPayments = bankRes.data.filter(payment => payment.itnumber === itnum && payment.status === 'Approved');
          const onlinePayments = onlineRes.data.filter(payment => payment.itnumber === itnum && payment.status === 'Approved');
          const allPayments = [...bankPayments, ...onlinePayments];
          setPayments(allPayments);
        }))
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
      <div className='bodyvc'>
        <h1 className='h1vc'><br />My Subjects</h1>
        <div className="tbl-headervc">
          <table className='tabletc'>
            <thead>
              <tr>
                
                <th className='thvc'>Subject Name</th>
                <th></th>
                <th></th>
                <th></th>
                <th className='thvc'>Actions</th>
                <th></th>
              </tr>
            </thead>
          </table>
        </div>
        <div className="tbl-contentvc">
          <table className='tabletc'>
            <tbody>
              {payments.map((payment) => (
                <tr key={payment.subjectcode}>
                  <td className='tdvc'>{payment.description}</td>
                  <td className='tdvc'>{payment.subjectname}</td>
                  <td className='tdvc'>
                  <Link to={`/lessonmaterial/${payment.description}`}>
                      <input className="buttonvo5" type="button" name="edit" value="View Class" />
                    </Link>
                  </td>
                  
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Enrolled;
