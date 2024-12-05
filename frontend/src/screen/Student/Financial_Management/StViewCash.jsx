import React, { useEffect, useState } from 'react';
import{Link} from 'react-router-dom';
import './stviewcash.css';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import Swal from 'sweetalert2';
import Head from '../Header/Header';


function StViewCash() {

  const[cashpayments , setCashPayments] = useState([]);
  const navigator = useNavigate();

  useEffect(() => {
    axios.get('/studentprofile')
      .then((res) => {
        const itnum = res.data.stdid;
        axios.get('/displaycash')
          .then((res) => {
            const paymentitnumber = res.data.filter(payment => payment.itnumber === itnum );
            setCashPayments(paymentitnumber);
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // useEffect(()=>{
  //   axios.get('http://Localhost:5000/displaycash')
  //   .then((res)=> {
  //         setCashPayments(res.data);
  //   })
  //   .catch((err) => console.error(err));
  // },[]);

  const handleDelete = (id) => {
    axios.delete('http://Localhost:5000/deletecash/' + id)
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
          navigator('/viewonline');
        }, 2500); // Wait for 2 seconds after displaying success toast before navigating
      }, 2500); // Wait for 2 seconds after dismissing loading toast before displaying success toast
    }, 5000); // Wait for 5 seconds before dismissing loading toast
  };

  return (
    <div>
      <Head/>
      <Toaster/>
      <div className='bodyvc'>
      <h1 className='h1vc'><br/>My Payments</h1>
     
 
      <Link to = {'/viewonline'} >
      <button type="submit" name="online" className="buttonvc1">Online</button>
      </Link>
      <br />
      <Link to = {'/viewbank'} >
      <button type="submit" name="bank" className="buttonvc2">Bank</button>
      </Link>
      <br />
      <button type="submit" name="cash" className="buttonvc3">Cash</button>
      <br />
      <div className="tbl-headervc">
        <table className='tabletc'>
          <thead>
            <tr>
              <th className='thvc'>IT Number</th>
              <th className='thvc'>Student Name</th>
              <th className='thvc'>Description</th>
              <th className='thvc'>Date</th>
              <th className='thvc'>Amount</th>
              <th className='thvc'>Status</th>
              <th className='thvc'>Action</th>
              
            </tr>
          </thead>
        </table >
      </div>
      <div className="tbl-contentvc">
        <table className='tabletc'>
          <tbody>

          {cashpayments.map((cash) =>(

            <tr>
              <td className='tdvc'>{cash.itnumber}</td>
              <td className='tdvc'>{cash.studentname}</td>
              <td className='tdvc'>{cash.description}</td>
              <td className='tdvc'>{cash.date}</td>
              <td className='tdvc'>{cash.amount}</td>
              <td className='tdvc' style={{ color: cash.status === 'Approved' ? 'green' : cash.status === 'Rejected' ? 'red' : cash.status === 'Pending' ? 'blue' : 'inherit' }}>{cash.status}</td>

              <td className='tdvc'>
                <input className="buttonvc6" type="button" name="delete" value="Delete"   onClick={() => handleSubmit(cash._id)} />
              </td>
            </tr>

          ))}
          </tbody>
        </table>
      </div>
    </div>
    </div>
  )
}

export default StViewCash
