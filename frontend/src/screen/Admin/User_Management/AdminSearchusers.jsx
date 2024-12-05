import React, { useEffect, useState } from 'react'
import './profile.css'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Head from '../Header/Header';
import Swal from 'sweetalert2';

function AdminSearchusers() {
    const [, setName] = useState();    
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
    
    useEffect(()=>{
        axios.get('/adminprofile')
        .then((res)=>{
            setName(res.data.name);            
        })
        .catch((err)=>{
            console.log(err);
        })
    },[])

    const studentDelete = (id) =>{        
        Swal.fire({
            title: 'Are you sure?',
            text: "Are you sure you want to delete this user?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then((result) => {
            if (result.isConfirmed) {
                axios.delete('/deletestudent/'+id)
                .then((res) => {
                  console.log('success');
                  Swal.fire(
                    'Deleted!',
                    'User has been removed.',
                    'success'
                  ).then(() => {
                    window.location.reload(); // Reload the page after successful deletion
                  });
                })
                .catch((err) => {
                  console.error(err);
                  Swal.fire(
                    'Error!',
                    'An error occurred while deleting this user.',
                    'error'
                  );
                });
            }
          });
    }

    const teacherDelete = (id) =>{
        Swal.fire({
            title: 'Are you sure?',
            text: "Are you sure you want to delete this user?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then((result) => {
            if (result.isConfirmed) {
                axios.delete('/deleteteacher/'+id)
                .then((res) => {
                  console.log('success');
                  Swal.fire(
                    'Deleted!',
                    'User has been removed.',
                    'success'
                  ).then(() => {
                    window.location.reload(); // Reload the page after successful deletion
                  });
                })
                .catch((err) => {
                  console.error(err);
                  Swal.fire(
                    'Error!',
                    'An error occurred while deleting this user.',
                    'error'
                  );
                });
            }
          });
    }

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
                                <input type="text" id="search" name="search" placeholder="Search student name..." class="searchbar" onChange={(e)=> setSearchStudent(e.target.value)}/>
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
                                <td>
                                    <Link to={`/updatestudent/${student.stdid}`}>
                                        <button className='btnupdate' >Update</button>                                       
                                    </Link>
                                </td>
                                <td><button className='btndelete' onClick={(e) => studentDelete(student._id)}>Delete</button></td>
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
                                <input type="text" id="search" name="search" placeholder="Search teacher name..." class="searchbar" onChange={(e)=> setSearchTeacher(e.target.value)}/>
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
                                <td>
                                    <Link to={`/updateteacher/${teacher.teid}`}>
                                        <button className='btnupdate' >Update</button>                                       
                                    </Link>
                                </td>
                                <td><button className='btndelete' onClick={(e) => teacherDelete(teacher._id)}>Delete</button></td>
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

export default AdminSearchusers
