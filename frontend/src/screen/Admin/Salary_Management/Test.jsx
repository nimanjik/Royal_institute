import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import Navbar from "../../navbar/navbar";
import './Refund.css';

function Refund() {
  const [refunds, setRefunds] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [noResults, setNoResults] = useState(false);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const selectedMonth = queryParams.get('month') || '2023-05'; // Default to May 2023 if no month is specified

  const ComponentsRef = useRef();

  useEffect(() => {
    const fetchAndFilterRefunds = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get('http://localhost:5000/refund');
        if (response && response.data) {
          let filteredRefunds = response.data;
          if (selectedMonth) {
            const month = parseInt(selectedMonth.split('-')[1], 10) - 1; // Month is zero-based
            filteredRefunds = filteredRefunds.filter(refund => {
              const refundDate = new Date(refund.date);
              return refundDate.getMonth() === month;
            });
          }

          if (filteredRefunds.length === 0) {
            setNoResults(true);
          } else {
            setNoResults(false);
          }

          setRefunds(filteredRefunds);
        } else {
          throw new Error('Invalid data format received from server');
        }
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAndFilterRefunds();
  }, [selectedMonth]); // Re-run the effect when selectedMonth changes

  useEffect(() => {
    console.log('Refunds:', refunds);
  }, [refunds]);

  return (
    <div>
      <Navbar />
      <div>
        <h1 className='h1mvl'>Teacher Salary Report for {selectedMonth}</h1>
        <h1 className='Payment h1'>Refund Details</h1>

        {refunds.length > 0 ? (
          <div ref={ComponentsRef}>
            <table className='payment-table'>
              <thead>
                <tr>
                  <th>User Name</th>
                  <th>Email Address</th>
                  <th>Postal Address (City)</th>
                  <th>Mobile Phone Number</th>
                  <th>Service Type</th>
                  <th>Amount Refunded</th>
                  <th>Refund Date</th>
                  <th>Reason for Refund</th>
                  <th>Payment Slip Reference Number</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {refunds.map(refund => (
                  <RefundDetails
                    key={refund._id}
                    refund={refund}
                  />
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p>{noResults ? 'No results found.' : 'No Refunds to display.'}</p>
        )}
      </div>
    </div>
  );
}

function RefundDetails({ refund }) {
  const { _id, fname, gmail, address, Phone, ServiceType, amount, date, reason, PaymentSlip, Status } = refund;

  // Format the date to a more readable format
  const formattedDate = new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <tr>
      <td>{fname}</td>
      <td>{gmail}</td>
      <td>{address}</td>
      <td>{Phone}</td>
      <td>{ServiceType}</td>
      <td>{amount}</td>
      <td>{formattedDate}</td>
      <td>{reason}</td>
      <td>{PaymentSlip}</td>
      <td>{Status}</td>
    </tr>
  );
}

export default Refund;
