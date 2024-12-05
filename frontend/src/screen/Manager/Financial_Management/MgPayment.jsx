import React, { useState ,useEffect } from 'react';
import './mgpayment.css';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import Swal from 'sweetalert2';
import Head from '../Header/Header'



function MgPayment() {

  const status = 'Pending';
  const type = 'Cash';

  const[itnumber,setItnumber] = useState();
  const[studentname,setStudentname] = useState();
  const[description,setDescription] = useState();
  const[date,setDate] = useState();
  const[amount,setAmount] = useState();
  const navigator = useNavigate();


  const submit = (e) => {
      e.preventDefault();
      axios.post('http://Localhost:5000/createcash',{itnumber:itnumber ,studentname:studentname, description:description,
      date:date , amount:amount , status:status , type:type})

      .then(res=>{
        console.log(res);
        
      })
      .catch(err => console.error(err));
  }


  const handleSubmit = (e) => {
    e.preventDefault();
    Swal.fire({
      title: "Confirm Payment",
      text: "Are you sure you want to proceed with the payment?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, proceed!",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        submit(e); // Call submit function if result is confirmed
        Swal.fire({
          title: "Payment is Confirmed",
          icon: "success",
        });
        handleClick2();
      } else {
        Swal.fire({
          title: "Payment is Canceled",
          icon: "error",
        });
        // Call submit function even if result is canceled
      }
    });
  };
  
  

  const handleClick2 = () => {
    toast.loading('Payment is processing...', {
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
        toast.success('Payment is completed!', {
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
  
  useEffect(() => {
    const today = new Date();
    const yyyy = today.getFullYear();
    let mm = today.getMonth() + 1;
    let dd = today.getDate();

    if (mm < 10) mm = '0' + mm;
    if (dd < 10) dd = '0' + dd;

    const formattedDate = yyyy + '-' + mm + '-' + dd;
    setDate(formattedDate);
  }, []);



  return (
    <div>
      <Head/>
        <Toaster/>
      <div className="bodymgpa">
                <h1 className="h1mgpa"><br></br>Payment Form</h1>

                <div className="containermgpa">
                    <form className="paymgpa" onSubmit={handleSubmit} >
                        <br />
                        <label htmlFor="cname" className="labelmgpa1">Enter IT Number:</label><br/>
                        <input type="text" name="itnum" placeholder="SID123456" pattern="SID\d{6}" required className="textmgpa1" onChange={(e)=>setItnumber(e.target.value)} /><br /><br />

                        <label htmlFor="an" className="labelmgpa1">Enter Student Name:</label><br/>
                        <input type="text" name="sname" placeholder="Enter Name" pattern="[A-Za-z\s]+" required className="textmgpa1" onChange={(e)=>setStudentname(e.target.value)}/><br /><br />

                        <label id="totalA" name="totalA" className="labelmgpa1">Enter Description:</label><br/>
                        <input type="text" name="descriptions" placeholder="Class Name" pattern="[A-Za-z\s]+" required className="textmgpa3" onChange={(e)=>setDescription(e.target.value)}/><br /><br />

                        <label htmlFor="tda" className="labelmgpa1">Enter Date:</label><br/>
                        <input type="date" name="dates" placeholder="(DD/MM/YY)"  value={date} readOnly  className="textmgpa4" onChange={(e)=>setDate(e.target.value)}/><br /><br />

                        <label id="totalA" name="totalA" className="labelmgpa1">Enter Amount:</label><br/>
                        <input type="text" name="amounts" placeholder="00.00" pattern="\d+(\.\d{2})?" required className="textmgpa5" onChange={(e)=>setAmount(e.target.value)}/><br /><br />


                        <div className="containermgpa4">
                            <button type="submit" name="submit" className="buttonmgpa3">Confirm</button>
                        </div>
                    </form>
                </div>
            </div>
    </div>
  )
}

export default MgPayment
