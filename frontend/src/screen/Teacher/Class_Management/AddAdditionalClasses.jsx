import React, { useEffect, useState } from 'react';
import './AddAdditionalClasses.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2'; // Import Swal
import { toast } from 'react-toastify'; // Import toast
import 'react-toastify/dist/ReactToastify.css'; // Import toast CSS
import Head from '../Header/Header';

function AddAdditionalClasses() {
    const [teacher, setTeacher] = useState('');
    const [classid, setClassId] = useState('');
    const [teacherid, setTeacherId] = useState('');
    const [date1, setDate1] = useState('');
    const [grade, setGrade] = useState('');
    const [subject, setSubject] = useState('');
    const [status, ] = useState('Pending');
    const navigator = useNavigate();

    const request = (e) => {
        e.preventDefault();
        Swal.fire({
            title: "Add Additional Class",
            text: "Are you sure you want to proceed with the Additional class?",
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
                    title: "Additional Class is not Added",
                    icon: "error",
                });
                // Call submit function even if result is canceled
            }
        });
    };

    const submitRequest = () => {
        axios.post('http://localhost:5000/createaddadditionalclass', {
            teacher: teacher,
            date: date1,
            grade: grade,
            subject: subject,
            classid: classid,
            teacherid: teacherid,
            status: status
        })
        .then(response => {
            console.log(response.data); // Log the response data
            Swal.fire({
                title: "Additional Class is Added",
                icon: "success",
            });
            handleClick2();
            navigator('/additionalclasses');
        })
        .catch(error => {
            console.error(error);
        });
    };

    const handleClick2 = () => {
        toast.loading('Add Additional class is processing...', {
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
                toast.success('Additional class is Added!', {
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
        <div className="addadditional-classes-container">
            <h2 className="addadditional-class-title">Add Additional Classes</h2>
            <div className="form_container">
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
                        <input type="text" id="gradeInput" pattern="[0-9]+" required value={grade} onChange={(e) => setGrade(e.target.value)} />
                    </div>
                    <div className="input-container">
                        <label htmlFor="dateInput">Date1</label>
                        <input type="date" id="dateInput" required value={date1} onChange={(e) => setDate1(e.target.value)} />
                    </div>
                    <div className="input-container">
                        <label htmlFor="subjectInput">Subject</label>
                        <input type="text" id="subjectInput" pattern="[A-Za-z\s]+" required value={subject} onChange={(e) => setSubject(e.target.value)} readOnly/>
                    </div>
                    <div className="button-container">
                        <Link to="/additionalclasses" className="cancel-button">Cancel</Link>
                        <button className="save-button" type="submit">Request</button>
                    </div>
                </form>
                <br></br>
                <Link to="/requestschedule" className="requestschedule-button">Request A Schedule</Link>
            </div>
            </div>
        </div>
    );
}

export default AddAdditionalClasses;
