import React, { useState  } from 'react';
import './mangerwaller.css';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import Swal from 'sweetalert2';
import Head from '../Header/Header';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

function ManagerWallet() {
    const [itnumber, setItnumber] = useState('');
    const [walletId, setWalletId] = useState([]);
    const [date, setDate] = useState('');
    // const [amount, setAmount] = useState('');
    const navigator = useNavigate();

  
    const handleSubmit = (e) => {
        e.preventDefault();
        Swal.fire({
            title: "Confirm Payment",
            text: "Are you sure you want to create wallet?",
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, proceed!",
            cancelButtonText: "Cancel",
        }).then((result) => {
            if (result.isConfirmed) {
                //submit(e);
                Swal.fire({
                    title: "Wallet is Created",
                    icon: "success",
                });
                handleClick2();
            } else {
                Swal.fire({
                    title: "Wallet is Canceled",
                    icon: "error",
                });
            }
        });

       
    };

    const handlesearch = (e) => {
        e.preventDefault();
       
            axios.get('http://localhost:5000/displaywallet')
              .then(res => {
            const wallet = res.data.filter(wallet =>
                wallet.stdid === itnumber
            );
            setWalletId(wallet);
              })
              .catch(err => console.error(err));
           
    }    

    const handleClick2 = () => {
        toast.loading('Wallet is processing...', {
            style: {
                background: 'black',
                color: '#ffffff',
                borderRadius: '10px',
                border: '2px solid #ffffff',
            },
        });
        setTimeout(() => {
            toast.dismiss();
            setTimeout(() => {
                toast.success('Wallet is completed!', {
                    style: {
                        background: '#28a745',
                        color: '#ffffff',
                        borderRadius: '10px',
                        border: '2px solid #ffffff',
                    },
                    duration: 2000,
                    iconTheme: {
                        primary: '#ffffff',
                        secondary: '#28a745',
                    },
                });
                setTimeout(() => {
                    navigator('/managerfinancial'); // Correct the usage of navigator
                }, 2500);
            }, 2500);
        }, 5000);
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
    <Head />
    <Toaster />
    <div className="bodymgwa">
        <h1 className="h1mgwa"><br />Wallet</h1>
        <div className="containermgpa">

            <form onSubmit={handlesearch}>
                <label htmlFor="cname" className="labelmgwa1">Enter IT Number:</label><br />
                <input type="text" name="itnum" placeholder="SID123456" required className="textmgwa1" onChange={(e) => setItnumber(e.target.value)} />
                <button type="submit" name="submit" className="buttonmgwa3">Search</button>
            </form>

                         
              
                {walletId.map((wall) => (
                <div key={wall._id}>
                    <form className="paymgpa" onSubmit={handleSubmit} >
                         <br />  
                    <label htmlFor="an" className="labelmgwa1">Enter wallet Id:</label><br />
                    <input type="text" name="sname" placeholder="Enter Name" required className="textmgwa1" value={wall.walletid} readOnly/><br /><br />
                    <label htmlFor="tda" className="labelmgwa1">Enter Date:</label><br />
                    <input type="date" name="dates" placeholder="(DD/MM/YY)" value={date} readOnly className="textmgwa4" /><br /><br />
                    <label id="totalA" name="totalA" className="labelmgwa1">Enter Amount:</label><br />
                    <input type="text" name="amounts" placeholder="00.00" pattern="\d+(\.\d{2})?" required className="textmgwa5" value={wall.balance} readOnly /><br /><br />
                    <div className="containermgwa4">
                    <button type="submit" name="submit" className="buttonmgwa3">Confirm</button>
                    </div>
                    </form>
                </div>
                ))}
                
            
        </div>
    </div>
</div>
  )
}

export default ManagerWallet