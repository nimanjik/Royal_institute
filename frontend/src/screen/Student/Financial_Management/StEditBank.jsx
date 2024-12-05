import React, { useEffect } from 'react';
import {useParams} from 'react-router-dom';
import  { useState } from 'react';
import './steditbank.css';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import Swal from 'sweetalert2';
import Head from '../Header/Header';



function StEditBank() {

    const {id} = useParams();
    const[itnumber,setItnumber] = useState();
    const[accountname,setAccountname] = useState();
    const[accountnumber,setAccountnumber] = useState();
    const[bankname,setBankname] = useState();
    const[description,setDescription] = useState();
    const[date,setDate] = useState();
    const[amount,setAmount] = useState();
    const navigator = useNavigate();
  
  
    useEffect(()=>{
        axios.get('http://Localhost:5000/getbank/' +id)
        .then((res)=>{
          setItnumber(res.data.itnumber);
          setAccountname(res.data.accountname);
          setAccountnumber(res.data.accountnumber);
          setBankname(res.data.bankname);
          setDescription(res.data.description);
          setDate(res.data.date);
          setAmount(res.data.amount);
  
        })
        .catch((err) => console.error(err));
    },[id]);
  
  
    const updatebank = (e) =>{
      e.preventDefault();
      axios.put('http://Localhost:5000/updatebank/'+id,{itnumber:itnumber ,accountname:accountname, accountnumber:accountnumber, bankname:bankname,description:description,
      date:date , amount:amount})
  
      .then(res=>{
        console.log(res);
      })
      .catch(err => console.error(err));
    }
  

    const handleSubmit = (e) => {
      e.preventDefault();
      Swal.fire({
        title: "Update Payment",
        text: "Are you sure you want to save the changes?",
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, proceed!",
        cancelButtonText: "Cancel",
      }).then((result) => {
        if (result.isConfirmed) {
          updatebank(e); // Call submit function if result is confirmed
          Swal.fire({
            title: "Changes are Updated",
            icon: "success",
          });
          handleClick2();
        } else {
          Swal.fire({
            title: "Changes are Canceled",
            icon: "error",
          });
          // Call submit function even if result is canceled
        }
      });
    };
    
    
  
    const handleClick2 = () => {
      toast.loading('Changes are saving...', {
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
          toast.success('Payment is Updated!', {
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
            navigator('/viewbank');
          }, 2500); // Wait for 2 seconds after displaying success toast before navigating
        }, 2500); // Wait for 2 seconds after dismissing loading toast before displaying success toast
      }, 5000); // Wait for 5 seconds before dismissing loading toast
    };
  
    const handleCancel = () => {
      navigator('/viewbank');
    }
    
  return (
    <div>
     <Head/>
      <div>
      <Toaster/>
     <div className="bodyeba">
            <h1 className="ebah1"> <br></br>Edit Payment</h1>

            <div className="containereba">
                <form className="payeba" 
                onSubmit={handleSubmit}
                >
                <h2 className="ebah2"><br></br>Payment Details</h2><br/>

                    <label htmlFor="cname" className="labeleba1">Enter IT Number:</label><br/>
                    <input type="text" name="itnum" placeholder="IT12345678" readOnly required className="texteba1"  value={itnumber} onChange={(e)=>setItnumber(e.target.value)}/><br /><br />

                    <label htmlFor="an" className="labeleba1">Enter Account Name:</label><br/>
                    <input type="text" name="acname" placeholder="Enter Name" pattern="[A-Za-z\s]+" required className="texteba2"  value={accountname} onChange={(e)=>setAccountname(e.target.value)}/> <br /><br />

                    <label htmlFor="an" className="labeleba1">Enter Account Number:</label><br/>
                    <input type="text" name="acnum" placeholder="xxxxxxxxxx" pattern="[0-9]+" required className="texteba3" value={accountnumber} onChange={(e)=>setAccountnumber(e.target.value)}/> <br /><br />

                    <label htmlFor="cno" className="labeleba1">Enter Bank Name:</label><br/>
                    <input type="text" name="bname" placeholder="Enter Bank Name" pattern="[A-Za-z\s]+" required className="texteba4" value={bankname} onChange={(e)=>setBankname(e.target.value)}/><br /><br />

                    <label htmlFor="totalA" className="labeleba1">Enter Description:</label><br/>
                    <input type="text" name="descriptions" placeholder="Class Name" pattern="[A-Za-z\s]+" required className="texteba7" value={description} onChange={(e)=>setDescription(e.target.value)}/><br /><br />

                    <label htmlFor="tda" className="labeleba1">Enter Date:</label><br/>
                    <input type="date" name="dates" placeholder="(DD/MM/YY)"  readOnly  className="texteba5" value={date} onChange={(e)=>setDate(e.target.value)}/><br /><br />

                    <label htmlFor="totalA" className="labeleba1">Enter Amount:</label><br/>
                    <input type="text" name="amounts" placeholder="00.00" readOnly required className="texteba6" value={amount} onChange={(e)=>setAmount(e.target.value)}/><br /><br />
                    <br></br>
                    
                    
                   {/*  <div className="payeba2">
                      <br/>
                    <label htmlFor="file" className="labeleba8">Upload a file:</label><br />
                    <input type="file" id="file" name="file" className="texteba8" readOnly />
                    </div> */}
                    <div className="containereba4"> 
                        <button type="submit" name="submit" className="buttoneba3">Save</button>
                        <button type="submit" name="submit" className="buttoneba4" 
                        onClick={handleCancel}
                        >Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
    </div>
  )
}

export default StEditBank
