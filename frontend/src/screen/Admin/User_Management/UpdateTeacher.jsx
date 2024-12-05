import React, { useEffect, useState } from 'react'
import './profile.css';
import axios from 'axios';
import userpng from './photos/User.png'
import { Link, useNavigate, useParams } from 'react-router-dom';
import Head from '../Header/Header';
import Swal from 'sweetalert2';

function UpdateTeacher() {
    const navigate = useNavigate();    
    const [tid, setTid] = useState();
    const [name, setName] = useState();
    const [teid, setteid] = useState();
    const [username, setUsername] = useState();
    const [gender, setGender] = useState();
    const [email, setEmail] = useState();
    const [contactnumber, setContactnumber] = useState();
    const [subject, setSubject] = useState();
    const [secanswer, setSecAnswer] = useState();
    const { id } = useParams();
    // const [password, setPassword] = useState();
    // const [repassword, setRepassword] = useState();

    useEffect(()=>{
        axios.get(`/teacherprofileid/${id}`)
        .then((res)=>{
            setTid(res.data._id);
            setName(res.data.name);
            setteid(res.data.teid);
            setUsername(res.data.username);    
            setGender(res.data.gender);        
            setEmail(res.data.email);
            setContactnumber(res.data.contactnumber);
            setSubject(res.data.subject);
            setSecAnswer(res.data.SecAnswer);  
        })
        .catch((err)=>{
            console.log(err);
        })
    },[])

    const updateStudent = async (e) => {
        e.preventDefault();
       
        try {
            await axios.put(`/teacherprofileeditid/${tid}`, {
                name: name,
                username: username,
                gender: gender,
                email: email,
                contactnumber: contactnumber,
                subject: subject,
                SecAnswer: secanswer,
            })
      
            await Swal.fire({
              icon: 'success',
              title: 'Success',
              text: 'Teacher details updated successfully!',
              confirmButtonText: 'OK'
            });
            navigate('/searchusersadmin');
          } catch (error) {
            console.error(error);
      
            await Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'An error occurred while adding teacher details. Please try again later.',
              confirmButtonText: 'OK'
            });
          }

    }


    
  return (
    <main>
         <Head/>
        <div className='profilecontent'>
            
            <div>
                 
                <p class='usertxt'>User Profile</p> 
                <div class="line1"></div>  
                <table>
                    <tr>
                        <td>
                            <img src={userpng} alt='logo'/>
                        </td>
                        <td>
                            <p class='hellotxt'>{name}<br/>{teid}<br/>Teacher</p>
                        </td>
                        {/* <td>
                           <form > 
                                <button className='btnup' type="submit">Upload New Profile Photo </button>
                           </form>
                        </td>
                        <td>
                            <button className='btnedit' type="submit">Delete Profile Photo</button>
                        </td> */}
                    </tr>
                </table> 
                <div class="updateform">
                <form onSubmit={updateStudent}>
                    <div class="line"></div>   
                    <p class='userprofiletxt'>Full name</p>  
                    <input type="text" id="name" name="name" class="profileboxshow" value={name} onChange={(e) => setName(e.target.value)} />  
                    <p class='userprofiletxt'>Username</p>  
                    <input type="text" id="username" name="username" class="profileboxshow" value={username} onChange={(e) => setUsername(e.target.value)}/> 
                    <p class='userprofiletxt'>Gender</p>  
                    <table class='gendertbl'>
                        <tr>
                            <td>
                            <input type="radio" id="gender" name="gender" value="Male" checked={gender === 'Male'} onChange={(e) => setGender(e.target.value)} />
                            </td>
                            <td>
                                <p class='gendertxt'>Male</p>
                            </td>  
                            <td>
                            <input type="radio" id="gender" name="gender" value="Female" checked={gender === 'Female'} onChange={(e) => setGender(e.target.value)} />
                            </td>
                            <td>
                                <p class='gendertxt'>Female</p>
                            </td>
                        </tr>
                    </table>
                    <div class="line"></div>
                    <table>
                        <tr>
                            <td className='conatctcol'>
                                <p class='userprofiletxt'>Email Address</p>  
                                <input type="text" id="email" name="email" class="profileboxshow" value={email} onChange={(e) => setEmail(e.target.value)}/>  
                            </td>
                            <td>
                                <p class='userprofiletxt'>Phone Number</p>  
                                <input type="number" id="cnumber" name="cnumber" class="profileboxshow" value={contactnumber} onChange={(e) => setContactnumber(e.target.value)}/>  
                            </td>
                        </tr>
                    </table>
                    <br/>
                    <div class="line"></div>
                    <table>
                        <tr>                            
                            <td>
                                <p class='userprofiletxt'>Subject</p>  
                                <input type="text" id="subject" name="subject" class="profileboxshow" value={subject} onChange={(e) => setSubject(e.target.value)}/>  
                            </td>
                        </tr>
                    </table>
                    <br/>
                    <div class="line"></div>
                    <p class='userprofiletxt'>Security Question - What city were you born in?</p>  
                    <input type="text" id="qans" name="qans" class="profileboxshow" value={secanswer} onChange={(e) => setSecAnswer(e.target.value)}/>  
                    <br/><br/>
                    {/* <div class="line"></div>
                    <p class='userprofiletxt'>New Password</p>  
                    <input type="text" id="npassword" name="npassword"  class="profileboxshow" value={password} onChange={(e) => setPassword(e.target.value)}/>
                    <p class='userprofiletxt'>Confirm New Password</p>  
                    <input type="text" id="cnpassword" name="cnpassword"  class="profileboxshow" value={repassword} onChange={(e) => setRepassword(e.target.value)}/>
                    <br/><br/> */}
                    <table>
                        <tr>
                            <td>
                                <button className='btnedit' type="submit">Save changes</button> 
                            </td>
                            <td>                                 
                                <Link to={'/searchusersadmin'}><button className='btnedit' >Cancel</button> </Link>      
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

export default UpdateTeacher
