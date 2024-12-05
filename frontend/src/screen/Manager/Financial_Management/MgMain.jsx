import React from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import './mgmain.css';
import Head from '../Header/Header'

function MgMain() {

  const navigator = useNavigate();

  
  const handleClick1 = () => {
    toast.loading('loading...', {
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
        navigator('/mgpay');
      }, ); // Wait for 2 seconds before navigating
    }, 2000);
  };

  const handleClick2 = () => {
    toast.loading('loading...', {
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
        navigator('/mgview');
      }, ); // Wait for 2 seconds before navigating
    }, 2000);
  };

  const handleClick3 = () => {
    toast.loading('loading...', {
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
        navigator('/ManagerWallet');
      }, ); // Wait for 2 seconds before navigating
    }, 1000);
  };

  return (
    <div>
      <Head/>
      <Toaster />
      <div class="bodymag">
        <form class="mainmag">
   
          <button
            type="button"
            className="buttonmag"
            onClick={handleClick1}
          >Add a Payment</button>

 
          <button
            type="button"
            className="buttonmag"
           onClick={handleClick2}
          >
          
            View Payments
          </button>

          <button
            type="button"
            className="buttonmag"
            onClick={handleClick3}
          >Top up Wallet</button>

 
        </form>
      </div>
    </div>
  )
}

export default MgMain
