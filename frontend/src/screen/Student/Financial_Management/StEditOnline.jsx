import React, { useEffect } from 'react';
import {useParams} from 'react-router-dom';
import  { useState } from 'react';
import './steditonline.css';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import Swal from 'sweetalert2';
import Head from '../Header/Header';


function StEditOnline() {

  const {id} = useParams();
  const[itnumber,setItnumber] = useState();
 /*  const[cardname,setCardname] = useState();
  const[cardnumber,setCardnumber] = useState();
  const[securitycode,setSecuritycode] = useState();
  const[expiredate,setExpiredate] = useState(); */
  const[discription,setDiscription] = useState();
  const[date,setDate] = useState();
  const[amount,setAmount] = useState();
  const navigator = useNavigate();


  useEffect(()=>{
      axios.get('http://Localhost:5000/getpayment/' +id)
      .then((res)=>{
        setItnumber(res.data.itnumber);
        /* setCardname(res.data.cardname);
        setCardnumber(res.data.cardnumber);
        setSecuritycode(res.data.securitycode);
        setExpiredate(res.data.expiredate); */
        setDiscription(res.data.description);
        setDate(res.data.date);
        setAmount(res.data.amount);

      })
      .catch((err) => console.error(err));
  },[id]);


  const update = (e) =>{
    e.preventDefault();
    axios.put('http://Localhost:5000/updatepayment/'+id,{itnumber:itnumber , description:discription,
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
        update(e); // Call submit function if result is confirmed
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
          navigator('/viewonline');
        }, 2500); // Wait for 2 seconds after displaying success toast before navigating
      }, 2500); // Wait for 2 seconds after dismissing loading toast before displaying success toast
    }, 5000); // Wait for 5 seconds before dismissing loading toast
  };

  const handleCancel = () => {
    navigator('/viewonline');
  }
  
  return (
    <div>
     <Head/>
       <div>
       <Toaster/>
      <div className="bodyeon">
        
            <h1 className="eonh1"><br></br>Edit Payment</h1>
            <div className="containereon">
            <form className="payeon" 
            onSubmit={handleSubmit}
            >

            <h2 className="eonh2"><br></br>Payment Details</h2><br/>
                    <label className="labeleon1"> Enter IT Number :</label><br/>
                    <input type="text" name="itnum" placeholder="IT12345678"  readOnly required className="texteon1" value={itnumber} onChange={(e)=>setItnumber(e.target.value)} /><br /><br />


                    <label htmlFor="totalA" className="labeleon1">Enter Description:</label><br />
                    <input type="text" name="description" placeholder="Class Name" pattern="[A-Za-z\s]+" required className="texteon7" value={discription} onChange={(e)=>setDiscription(e.target.value)}/><br /><br />

                    <label htmlFor="tda" className="labeleon2">Enter Date:</label><br />
                    <input type="date" name="date" placeholder="(DD/MM/YYYY)"  readOnly className="texteon5" value={date} onChange={(e)=>setDate(e.target.value)}/><br /><br />

                    <label htmlFor="totalA" className="labeleon2">Enter Amount:</label><br />
                    <input type="text" name="amount" placeholder="00.00" readOnly required className="texteon6"  value={amount} onChange={(e)=>setAmount(e.target.value)}/><br /><br />
                    
                    {/* <div className="payeon2" >
                      <h2 className="eonh2"><br></br>Card Details</h2><br/>
                    <label htmlFor="an" className="labeleon2">Name On the Card</label>
                    <input type="text" name="cname" placeholder="Enter Name" pattern="[A-Za-z\s]+" required className="texteon2" value={cardname} onChange={(e)=>setCardname(e.target.value)}/> <br /><br />

                    <label htmlFor="an" className="labeleon2">Card Number</label><br />
                    <input type="text" name="cnum" placeholder="xxxxxxxxxx" pattern="^\d{16}$" required className="texteon3" value={cardnumber} onChange={(e)=>setCardnumber(e.target.value)} /> <br /><br />

                    <label htmlFor="tda" className="labeleon2">Expire Date</label>
                    <label htmlFor="cno" className="labeleon3">Security Code</label><br/>
                    <input type="text" name="exdate" placeholder="(MM/YY)" pattern="(0[1-9]|1[0-2])\/\d{2}" required className="texteon8" value={expiredate} onChange={(e)=>setExpiredate(e.target.value)}/>
                    <input type="text" name="scode" placeholder="***" pattern="^\d{3}$" required className="texteon4" value={securitycode} onChange={(e)=>setSecuritycode(e.target.value)} /><br /><br />
 */}

                    <div className="containereon4"> 
                        <button type="submit" name="submit" className="buttoneon3">Save</button>
                        <button type="submit" name="submit" className="buttoneon4" 
                        onClick={handleCancel}
                        >Cancel</button>
                    </div>
                  {/*   </div> */}
                </form>
                
            </div>
        </div>
    </div>


    </div>
  )
}

export default StEditOnline
