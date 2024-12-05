import React, { useState, useEffect  } from 'react';
import { Link , useParams} from 'react-router-dom';
import './stpaymentbank.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import Swal from 'sweetalert2';
import Head from '../Header/Header';

function StPaymentBank() {
  const status = 'Pending';
  const type = 'Bank';

  const [upload_files, setUpload_Files] = useState(null);
  const [, setItnumber] = useState('');
  const [accountname, setAccountname] = useState('');
  const [accountnumber, setAccountnumber] = useState('');
  const [bankname, setBankname] = useState('');
  const [, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [, setAmount] = useState('');
  const navigator = useNavigate();

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

  const submit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', upload_files);
    formData.append('itnumber', idnumber);
    formData.append('accountname', accountname);
    formData.append('accountnumber', accountnumber);
    formData.append('bankname', bankname);
    formData.append('description', subname);
    formData.append('date', date);
    formData.append('amount', subamount);
    formData.append('status', status);
    formData.append('type', type);

    axios.post('http://localhost:5000/createbank', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .then(res => {
      console.log(res);
    })
    .catch(err => console.error(err));
  };

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
    
      }
    });
  };

  const handleClick2 = () => {
    toast.loading('Payment is processing...', {
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
        toast.success('Payment is completed!', {
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
          navigator('/test');
        }, 2500);
      }, 2500);
    }, 5000);
  };

  const [idnumber, setName] = useState();

  useEffect(()=>{
    axios.get('/studentprofile')
    .then((res)=>{
        setName(res.data.stdid);         
    })
    .catch((err)=>{
        console.log(err);
    })
  },[])


  const [subname, setSubName] = useState('');
  const [subamount, setSubAmount] = useState('');
  const { subid } = useParams(); // Get the subid from the URL params

  useEffect(() => {
    axios.get(`/getSubject/${subid}`)
      .then((res) => {
        setSubName(res.data.subjectname);
        setSubAmount(res.data.amount);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [subid]); // Include subid in the dependency array

  return (
    <div>
      <Head />
      <Toaster />
      <div className="bodyba">
        <h1 className="bah1">
          <br />
          Payment Form
        </h1>

        <Link to={`/payonline/${subid}`}>
          <button type="submit" name="makepayment" className="buttonba1">
            Online
          </button>
        </Link>
        <br />
        <button type="submit" name="viewpayment" className="buttonba2">
          Bank Deposit
        </button>

        <div className="containerba">
          <form className="payba" onSubmit={handleSubmit}>
            <h2 className="onh2">
              <br />
              Payment Details
            </h2>
            <br />

            <label htmlFor="cname" className="labelba1">
              Enter IT Number:
            </label>
            <br />
            <input
              type="text"
              name="itnum"
              placeholder="IT12345678"
              pattern="^IT\d{8}$"
              value={idnumber}
            readOnly
              className="textba1"
              onChange={(e) => setItnumber(e.target.value)}
            />
            <br />
            <br />

            <label htmlFor="an" className="labelba1">
              Enter Account Name:
            </label>
            <br />
            <input
              type="text"
              name="acname"
              placeholder="Enter Name"
              pattern="[A-Za-z\s]+"
              required
              className="textba2"
              onChange={(e) => setAccountname(e.target.value)}
            />{' '}
            <br />
            <br />

            <label htmlFor="an" className="labelba1">
              Enter Account Number:
            </label>
            <br />
            <input
              type="text"
              name="acnum"
              placeholder="xxxxxxxxxx"
              pattern="[0-9]+"
              required
              className="textba3"
              onChange={(e) => setAccountnumber(e.target.value)}
            />{' '}
            <br />
            <br />

            <label htmlFor="cno" className="labelba1">
              Enter Bank Name:
            </label>
            <br />
            <input
              type="text"
              name="bname"
              placeholder="Enter Bank Name"
              pattern="[A-Za-z\s]+"
              required
              className="textba4"
              onChange={(e) => setBankname(e.target.value)}
            />
            <br />
            <br />

            <label htmlFor="totalA" className="labelba1">
              Enter Description:
            </label>
            <br />
            <input
              type="text"
              name="descriptions"
              placeholder="Class Name"
              pattern="[A-Za-z\s]+"
              value={subname}
              readOnly
              className="textba7"
              onChange={(e) => setDescription(e.target.value)}
            />
            <br />
            <br />

            <label htmlFor="tda" className="labelba1">
              Enter Date:
            </label>
            <br />
            <input
              type="date"
              name="dates"
              placeholder="(DD/MM/YY)"
              value={date}
              readOnly
              className="textba5"
              onChange={(e) => setDate(e.target.value)}
            />
            <br />
            <br />

            <label htmlFor="totalA" className="labelba1">
              Enter Amount:
            </label>
            <br />
            <input
              type="text"
              name="amounts"
              placeholder="00.00"
              pattern="\d+(\.\d{2})?"
              value={subamount}
              readOnly
              className="textba6"
              onChange={(e) => setAmount(e.target.value)}
            />
            <br />
            <br />
            <br />

            <div className='payba2'>
              <label htmlFor="fileInput">
                <input
                  id="fileInput"
                  type="file"
                  accept=".pdf, .png, .jpg, .jpeg"
                  required
                  className='upload'
                  onChange={(e) => setUpload_Files(e.target.files[0])}
                />
            
              </label>
              </div>
            <div >
              <br />
              <br />
              <input 
                type="checkbox"
                id="terms"
                name="terms"
                value="accepted"
                className="checkbox-textpa"
                required
              />
              
              <label htmlFor="terms" className="checkbox-labelpa">
                I accept the terms and conditions
              </label>
              <br />
              <br />
              
              <br />
              <br />
              <button type="submit" name="submit" className="buttonba3">
                Pay Now
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default StPaymentBank;
