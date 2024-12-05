import React, { useEffect, useState } from 'react';
import './stwallet.css';
import axios from 'axios';
import Head from '../Header/Header';

function StWallet() {


  const[wallets , setwallet] = useState([]);

  // useEffect(()=>{
  //   axios.get('http://Localhost:5000/displaywallet')
  //   .then((res)=> {
  //     setwallet(res.data);
  //   })
  //   .catch((err) => console.error(err));
  // },[]);

  // const [subjects, setSubjects] = useState([]);

  useEffect(() => {
    axios.get('/studentprofile')
      .then((res) => {
        const stdid = res.data.stdid;
        axios.get('/displaywallet')
          .then((res) => {
            const walletid = res.data.filter(wallet => wallet.stdid === stdid);
            setwallet(walletid);
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <Head/>
       <div className="bodywa">
            <h1 className="h1wa"><br/>My Wallet</h1>

            <div className="containerwa">

            {wallets.map((wallet) =>(

                <form className="paywa">
                    <br /><br />
                    <label htmlFor="name" className="labelwa1">Student ID Number</label>
                    <br />
                    <input type="text" id="name1" className="textwa1"value={wallet.stdid} readOnly/>

                    <br /><br /><br />
                    <label htmlFor="itnum" className="labelwa1">Student Name</label>

                    <br />
                    <input type="text" id="name1" className="textwa1"value={wallet.studentname} readOnly/>
          
                    <br /><br /><br />
                    <label htmlFor="walletnum" className="labelwa1">Wallet Number</label>

                    <br />
                    <input type="text" id="name1" className="textwa1"value={wallet.walletid} readOnly/>

                    <br /><br /><br />
                    <label htmlFor="amount" className="labelwa1">Amount</label>

                    <br />
                    <input type="text" id="name1" className="textwa1"value={wallet.balance} readOnly/>
                    <br /><br />
                </form>

            ))}
            </div>
        </div>
    </div>
  )
}

export default StWallet
