import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './stviewbank.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import Swal from 'sweetalert2';
import Head from '../Header/Header';


function StViewBank() {

  const [bankpayments, setBankPayments] = useState([]);
  const navigator = useNavigate();

 

  const handleDelete = (id) => {
    axios.delete('http://Localhost:5000/deletebank/' + id)
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


  //show file
  const showFile = (upload_files) => {
    window.open(`http://localhost:5000/files2/${upload_files}`, "_blank", "noreferrer");
  };



  useEffect(() => {
    axios.get('/studentprofile')
      .then((res) => {
        const itnum = res.data.stdid;
        axios.get('/displaybank')
          .then((res) => {
            const paymentitnumber = res.data.filter(payment => payment.itnumber === itnum );
            setBankPayments(paymentitnumber);
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
      <Head />
      <Toaster />
      <div className='bodyvb'>
        <h1 className='h1vb'><br />My Payments</h1>

        <Link to={'/viewonline'} >
          <button type="submit" name="online" className="buttonvb1">Online</button>
        </Link>
        <br />
        <button type="submit" name="bank" className="buttonvb2">Bank</button>
        <br />
        <Link to={'/viewcash'} >
          <button type="submit" name="cash" className="buttonvb3">Cash</button>
        </Link>
        <br />
        <div className="tbl-headervb">
          <table className='tabletb'>
            <thead>
              <tr>
                <th className='thvb'>Transactions ID</th>
                <th className='thvb3'>Account Name</th>
                <th className='thvb'>Account Number</th>
                <th className='thvb'>Bank Name</th>
                <th className='thvb'>Description</th>
                <th className='thvb'>Date</th>
                <th className='thvb'>Amount</th>
                <th className='thvb'>View</th>

                <th className='thvb'>Status</th>
                <th className='thvb'>Action</th>
                <th className='thvb'></th>
                <th className='thvb'></th>
              </tr>
            </thead>
          </table>
        </div>
        <div className="tbl-contentvb">
          <table className='tabletb'>
            <tbody>

              {bankpayments.map((bank) => (

                <tr>
                  <td className='tdvb'>{bank.itnumber}</td>
                  <td className='tdvb3'>{bank.accountname}</td>
                  <td className='tdvb'>{bank.accountnumber}</td>
                  <td className='tdvb'>{bank.bankname}</td>
                  <td className='tdvb'>{bank.description}</td>
                  <td className='tdvb'>{bank.date}</td>
                  <td className='tdvb'>{bank.amount}</td>
                  <td className='tdvb'>  <input className="buttonvb6" type="button" name="view" value="view" onClick={() => showFile(bank.upload_files)} /></td>

                  <td className='tdvb' style={{ color: bank.status === 'Approved' ? 'green' : bank.status === 'Rejected' ? 'red' : bank.status === 'Pending' ? 'blue' : 'inherit' }}>{bank.status}</td>

                  <td className='tdvb'>
                    {bank.status !== 'Approved' && bank.status !== 'Rejected' ? (
                      <Link to={`/cancelbank/${bank._id}`} >
                        <input className="buttonvb4" type="button" name="cancel" value="Cancel" />
                      </Link>
                    ) : (
                      <input className="buttonvb7" type="button" name="cancel" value="Cancel" disabled />
                    )}
                  </td>
                  <td className='tdvb'>
                    <Link to={`/editbank/${bank._id}`} >
                      <input className="buttonvb5" type="button" name="edit" value="Edit" />
                    </Link>
                  </td >
                  <td className='tdvb'>
                    <input className="buttonvb6" type="button" name="delete" value="Delete" onClick={() => handleSubmit(bank._id)} />
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

export default StViewBank
