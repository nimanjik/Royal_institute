import './stmain.css';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate} from 'react-router-dom';
import React, { useState ,useEffect } from 'react';
import Head from '../Header/Header';


function StMain() {
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
        navigator('/payonline');
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
        navigator('/viewonline');
      }, ); // Wait for 2 seconds before navigating
    }, 2000);
  };


  return (

    
    <div>
      <Head/>
      <Toaster />
      <div className="bodyst">
        <form className="mainst">
          <button
            type="button"
            className="buttonstma"
            onClick={handleClick1}
          >
            Make a Payment
          </button>
    
          <button
            type="button"
            className="buttonstma"
            onClick={handleClick2}
          >
              View Payments
            </button>
         
        </form>
      </div>
    </div>
    
  );
}

export default StMain;
