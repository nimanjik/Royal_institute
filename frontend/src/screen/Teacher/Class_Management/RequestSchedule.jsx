import React, { useEffect, useState } from 'react';
import './RequestSchedule.css'; // Importing CSS file
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'; // Import Swal
import { toast } from 'react-toastify'; // Import toast
import 'react-toastify/dist/ReactToastify.css'; // Import toast CSS
import Head from '../Header/Header';

function RequestSchedule() {
    const [teacher, setTeacher] = useState('');
    const [classid, setClassId] = useState('');
    const [teacherid, setTeacherId] = useState('');
    const [date1, setDate1] = useState('');
    const [date2, setDate2] = useState('');
    const [date3, setDate3] = useState('');
    const [date4, setDate4] = useState('');
    const [grade, setGrade] = useState('');
    const [subject, setSubject] = useState('');
    const [status, setStatus] = useState('Pending');
    const navigator = useNavigate();

    const request = (e) => {
        e.preventDefault();
        Swal.fire({
            title: "Request Schedule",
            text: "Are you sure you want to proceed with the Request Schedule?",
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, proceed!",
            cancelButtonText: "Cancel",
        }).then((result) => {
            if (result.isConfirmed) {
                submitRequest(); // Call submit function if result is confirmed
            } else {
                Swal.fire({
                    title: "Schedule is Not Requested",
                    icon: "error",
                });
                // Call submit function even if result is canceled
            }
        });
    };

    const submitRequest = () => {
        axios.post('http://localhost:5000/createschedule', {
            teacher: teacher,
            classid: classid,
            teacherid : teacherid,
            date1: date1,
            date2: date2,
            date3: date3,
            date4: date4,
            grade: grade,
            subject: subject,
            status: status
        })
        .then(response => {
            console.log(response);
            Swal.fire({
                title: "Schedule is Requested",
                icon: "success",
            });
            handleClick2();
            navigator('/additionalclasses');
        })
        .catch(error => {
            console.error(error);
        });
    };

    const clearForm = () => {
        setTeacher('');
        setClassId('');
        setTeacherId('');
        setDate1('');
        setDate2('');
        setDate3('');
        setDate4('');
        setGrade('');
        setSubject('');
        setStatus('Pending');
    };

    const handleClick2 = () => {
        toast.loading('Request Schedule is processing...', {
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
                toast.success('Schedule is Requested!', {
                    style: {
                        background: '#28a745', // Green background color
                        color: '#ffffff', // White text color
                        borderRadius: '10px', // Rounded corners
                        border: '2px solid #ffffff', // White border
                    },
                    duration: 2000, // Display duration in milliseconds (3 seconds)
                    iconTheme: {
                        primary: '#ffffff', // White icon color
                        secondary: '#28a745', // Green icon color
                    },
                });
                setTimeout(() => {
                    navigator('/additionalclasses');
                }, 2500); // Wait for 2 seconds after displaying success toast before navigating
            }, 2500); // Wait for 2 seconds after dismissing loading toast before displaying success toast
        }, 5000); // Wait for 5 seconds before dismissing loading toast
    };
    useEffect(()=>{
        axios.get('/teacherprofile')
        .then((res)=>{
            setTeacher(res.data.name);    
            setTeacherId(res.data.teid);  
            setSubject(res.data.subject);           
        })
        .catch((err)=>{
            console.log(err);
        })
      },[])


    return (
        <div>
            <Head/>
    
        <div className="request-schedule-container">
            <div className="request-schedule-box">
                <h2 className="request-schedule-title">Request A Schedule</h2>
                <div className="form-container">
                    <form onSubmit={request}>
                        <div className="input-container">
                            <label htmlFor="teacherInput">Teacher</label>
                            <input type="text" id="teacherInput" pattern="[A-Za-z\s]+" required value={teacher} onChange={(e) => setTeacher(e.target.value)} readOnly/>
                        </div>
                        <div className="input-container">
                            <label htmlFor="classidInput">Class Id</label>
                            <input type="text" id="classidInput" required value={classid} onChange={(e) => setClassId(e.target.value)} />
                        </div>
                        <div className="input-container">
                            <label htmlFor="teacheridInput">Teacher Id</label>
                            <input type="text" id="teacheridInput" required value={teacherid} onChange={(e) => setTeacherId(e.target.value)} readOnly/>
                        </div>
                        <div className="input-container">
                            <label htmlFor="gradeInput">Grade</label>
                            <input type="text" id="gradeInput" pattern="[0-9]+" required value={grade} onChange={(e) => setGrade(e.target.value)}/>
                        </div>
                        <div className="input-container">
                            <label htmlFor="date1Input">Date 1</label>
                            <input type="date" id="date1Input" required value={date1} onChange={(e) => setDate1(e.target.value)}/>
                        </div>
                        <div className="input-container">
                            <label htmlFor="date2Input">Date 2</label>
                            <input type="date" id="date2Input" required value={date2} onChange={(e) => setDate2(e.target.value)}/>
                        </div>
                        <div className="input-container">
                            <label htmlFor="date3Input">Date 3</label>
                            <input type="date" id="date3Input" required value={date3} onChange={(e) => setDate3(e.target.value)}/>
                        </div>
                        <div className="input-container">
                            <label htmlFor="date4Input">Date 4</label>
                            <input type="date" id="date4Input" required value={date4} onChange={(e) => setDate4(e.target.value)}/>
                        </div>
                        <div className="input-container">
                            <label htmlFor="subjectInput">Subject</label>
                            <input type="text" id="subjectInput" pattern="[A-Za-z\s]+" required value={subject} onChange={(e) => setSubject(e.target.value)} readOnly/>
                        </div>
                        <div className="button-container">
                            <button className="cancel-button" type="button" onClick={clearForm}>Cancel</button>
                            <button className="save-button" type="submit">Request</button>
                        </div>
                    </form>
                </div>
                </div>
            </div>
        </div>
    );
}

export default RequestSchedule;
