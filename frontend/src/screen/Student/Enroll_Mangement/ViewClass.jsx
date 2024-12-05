import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import Head from '../Header/Header';
import './ViewClass.css'

function ViewClass() {
  const [subname, setSubName] = useState('');
  const { subid } = useParams(); // Get the subid from the URL params

  useEffect(() => {
    axios.get(`/getSubject/${subid}`)
      .then((res) => {
        setSubName(res.data.subjectname);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [subid]); // Include subid in the dependency array

  return (
    <div>
      <Head/>
      <div className='viewclass'>
        <h2>PayNow</h2>

        <h3>Class Information:</h3>
        <p>Subject: {subname}</p>
        <br />
       
        

        

        <h3>Payment Instructions:</h3>
        <p>1. Payment Deadline: Please complete your payment by first week to secure your enrollment. Failure to do so may result in being dropped from the class.</p>
        <p>2. Refund Policy: Refunds are available within first 3 days of payment. To request a refund, please contact our support team.</p>
        <p>3. Contact Information: For any payment-related inquiries, please contact our support team.</p>
        <p>4. Payment Confirmation: After completing the payment process, you will receive a confirmation email with details of your payment.</p>
        <p>5. Multiple Installments: If you prefer to pay in installments, please contact us to discuss available installment plans.</p>
        <p>6. Financial Aid or Scholarships: If you require financial assistance, please visit  or apply for scholarships.</p>
        <p>7. Payment Assistance: If you need assistance with making the payment, please reach out to our support team for guidance.</p>

        <Link to={`/paybank/${subid}`}>
          <button className="buttonviec">Proceed to Payment</button>
        </Link>
      </div>
    </div>
  );
}

export default ViewClass;
