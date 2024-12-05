import React, { useEffect } from 'react';
import {useParams} from 'react-router-dom';
import  { useState } from 'react';
import './stcancelonline.css';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import Swal from 'sweetalert2';
import Head from '../Header/Header';


function StCancelOnline() {
    const { id } = useParams();
    const [itnumber, setItnumber] = useState();
    /* const [cardname, setCardname] = useState();
    const [cardnumber, setCardnumber] = useState();
    const [securitycode, setSecuritycode] = useState();
    const [expiredate, setExpiredate] = useState(); */
    const [discription, setDiscription] = useState();
    const [date, setDate] = useState();
    const [amount, setAmount] = useState();
    const [balance, setBalance] = useState();
    const [walletId] = useState('6623e88bc9a8a220af8c0916'); // Set the wallet ID here
    const navigator = useNavigate();

    const [name, setName] = useState();

  useEffect(()=>{
    axios.get('/studentprofile')
    .then((res)=>{
        setName(res.data.name);            
    })
    .catch((err)=>{
        console.log(err);
    })
  },[])
  
    useEffect(() => {
      axios.get('http://Localhost:5000/getpayment/' + id)
        .then((res) => {
          setItnumber(res.data.itnumber);
         /*  setCardname(res.data.cardname);
          setCardnumber(res.data.cardnumber);
          setSecuritycode(res.data.securitycode);
          setExpiredate(res.data.expiredate); */
          setDiscription(res.data.description);
          setDate(res.data.date);
          setAmount(res.data.amount);
        })
        .catch((err) => console.error(err));
    }, [id]);
  
    useEffect(() => {
      axios.get(`http://Localhost:5000/getwallet/${walletId}`)
        .then((res) => {
          setBalance(res.data.balance);
        })
        .catch((err) => console.error(err));
    }, [walletId]);
  
    const update = (e) => {
      e.preventDefault();
      axios.put('http://Localhost:5000/updatepayment/' + id, { amount: amount })
        .then(res => {
          console.log(res);
        })
        .catch(err => console.error(err));
    }
  
    const updatewallet = (e) => {
      e.preventDefault();
      const updatedAmount = parseInt(balance) + parseInt(amount);
      axios.put(`http://Localhost:5000/updatewallet/${walletId}`, { balance: updatedAmount })
        .then(res => {
          console.log(res);
          update(e);
        })
        .catch(err => console.error(err));
    }
  
    const handleSubmit = (e) => {
      e.preventDefault();
      Swal.fire({
        title: "Cancel Payment",
        text: "Are you sure you want to cancel the payment?",
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, proceed!",
        cancelButtonText: "Cancel",
      }).then((result) => {
        if (result.isConfirmed) {
          updatewallet(e); // Call submit function if result is confirmed
          Swal.fire({
            title: "Payment is Canceled",
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
      toast.loading('Payment is canceling...', {
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
          toast.success('Wallet is Updated!', {
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
      <div className="bodycon">
        
            <h1 className="conh1"><br></br>Cancel Payment</h1>
            <div className="containercon">
            <form className="paycon" 
            onSubmit={handleSubmit}
            >

            <h2 className="conh2"><br></br>Payment Details</h2><br/>
                    <label className="labelcon1"> Enter IT Number :</label><br/>
                    <input type="text" name="itnum" placeholder="IT12345678" readOnly  required className="textcon1" value={itnumber}  /><br /><br />


                    <label htmlFor="totalA" className="labelcon1">Enter Description:</label><br />
                    <input type="text" name="description" placeholder="Class Name" readOnly required className="textcon7" value={discription} /><br /><br />

                    <label htmlFor="tda" className="labelcon2">Enter Date:</label><br />
                    <input type="date" name="date" placeholder="(DD/MM/YYYY)" readOnly  required className="textcon5" value={date} /><br /><br />

                    <label htmlFor="totalA" className="labelcon2">Enter Amount:</label><br />
                    <input type="text" name="amount" placeholder="00.00" readOnly required className="textcon6"  value={amount} /><br /><br />
                    
                    {/* div className="paycon2" >
                      <h2 className="conh2"><br></br>Card Details</h2><br/>
                    <label htmlFor="an" className="labelcon2">Name On the Card</label>
                    <input type="text" name="cname" placeholder="Enter Name" pattern="[A-Za-z\s]+" required className="textcon2" value={cardname} /> <br /><br />

                    <label htmlFor="an" className="labelcon2">Card Number</label><br />
                    <input type="text" name="cnum" placeholder="xxxxxxxxxx" pattern="^\d{16}$" required className="textcon3" value={cardnumber}  /> <br /><br />

                    <label htmlFor="tda" className="labelcon2">Expire Date</label>
                    <label htmlFor="cno" className="labelcon3">Security Code</label><br/>
                    <input type="text" name="exdate" placeholder="(MM/YY)" pattern="(0[1-9]|1[0-2])\/\d{2}" required className="textcon8" value={expiredate}/>
                    <input type="text" name="scode" placeholder="***" pattern="^\d{3}$" required className="textcon4" value={securitycode}  /><br /><br />
 */}

                    <div className="containercon4"> 
                        <button type="submit" name="submit" className="buttoncon3">Save</button>
                        <button type="submit" name="submit" className="buttoncon4" 
                       onClick={handleCancel}
                        >Cancel</button>
                    </div>
                    {/* </div> */}
                </form>
                
            </div>
        </div>
    </div>


    </div>
  )
}

export default StCancelOnline
