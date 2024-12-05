import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Head from '../Header/Header';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import '../../../styles/Sasi.css';
import { toast } from 'react-hot-toast';
// import {useNavigate} from 'react-router-dom';

function MyClass() {
    const [enrolledClasses, setEnrolledClasses] = useState([]);
    const [, setUsername] = useState();
   
    useEffect(() => {
        axios.get('/studentprofile')
            .then((res) => {
                setUsername(res.data.username);
                
                const studentId = res.data.username; 
                console.log('Student enrolled successfully:', res.data);
                fetchEnrolledClasses(studentId);
            })
            .catch((err) => {
                console.log(err);
                toast.error();
            });
    }, []);

    const pay=()=>{
        toast.error("SORRY ,FUNCTION IS NOT AVAILABLE YET !");

    };

    const fetchEnrolledClasses = (studentId) => {
        axios.get('/classenrollments')
            .then((res) => {
                const enrolledClassesData = res.data.filter((enrollment) => enrollment.studentId === studentId);
                setEnrolledClasses(enrolledClassesData);
            })
            .catch((err) => {
                console.log(err);
                toast.error();
            });
    };

    const unenrollFromClass = (classId) => {
        axios.delete(`/classenrollments/${classId}`)
            .then((res) => {
                console.log('Unenrolled successfully:', res.data);
                // Refresh the list of enrolled classes
                const updatedEnrolledClasses = enrolledClasses.filter(enrollment => enrollment.classId !== classId);
                setEnrolledClasses(updatedEnrolledClasses);
                toast.success('Unenrolled successfully!');
                window.location.reload();
            })
            .catch((err) => {
                console.error('Error unenrolling:', err);
                toast.error('Error unenrolling!');
            });
    };

    return (
        <main>
            <Head />
            <div className='profilecontent'>
                <div>
                    <p className='usertxt'>My Classes</p>
                    <div className='line1'></div>
                    <br/>
                    <center>
                        <div className='card'>
                            <div className='card-header'>Your Enrolled Classes</div>
                            <div className='card-body'>
                                <table className='table'>
                                    <thead className='thead-dark'>
                                        <tr>
                                            <th scope='col'>Class ID</th>
                                            <th scope='col'>Teacher ID</th>
                                            <th scope='col'>Subject</th>
                                            <th scope='col'>Techer Name</th>
                                            <th scope='col'>Actions</th>
                                            <th scope='col'>Make payment</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {enrolledClasses.map((enrollment) => (
                                            <tr key={enrollment._id}>
                                                <td>{enrollment.classId}</td>
                                                <td>{enrollment.teacherid}</td>
                                                <td>{enrollment.subject}</td>
                                                <td>{enrollment.time}</td>
                                                <td>
                                                    <button
                                                        type='button'
                                                        className='btn btn-danger'
                                                        onClick={() => unenrollFromClass(enrollment._id)}
                                                    >
                                                        Unenroll
                                                    </button>
                                                </td><td>
                                                    <button
                                                        type='button'
                                                        className='btn btn-success'
                                                        onClick={() => pay() }
                                                    >
                                                        Pay
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </center>
                </div>
            </div>
        </main>
    );
}

export default MyClass;