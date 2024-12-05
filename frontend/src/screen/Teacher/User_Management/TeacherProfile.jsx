import React, { useEffect, useState } from 'react'
import './profile.css'
import user from './photos/User.png'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Head from '../Header/Header'

function TeacherProfile() {

    const [name, setName] = useState();
    const [teid, setteid] = useState();
    const [username, setUsername] = useState();
    const [email, setEmail] = useState();
    const [contactnumber, setContactnumber] = useState();
    const [gender, setGender] = useState();
    const [subject, setSubject] = useState();
    const [secanswer, setSecAnswer] = useState();

    useEffect(()=>{
        axios.get('/teacherprofile')
        .then((res)=>{
            setName(res.data.name);
            setteid(res.data.teid);
            setUsername(res.data.username);
            setEmail(res.data.email);
            setContactnumber(res.data.contactnumber);
            setGender(res.data.gender);
            setSubject(res.data.subject);            
            setSecAnswer(res.data.SecAnswer);  
        })
        .catch((err)=>{
            console.log(err);
        })
    },[])

   
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
                            <img src={user} alt='logo'/>
                        </td>
                        <td>
                            <p class='hellotxt'>{name}<br/>{teid}<br/>Teacher</p>
                        </td>
                        <td>
                             <Link to={'/teacherprofileedit'}><button className='btnedit' type="submit">Edit Button</button> </Link>
                        </td>
                    </tr>
                </table>  
                <div class="line"></div>   
                <p class='userprofiletxt'>Full name</p>  
                <div className='profilebox'>{name}</div>
                <p class='userprofiletxt'>Username</p>  
                <div className='profilebox'>{username}</div> 
                <p class='userprofiletxt'>Gender</p>  
                <div className='profilebox'>{gender}</div>
                <br/>
                <div class="line"></div>
                <table>
                    <tr>
                        <td className='conatctcol'>
                            <p class='userprofiletxt'>Email Address</p>  
                            <div className='profilebox'>{email}</div>  
                        </td>
                        <td>
                            <p class='userprofiletxt'>Phone Number</p>  
                            <div className='profilebox'>{contactnumber}</div>
                        </td>
                    </tr>
                </table>
                <br/>
                <div class="line"></div>
                <table>
                    <tr>                        
                        <td>
                            <p class='userprofiletxt'>Subject</p>  
                            <div className='profilebox'>{subject}</div>  
                        </td>
                    </tr>
                </table>
                <br/>
                <div class="line"></div>
                <p class='userprofiletxt'>Security Question - What city were you born in?</p>  
                <div className='profilebox'>{secanswer}</div> 
                <br/>
                <div class="line"></div>                
                <br/>
            </div>            
        </div>
    </main>
  )
}

export default TeacherProfile
