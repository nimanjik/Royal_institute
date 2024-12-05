import Nav from '../NavBar/Nav';
import logo from '../photos/logofull.png'
import userpng from '../photos/User.png'
import React, { useState ,useEffect } from 'react';
import axios from 'axios';

function Header() {

    const [name, setName] = useState();
    const [grade, setGrade] = useState();

    useEffect(()=>{
      axios.get('/studentprofile')
      .then((res)=>{
          setName(res.data.name);  
          setGrade(res.data.grade);           
      })
      .catch((err)=>{
          console.log(err);
      })
    },[])

    
  return (
    <div>
        <Nav/>
      <div className="container"> 
      <div className='profilecontent'  >
      <table>
                    <tr>
                        <td className='tbllogo'>
                            <img src={logo} alt='logo'/>
                        </td>
                        <td>
                            <p class='hellotxt'><b>Hello, {name}<br/>Grade {grade}</b><br/>Student</p>
                        </td>
                        <td>
                            <img src={userpng} alt='logo' class='hellopic'/>
                        </td>
                    </tr>
                </table>
                </div>  
                </div>
       <div></div>
    </div>
  )
}

export default Header
