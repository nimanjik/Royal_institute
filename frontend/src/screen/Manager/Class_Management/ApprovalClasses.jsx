import React, { useEffect, useState } from 'react';
import './ApprovalClasses.css';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2'; // Import Swal
import { toast } from 'react-toastify'; // Import toast
import 'react-toastify/dist/ReactToastify.css'; // Import toast CSS

function ApprovalClasses() {
    const { id } = useParams();
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

    useEffect(() => {
        axios.get(`http://localhost:5000/approveClass/${id}`)
            .then(res => {
                const { teacher, classid, teacherid, date, date2, date3, date4, grade, subject, status } = res.data;
                setTeacher(teacher);
                setClassId(classid);
                setTeacherId(teacherid);
                setDate1(date);
                setDate2(date2);
                setDate3(date3);
                setDate4(date4);
                setGrade(grade);
                setSubject(subject);
                setStatus(status);
            })
            .catch(err => console.error(err));
    }, [id]);

    
    
    const update = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:5000/request/${id}`, { teacher, classid, teacherid, date1, date2, date3, date4, grade, subject, status});
            Swal.fire({
                title: "Additional Class is Updated",
                icon: "success",
            });
            handleClick2();
            window.location.href = '/requestedadditionalclasses';
        } catch (err) {
            console.error(err);
        }
    };

    const cancel = () => {
        // Redirect or any other action for cancel
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        Swal.fire({
            title: "Update Additional class",
            text: "Are you sure you want to proceed with the Additional class?",
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, proceed!",
            cancelButtonText: "Cancel",
        }).then((result) => {
            if (result.isConfirmed) {
                update(e); // Call submit function if result is confirmed
            } else {
                Swal.fire({
                    title: "Additional class is Not Updated",
                    icon: "error",
                });
                // Call submit function even if result is canceled
            }
        });
    };

    const handleClick2 = () => {
        toast.loading('Update Additional Class is processing...', {
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
                toast.success('Additional class is Updated!', {
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
                    window.location.href = '/requestedadditionalclasses';
                }, 2500); // Wait for 2 seconds after displaying success toast before navigating
            }, 2500); // Wait for 2 seconds after dismissing loading toast before displaying success toast
        }, 5000); // Wait for 5 seconds before dismissing loading toast
    };

    return (
        <div className="approve-classes-container">
            <h2 className="manage-class-title">Manage Class</h2>
            <div className="form-container">
                <form onSubmit={handleSubmit}>
                    <div className="input-container">
                        <label htmlFor="teacherInput">Teacher</label>
                        <input type="text" id="teacherInput" pattern="[A-Za-z\s]+" required value={teacher} onChange={(e) => setTeacher(e.target.value)} />
                    </div>

                    <div className="input-container">
                        <label htmlFor="cgrade">Grade</label>
                        <input type="text" id="cgrade" value={grade} onChange={(e) => setGrade(e.target.value)} />
                    </div>

                    <div className="input-container">
                        <label htmlFor="csubject">Subject</label>
                        <input type="text" id="csubject" value={subject} onChange={(e) => setSubject(e.target.value)} />
                    </div>

                    <div className="input-container">
                        <label htmlFor="cdate1">Date 1</label>
                        <input type="text" id="cdate1" value={date1} onChange={(e) => setDate1(e.target.value)} />
                    </div>

                    <div className="input-container">
                        <label htmlFor="cdate2">Date 2</label>
                        <input type="text" id="cdate2" value={date2} onChange={(e) => setDate2(e.target.value)} />
                    </div>

                    <div className="input-container">
                        <label htmlFor="cdate3">Date 3 </label>
                        <input type="text" id="cdate3" value={date3} onChange={(e) => setDate3(e.target.value)} />
                    </div>

                    <div className="input-container">
                        <label htmlFor="cdate4">Date 4</label>
                        <input type="text" id="cdate4" value={date4} onChange={(e) => setDate4(e.target.value)} />
                    </div>

                    <div className="input-container">
                        <label htmlFor="status">Status</label>
                        <select id="status" value={status} onChange={(e) => setStatus(e.target.value)}>
                            <option value="Pending">Pending</option>
                            <option value="Approved">Approved</option>
                            <option value="Rejected">Rejected</option>
                        </select>
                    </div>

                    <div className="button-container">
                        <button className="cancel-button" onClick={cancel}>Cancel</button>
                        <button className="save-button" type="submit">Save</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default ApprovalClasses;


