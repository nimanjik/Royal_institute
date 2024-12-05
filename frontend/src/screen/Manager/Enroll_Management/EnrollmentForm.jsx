import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Head from '../Header/Header';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import './enrolmanage.css';

const EnrollmentForm = () => {
    const [studentId, setStudentId] = useState('');
    const [classId, setClassId] = useState('');
    const [teacherId, setTeacherId] = useState('');
    const [subject, setSubject] = useState('');
    const [grade, setGrade] = useState('');
    const [students, setStudents] = useState([]);
    const [classes, setClasses] = useState([]);
    const [teachers, setTeachers] = useState([]);
    const [teacher, setTeacher] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const studentsResponse = await axios.get('/students');
                setStudents(studentsResponse.data);

                const classesResponse = await axios.get('/viewSubject');
                setClasses(classesResponse.data);

                const teachersResponse = await axios.get('/getAllTeachers');
                setTeachers(teachersResponse.data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, []);

    const handleClassChange = (e) => {
        const selectedClassId = e.target.value;
        const selectedClass = classes.find(item => item.sbid === selectedClassId);

        if (selectedClass) {
            setTeacherId(selectedClass.teid);
            setSubject(selectedClass.subjectname);
            setTeacher(selectedClass.teachername); // Add teacher name to state
            setGrade(selectedClass.grade); 
        }
    };

    const handleBack = () => {
        navigate("/ManagerEnroll");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const formData = {
            "studentId": studentId,
            "classId": classId,
            "teacherId": teacherId,
            "subject": subject,
            "grade": grade,
            "teacherid": teacherId, // Add teacherid to formData
            "time": new Date().toISOString() // Add current time to formData
        };
    
        console.log("Form Data:", formData);
    
        try {
            await axios.post('/classenrollments', formData);
            toast.success("Enrollment created successfully!");
            // Clear form fields after successful submission
            setStudentId('');
            setClassId('');
            setTeacherId('');
            setSubject('');
            setTeacher('');
            setGrade('');
        } catch (error) {
            console.error("Error creating enrollment:", error);
            toast.error("Failed to create enrollment. Please try again.");
        }
    };
    return (
        <div>
            <Head />
            
                <div className="enrollformdiv" >
                    
                    <form onSubmit={handleSubmit}>
                        <div className="form-group" controlId="studentId">
                            <label htmlFor="studentId">Student ID</label>
                            <select className="form-control" value={studentId} onChange={e => setStudentId(e.target.value)}>
                                <option value="">Select Student</option>
                                {students.map(student => (
                                    <option key={student._id} value={student.username}>{student.username}</option>
                                ))}
                            </select>
                        </div>
                        <div className="form-group" controlId="classId">
                            <label htmlFor="classId">Class ID</label>
                            <select className="form-control" value={classId} onChange={e => {
                                setClassId(e.target.value);
                                handleClassChange(e);
                            }}>
                                <option value="">Select Class</option>
                                {classes.map(classItem => (
                                    <option key={classItem._id} value={classItem.sbid}>{classItem.sbid}</option>
                                ))}
                            </select>
                        </div>
                        <div className="form-group" controlId="teacherId">
                            <label htmlFor="teacherId">Teacher ID</label>
                            <input className="form-control" type="text" value={teacherId} readOnly />
                        </div>
                        <div className="form-group" controlId="subject">
                            <label htmlFor="subject">Subject</label>
                            <input className="form-control" type="text" value={subject} readOnly />
                        </div>
                        <div className="form-group" controlId="teacher">
                            <label htmlFor="teacher">Teacher</label>
                            <input className="form-control" type="text" value={teacher} readOnly />
                        </div>
                        <div className="form-group" controlId="grade">
                            <label htmlFor="grade">Grade</label>
                            <input className="form-control" type="number" value={grade} readOnly />
                        </div>
                        <button className="btn btn-primary" type="submit">Submit</button>
                        <button className="btn btn-secondary" onClick={handleBack}>Back</button>
                    </form>

                </div>
                    
                
            
        </div>
    );
};

export default EnrollmentForm;