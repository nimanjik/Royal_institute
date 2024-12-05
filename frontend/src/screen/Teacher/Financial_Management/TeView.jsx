import React, { useEffect, useState } from 'react';
import './teview.css';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import Head from '../Header/Header'

function TeView() {
    const [allPayments, setAllPayments] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        Promise.all([
            axios.get('http://localhost:5000/displayonline'),
            axios.get('http://localhost:5000/displaybank'),
            axios.get('http://localhost:5000/displaycash')
        ])
        .then(([onlineRes, bankRes, cashRes]) => {
            const onlinePayments = onlineRes.data;
            const bankPayments = bankRes.data;
            const cashPayments = cashRes.data;
            // Assuming each response data is an array
            setAllPayments([...onlinePayments, ...bankPayments, ...cashPayments]);
        })
        .catch((err) => console.error(err));
    }, []);


    
    useEffect(() => {
        axios.get('/teacherprofile')
          .then((res) => {
            const tsubject = res.data.subject;
            
            Promise.all([
              axios.get('/displayonline'),
              axios.get('/displaybank'),
              axios.get('/displaycash')
            ])
            .then(([onlineRes, bankRes, cashRes]) => {
              const onlinePayments = onlineRes.data;
              const bankPayments = bankRes.data;
              const cashPayments = cashRes.data;
              
              // Filter payments based on teacher's subject
              const tepayment = [...onlinePayments, ...bankPayments, ...cashPayments].filter(tepayment => tepayment.description === tsubject);
              setAllPayments(tepayment);
            })
            .catch((err) => {
              console.log(err);
            });
          })
          .catch((err) => {
            console.log(err);
          });
      }, []);
    

  const filteredPayments = allPayments.filter(payment => {
    // Check if payment.itnumber exists and is not undefined before calling includes()
    return payment.itnumber && payment.itnumber.includes(searchQuery);
});


    useEffect(() => {
        if (searchQuery && filteredPayments.length === 0) {
            // Display toast message if search IT number is not found
            toast.error('IT number not found', {
                duration: 3000, // Display duration in milliseconds (3 seconds)
                style: {
                    background: '#ffffff', // Background color
                    color: 'black', // Text color
                    borderRadius: '8px',
                    border: '2px solid black',
                },
            });
        }
    }, [searchQuery, filteredPayments]);

    return (
        <div>
            <Head/>
            <Toaster/>
       
        <div className='bodytv'>
        <div className='div2'>
            <h1 className='teac1'><br/>My Payments</h1>
            <div className='div1'>
                <form className="search-bar">
                    <input
                        type="search"
                        name="search"
                        pattern=".*\S.*"
                        required
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search by IT Number..."
                    />
                    <button className="search-btn" type="submit">
                        <span>Search</span>
                    </button>
                </form>
            </div>
            <div className="tbl-headertv">
                <table className='tabletv'>
                    <thead>
                        <tr>
                            <th className='thtv'>Student IT Number</th>
                            <th className='thtv2'>Date</th>
                            <th className='thtv3'>Amount</th>
                            <th className='thtv'>Description</th>
                            <th className='thtv'>Type</th>
                            <th className='thtv'>Status</th>
                        </tr>
                    </thead>
                </table>
            </div>
            <div className="tbl-contenttv">
                <table className='tabletv'>
                    <tbody>
                        {filteredPayments.map((payment) => (
                            <tr key={payment._id}>
                                <td className='tdtv'>{payment.itnumber}</td>
                                <td className='tdtv2'>{payment.date}</td>
                                <td className='tdtv3'>{payment.amount}</td>
                                <td className='tdtv'>{payment.description}</td>
                                <td className='tdtv'>{payment.type}</td>
                                <td className='tdtv6' style={{ color: payment.status === 'Approved' ? 'green' : payment.status === 'Rejected' ? 'red' : payment.status === 'Pending' ? 'blue' : 'inherit' }}>{payment.status}</td>

                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    </div>
    </div>
    );
}

export default TeView;
