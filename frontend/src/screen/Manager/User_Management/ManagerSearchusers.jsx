import React, { useEffect, useState } from 'react'
import './profile.css'
import axios from 'axios'
import Head from '../Header/Header';

function ManagerSearchusers() {

    //const [name, setName] = useState();    
    const [student, setStudent] = useState([]);   
    const [teacher, setTeacher] = useState([]);   
    const [searchstudent, setSearchStudent] = useState('');
    const [searchteacher, setSearchTeacher] = useState('');
    
    useEffect(() => {
        axios.get('/getstudentsadmin')
        .then((res) => setStudent(res.data))
        .catch((err) => {
            console.log(err);
        })
    }, [])

    useEffect(() => {
        axios.get('/getteachersadmin')
        .then((res) => setTeacher(res.data))
        .catch((err) => {
            console.log(err);
        })
    }, [])

    const studentrowCount = student.length;

    const teacherrowCount = teacher.length;

  return (
    <main>
        <Head/>
        <div className='profilecontent'> 
            <div>
                <br/>
                <p class='usertxt'>Student Details</p>
                <p class='usertxt'>Student count: {studentrowCount}</p>
                <div class="line1"></div>  
                <div>
                    <table>
                        <tr>
                            <td class="searchbarcol">
                                <input type="text" id="search" name="search" placeholder="Search..." class="searchbar" onChange={(e)=> setSearchStudent(e.target.value)}/>
                            </td>
                            {/* <td>
                            <button className='btnedit' type="submit">Search</button>
                            </td>*/}
                        </tr>
                    </table>   
                    <br/>
                    <div style={{ maxHeight: '220px', overflowY: 'scroll' }}>
                    <table className='searchtablemainmanager'>
                        <tr className='searchtablemainmanagerheader'>
                            <th>Student ID</th>
                            <th>Student Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Grade</th>
                            <th>Username</th>
                            <th>Gender</th>
                            <th>Parent name</th>
                            <th>Parent phonenumber</th>
                            <th>Security Answer</th>
                        </tr>
                        {student.filter((student) => {
                            return searchstudent.toLowerCase() === '' ? student : student.name.toLowerCase().includes(searchstudent)
                        }).map((student) => (
                            <tr className='searchtablemainadmindata'>
                                <td className='searchtabledata'>{student.stdid}</td>
                                <td className='searchtabledata'>{student.name}</td>
                                <td className='searchtabledata'>{student.email}</td>
                                <td className='searchtabledata'>{student.contactnumber}</td>
                                <td className='searchtabledata'>{student.grade}</td>
                                <td className='searchtabledata'>{student.username}</td>
                                <td className='searchtabledata'>{student.gender}</td>
                                <td className='searchtabledata'>{student.parentname}</td>
                                <td className='searchtabledata'>{student.parentphonenumber}</td>
                                <td className='searchtabledata'>{student.SecAnswer}</td>                                
                            </tr>
                        ))}

                    </table>        
                    </div>         
                </div>
                <br/>
                <p class='usertxt'>Teacher Details</p> 
                <p class='usertxt'>Teacher count: {teacherrowCount}</p>
                <div class="line1"></div> 
                <div>
                    <table>
                        <tr>
                            <td class="searchbarcol">
                                <input type="text" id="search" name="search" placeholder="Search..." class="searchbar" onChange={(e)=> setSearchTeacher(e.target.value)}/>
                            </td>
                            {/* <td>
                            <button className='btnedit' type="submit">Search</button>
                            </td>*/}
                        </tr>
                    </table>   
                    <br/>
                    <div style={{ maxHeight: '220px', overflowY: 'scroll' }}>
                    <table className='searchtablemainmanager'>
                        <tr className='searchtablemainmanagerheader'>
                            <th>Teacher ID</th>
                            <th>Teacher Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Username</th>
                            <th>Gender</th>  
                            <th>Subject</th>                            
                            <th>Security Answer</th>
                        </tr>
                        {teacher.filter((teacher) => {
                            return searchteacher.toLowerCase() === '' ? teacher : teacher.name.toLowerCase().includes(searchteacher)
                        }).map((teacher) => (
                            <tr className='searchtablemainadmindata'>
                                <td className='searchtabledata'>{teacher.teid}</td>
                                <td className='searchtabledata'>{teacher.name}</td>
                                <td className='searchtabledata'>{teacher.email}</td>
                                <td className='searchtabledata'>{teacher.contactnumber}</td>
                                <td className='searchtabledata'>{teacher.username}</td>
                                <td className='searchtabledata'>{teacher.gender}</td>  
                                <td className='searchtabledata'>{teacher.subject}</td>                                
                                <td className='searchtabledata'>{teacher.SecAnswer}</td>
                            </tr>
                        ))}

                    </table>       
                    </div>           
                </div>
                <br/><br/>
            </div>            
        </div>
    </main>
  )
}

export default ManagerSearchusers
