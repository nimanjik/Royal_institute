import React, { useEffect } from 'react';
import {useParams} from 'react-router-dom';
import  { useState } from 'react';
import './mgedit.css';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import Swal from 'sweetalert2';
import Head from '../Header/Header'



function Mgedit() {

    const {id} = useParams();
    const[itnumber,setItnumber] = useState();
    const[description,setDescription] = useState();
    const[date,setDate] = useState();
    const[amount,setAmount] = useState();
    const[type,setType] = useState();
    const[status,setStatus] = useState();
    const navigator = useNavigate();

    useEffect(()=>{
        axios.get('http://Localhost:5000/getpayment/' +id)
        .then((res)=>{
          setItnumber(res.data.itnumber);
          setDescription(res.data.description);
          setDate(res.data.date);
          setAmount(res.data.amount);
          setType(res.data.type);
          setStatus(res.data.status);
  
        })
        .catch((err) => console.error(err));
    },[id]);

    useEffect(()=>{
        axios.get('http://Localhost:5000/getbank/' +id)
        .then((res)=>{
          setItnumber(res.data.itnumber);
          setDescription(res.data.description);
          setDate(res.data.date);
          setAmount(res.data.amount);
          setType(res.data.type);
          setStatus(res.data.status);
  
        })
        .catch((err) => console.error(err));
    },[id]);
  
    useEffect(()=>{
        axios.get('http://Localhost:5000/getcash/' +id)
        .then((res)=>{
          setItnumber(res.data.itnumber);
          setDescription(res.data.description);
          setDate(res.data.date);
          setAmount(res.data.amount);
          setType(res.data.type);
          setStatus(res.data.status);
  
        })
        .catch((err) => console.error(err));
    },[id]);

    const update = () =>{
        axios.put('http://Localhost:5000/updateonlinemg/'+id,{itnumber:itnumber , description:description,
        date:date , amount:amount, type:type, status:status })
      
        .then(res=>{
          console.log(res);
          
        })
        .catch(err => console.error(err));
      }
      
      const updatebank = () =>{
        axios.put('http://Localhost:5000/updatebankmg/'+id,{itnumber:itnumber , description:description,
        date:date , amount:amount, type:type, status:status })
      
        .then(res=>{
          console.log(res);
        
        })
        .catch(err => console.error(err));
      }
      
      const updatecash = () =>{
        axios.put('http://Localhost:5000/updatecashmg/'+id,{itnumber:itnumber , description:description,
        date:date , amount:amount, type:type, status:status })
      
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
            update(); 
            updatebank();
            updatecash();// Call submit function if result is confirmed
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
                primary: '#ffffff', // White icon color0
                secondary: '#28a745', // Green icon color
              },
            });
            setTimeout(() => {
              navigator('/managerfinancial');
            }, 2500); // Wait for 2 seconds after displaying success toast before navigating
          }, 2500); // Wait for 2 seconds after dismissing loading toast before displaying success toast
        }, 5000); // Wait for 5 seconds before dismissing loading toast
      };
    
      const handleCancel = () => {
        navigator('/managerfinancial');
      }
      
    

  return (
    <div>
      <Head/>
      <Toaster/>
      <div className="bodymge">
                <h1 className="h1mge"><br></br>Add a Payment</h1>

                <div className="containermge">
                    <form className="paymge" onSubmit={(e) => handleSubmit(e)}>
                        <br />
                        <label htmlFor="cname" className="labelmge1">IT Number:</label>
                        <input type="text" name="itnum" placeholder="IT12345678"  required className="textmge1" value={itnumber} onChange={(e)=>setItnumber(e.target.value)} /><br /><br />


                        <label id="totalA" name="totalA" className="labelmge1">Description:</label>
                        <input type="text" name="descriptions" placeholder="Class Name" pattern="[A-Za-z\s]+" required className="textmge3" value={description} onChange={(e)=>setDescription(e.target.value)}/><br /><br />

                        <label htmlFor="tda" className="labelmge1">Date:</label>
                        <input type="date" name="dates" placeholder="(DD/MM/YY)" value={date} required className="textmge4" onChange={(e)=>setDate(e.target.value)}/><br /><br />

                        <label id="totalA" name="totalA" className="labelmge1">Amount:</label>
                        <input type="text" name="amounts" placeholder="00.00" pattern="\d+(\.\d{2})?" required className="textmge5" value={amount} onChange={(e)=>setAmount(e.target.value)}/><br /><br />

                        <label id="totalA" name="totalA" className="labelmge1">Type:</label>
                        <input type="text" name="amounts" placeholder="00.00"  readOnly className="textmge6" value={type} onChange={(e)=>setType(e.target.value)}/><br /><br />

                        <label id="totalA" name="totalA" className="labelmge1">Status:</label>
                        <select name="status" className="textmge7" value={status} onChange={(e) => setStatus(e.target.value)}>
                        <option value="Pending">Pending</option>
                        <option value="Approved">Approved</option>
                        <option value="Rejected">Rejected</option>
                        </select>
                        <br /><br />

                        <br /><br />

                        <div className="containermge4">
                        <button type="submit" name="submit" className="buttonemge3">Save</button>
                        <button type="submit" name="submit" className="buttonemge4" 
                        onClick={handleCancel}
                        >Cancel</button>
                        </div>
                    </form>
                </div>
            </div>
    </div>
  )
}

export default Mgedit
