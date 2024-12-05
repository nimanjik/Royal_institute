import React, { useEffect, useState } from 'react';
import './AddClasses.css'; // Importing CSS file
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2'; // Import Swal
import { toast } from 'react-toastify'; // Import toast
import Head from '../Header/Header';

function AddClasses() {
    const [teacher, setTeacher] = useState('');
    const [classid, setClassId] = useState('');
    const [teacherid, setTeacherId] = useState('');
    const [subject, setSubject] = useState('');
    const [time, setTime] = useState('');
    const [date, setDate] = useState('');
    const [grade, setGrade] = useState('');
    const navigator = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        Swal.fire({
            title: "Add Class",
            text: "Are you sure you want to proceed with the Class?",
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, proceed!",
            cancelButtonText: "Cancel",
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const response = await axios.post('http://localhost:5000/addclass', {
                        teacher: teacher,
                        time: time,
                        date: date,
                        grade: grade,
                        classid: classid,
                        teacherid: teacherid,
                        subject: subject,
                    });
                    console.log(response.data); // assuming response.data is the data returned from the server
                    Swal.fire({
                        title: "Class is Added",
                        icon: "success",
                    });
                    handleClick2();
                    navigator('/viewclasses');
                } catch (error) {
                    console.error(error);
                    Swal.fire({
                        title: "Class is Not Added",
                        icon: "error",
                    });
                }
            }
        });
    };

    const handleClick2 = () => {
        toast.loading('Add Class is processing...', {
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
                toast.success('Class is Added Successfully!', {
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
                    navigator('/viewclasses');
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
     
        <div className="add-classes-container">
            <h2 className="add-class-title">Add Classes</h2>
            <div className="form-container">
                <form onSubmit={handleSubmit}>
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
                        <label htmlFor="subjectInput">Subject</label>
                        <input type="text" id="subjectInput" required value={subject} onChange={(e) => setSubject(e.target.value)} readOnly/>
                    </div>
                    <div className="input-container">
                        <label htmlFor="timeInput">Time</label>
                        <input type="text" id="timeInput" required value={time} onChange={(e) => setTime(e.target.value)} />
                    </div>
                    <div className="input-container">
                        <label htmlFor="dateInput">Date</label>
                        <input type="text" id="dateInput" required value={date} onChange={(e) => setDate(e.target.value)} />
                    </div>
                    <div className="input-container">
                        <label htmlFor="gradeInput">Grade</label>
                        <input type="text" id="gradeInput" pattern="[0-9]+" required value={grade} onChange={(e) => setGrade(e.target.value)} />
                    </div>
                    <div className="button-container">
                        <Link to="/viewclasses" className="cancel-button">Cancel</Link>
                        <button className="save-button" type="submit">Save</button>
                    </div>
                </form>
            </div>
        </div>
        </div>
    );
}

export default AddClasses;
