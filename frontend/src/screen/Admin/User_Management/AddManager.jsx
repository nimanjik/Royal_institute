import React, { useState } from 'react';
import './profile.css'
import userpng from './photos/User.png'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom'
import toast from 'react-hot-toast';
import Head from '../Header/Header';
import Swal from 'sweetalert2';

function AddManager() {
    const navigate = useNavigate();
    const [data, setData] = useState({
        name: '',
        username: '',
        // gender: '',
        email: '',
        contactnumber: '',
        // subject: '',
        SecAnswer: '',
        password: '',
        repassword: ''
    })

    const addManager = async (e) => {
        e.preventDefault();
        if (data.password !== data.repassword) {
          toast.error('Passwords do not match');
          return;
        }else{
          const { name, username, email, contactnumber, SecAnswer, password } = data;
        try {
          const {data} = await axios.post('/managerregister', { name, email, contactnumber, username, password, SecAnswer });
          if(data.error){
            toast.error(data.error);
          }else{
            setData({})
            await Swal.fire({
                icon: 'success',
                title: 'Success',
                text: 'Manager details updated successfully!',
                confirmButtonText: 'OK'
              });
            navigate('/adminprofile');
          }
        } catch (error) {
          console.log(error);

          await Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'An error occurred while adding manager details. Please try again later.',
            confirmButtonText: 'OK'
          });
        }
        }
    }
   

  return (
    <main>
         <Head/>
        <div className='profilecontent'>
            
            <div>                 
                <p class='usertxt'>Add Manager</p> 
                <div class="line1"></div>  
                <table>
                    <tr>
                        <td>
                            <img src={userpng} alt='logo'/>
                        </td>
                        <td>
                            <p class='hellotxt'>Manager</p>
                        </td>
                        {/* <td>
                           <form > 
                                <button className='btnup' type="submit">Upload New Profile Photo </button>
                           </form>
                        </td>   */}
                    </tr>
                </table> 
                <div class="updateform">
                <form onSubmit={addManager}>
                    <div class="line"></div>   
                    <p class='userprofiletxt'>Full name</p>  
                    <input type="text" id="name" name="name" class="profileboxshow" value={data.name} onChange={(e) => setData({...data, name: e.target.value})} />  
                    <p class='userprofiletxt'>Username</p>  
                    <input type="text" id="username" name="username" class="profileboxshow" value={data.username} onChange={(e) => setData({...data, username: e.target.value})}/> 
                    {/* <p class='userprofiletxt'>Gender</p>   */}
                    {/* <table class='gendertbl'>
                        <tr>
                            <td>
                                <input type="radio" id="gender" name="gender" value="Male" onChange={(e) => setData({...data, gender: e.target.value})}/>
                            </td>
                            <td>
                                <p class='gendertxt'>Male</p>
                            </td>  
                            <td>
                                <input type="radio" id="gender" name="gender" value="Female" onChange={(e) => setData({...data, gender: e.target.value})}/>
                            </td>
                            <td>
                                <p class='gendertxt'>Female</p>
                            </td>
                        </tr>
                    </table> */}
                    <br/> <br/> 
                    <div class="line"></div>
                    <table>
                        <tr>
                            <td className='conatctcol'>
                                <p class='userprofiletxt'>Email Address</p>  
                                <input type="email" id="email" name="email" class="profileboxshow" value={data.email} onChange={(e) => setData({...data, email: e.target.value})}/>  
                            </td>
                            <td>
                                <p class='userprofiletxt'>Phone Number</p>  
                                <input type="number" id="cnumber" name="cnumber" class="profileboxshow" value={data.contactnumber} onChange={(e) => setData({...data, contactnumber: e.target.value})}/>  
                            </td>
                        </tr>
                    </table>
                    <br/>
                    {/* <div class="line"></div> */}
                    {/* <table>
                        <tr>
                            <td className='conatctcol'>
                                <p class='userprofiletxt'>Subject</p>  
                                <input type="text" id="subject" name="subject" class="profileboxshow" value={data.subject} onChange={(e) => setData({...data, subject: e.target.value})}/>  
                            </td>
                            <td>
                                <p class='userprofiletxt'>Parent Phone Number</p>  
                                <input type="number" id="pcnumber" name="pcnumber" class="profileboxshow" value={parentphonenumber} onChange={(e) => setParentPhonenumber(e.target.value)}/>  
                            </td>
                        </tr>
                    </table> */}
                    <br/>
                    <div class="line"></div>
                    <p class='userprofiletxt'>Security Question - What city were you born in?</p>  
                    <input type="text" id="qans" name="qans" class="profileboxshow" value={data.SecAnswer} onChange={(e) => setData({...data, SecAnswer: e.target.value})}/>  
                    <br/><br/>
                    <div class="line"></div>
                    <p class='userprofiletxt'>Password</p>  
                    <input type="password" id="npassword" name="npassword"  class="profileboxshow" value={data.password} onChange={(e) => setData({...data, password: e.target.value})}/>
                    <p class='userprofiletxt'>Re-enter Password</p>  
                    <input type="password" id="cnpassword" name="cnpassword"  class="profileboxshow" value={data.repassword} onChange={(e) => setData({...data, repassword: e.target.value})}/>
                    <br/><br/>
                    <table>
                        <tr>
                            <td>
                                <button className='btnedit' type="submit">Add User</button> 
                            </td>
                            <td>                                 
                                <Link to={'/adminprofile'}><button className='btnedit' >Cancel</button> </Link>      
                            </td>
                        </tr>
                    </table>
                </form>
                </div> 
            </div>            
        </div>
    </main>
  )
}

export default AddManager
