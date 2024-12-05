import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './mgview.css';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import Swal from 'sweetalert2';
import Head from '../Header/Header'


function MgView() {
    const [allmpayments, setAllPayments] = useState([]);
    const navigator = useNavigate();


    useEffect(() => {
        fetchPayments();
    }, []);

    const fetchPayments = async () => {
        try {
            const [onlineRes, bankRes, cashRes] = await Promise.all([
                axios.get('http://localhost:5000/displayonline'),
                axios.get('http://localhost:5000/displaybank'),
                axios.get('http://localhost:5000/displaycash')
            ]);
            const onlinePayments = onlineRes.data;
            const bankPayments = bankRes.data;
            const cashPayments = cashRes.data;
            setAllPayments([...onlinePayments, ...bankPayments, ...cashPayments]);
        } catch (error) {
            console.error(error);
        }
    };

    const handleDelete = (id) => {
        axios.delete('http://Localhost:5000/deletepayment/' + id)
          .then((res) => {
           
          })
          .catch((err) => console.error(err));
      }
    
      const handleSubmit = (id) => {
        Swal.fire({
          title: "Delete Payment",
          text: "Are you sure you want to delete the Payment Record?",
          icon: "question",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, proceed!",
          cancelButtonText: "Cancel",
        }).then((result) => {
          if (result.isConfirmed) {
            handleDelete(id); // Call handleDelete function with payment ID
            Swal.fire({
              title: "Payment is Deleted",
              icon: "success",
            });
            handleClick2();
          } else {
            Swal.fire({
              title: "Changes are Canceled",
              icon: "error",
            });
          }
        });
      };
      
    
      const handleClick2 = () => {
        toast.loading('Payment is Deleting...', {
          style: {
            background: 'black', // Customize the background color
            color: '#ffffff', // Customize the text color
            borderRadius: '10px', // Add border radius
            border: '2px solid #ffffff', // Add border
          },
        });
      
        setTimeout(() => {
          toast.dismiss();
          setTimeout(() => {
            toast.success('Payment is Deleted!', {
              style: {
                background: '#28a745', // Green background color
                color: '#ffffff', // White text color
                borderRadius: '10px', // Rounded corners
                border: '2px solid #ffffff', // White border
              },
              duration: 2000, // Display duration in milliseconds (3 seconds)
              iconTheme: {
                primary: '#ffffff', // White icon color
                secondary: '#28a745', // Green icon color
              },
            });
            setTimeout(() => {
              navigator('/managerfinancial');
            }, 2500); // Wait for 2 seconds after displaying success toast before navigating
          }, 2500); // Wait for 2 seconds after dismissing loading toast before displaying success toast
        }, 5000); // Wait for 5 seconds before dismissing loading toast
      };
    


    return (
        <div>
          <Head/>
            <Toaster/>
            <div className='bodymv'>
                <h1 className='h1mv'><br/>Student Payments</h1>
                <br />
                <div className="tbl-headermv">
                    <table className='tablemv'>
                        <thead>
                            <tr>
                                <th className='thmv'>Student IT Number</th>
                                <th className='thmv'>Description</th>
                                <th className='thmv'>Date</th>
                                <th className='thmv'>Amount</th>
                                <th className='thmv'>Type</th>
                                <th className='thmv'>Status</th>
                                <th className='thmv'>Action</th>
                                <th></th>
                            </tr>
                        </thead>
                    </table>
                </div>
                <div className="tbl-contentmv">
                    <table className='tablemv'>
                        <tbody>
                            {allmpayments.map((allmpayment) => (
                                <tr key={allmpayment._id}>
                                    <td className='tdmv'>{allmpayment.itnumber}</td>
                                    <td className='tdmv'>{allmpayment.description}</td>
                                    <td className='tdmv'>{allmpayment.date}</td>
                                    <td className='tdmv'>{allmpayment.amount}</td>
                                    <td className='tdmv'>{allmpayment.type}</td>
                                    <td className='tdmv6' style={{ color: allmpayment.status === 'Approved' ? 'green' : allmpayment.status === 'Rejected' ? 'red' : allmpayment.status === 'Pending' ? 'blue' : 'inherit' }}>{allmpayment.status}</td>
                                    <td className='tdmv'>
                                    <Link to = {`/editmanager/${allmpayment._id}`} >
                                        <input className="buttonmv4" type="button" value="Edit"  />
                                    </Link>
                                    </td>
                                    <td className='tdmv'>
                                    <input className="buttonmv5" type="button" name="delete" value="Delete" onClick={() => handleSubmit(allmpayment._id)} />
                                    
                                  
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

export default MgView;
