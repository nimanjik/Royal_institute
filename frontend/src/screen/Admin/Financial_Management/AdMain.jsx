import React from 'react';
import './admain.css';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import Head from '../Header/Header';


function AdMain() {
  const navigator = useNavigate();

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
        navigator('/adgenrate');
      }, ); // Wait for 2 seconds before navigating
    }, 2000);
  };


  return (
    <div>
      <Head/>
      <Toaster />
      <div class="bodyad">
        <form class="mainad">
       
          
          <button
            type="button"
            className="buttonad"
           onClick={handleClick2}
          >
            Generate Reports
          </button>
         
        </form>
      </div>
    </div>
  )
}

export default AdMain
