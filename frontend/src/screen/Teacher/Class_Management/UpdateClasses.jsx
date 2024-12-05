import React, { useEffect, useState } from 'react';
import './UpdateClasses.css';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Head from '../Header/Header';

function UpdateClasses() {
    const { id } = useParams();
    const [teacher, setTeacher] = useState('');
    const [classid, setClassId] = useState('');
    const [teacherid, setTeacherId] = useState('');
    const [subject, setSubject] = useState('');
    const [time, setTime] = useState('');
    const [date, setDate] = useState('');
    const [grade, setGrade] = useState('');
    

    useEffect(() => {
        axios.get(`http://localhost:5000/getClass/${id}`)
            .then(res => {
                const { teacher, classid, teacherid, subject,time, date, grade } = res.data;

                setTeacher(teacher);
                setClassId(classid);
                setTeacherId(teacherid);
                setSubject(subject);
                setTime(time);
                setDate(date);
                setGrade(grade);
            })
            .catch(err => console.error(err));
    }, [id]);

    const update = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:5000/updateClass/${id}`, { teacher, classid, teacherid, subject,time, date, grade });
            window.location.href = '/viewclasses'; // Redirect to home page after update
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div>
             <Head/>
        <div className="update-classes-container">
            <h2 className="edit-class-title">Edit Class</h2>
            <div className="form-container">
                <form onSubmit={update}>
                <div className="input-container">
                        <label htmlFor="teacherInput">Teacher</label>
                        <input type="text" id="teacherInput" value={teacher} onChange={(e) => setTeacher(e.target.value)} />
                    </div>

                <div className="input-container">
                        <label htmlFor="classidInput">Class Id</label>
                        <input type="text" id="classidInput" value={classid} onChange={(e) => setClassId(e.target.value)} />
                    </div>

                    <div className="input-container">
                        <label htmlFor="teacheridInput">Teacher Id</label>
                        <input type="text" id="teacheridInput" value={teacherid} onChange={(e) => setTeacherId(e.target.value)} />
                    </div>

                    <div className="input-container">
                        <label htmlFor="subjectInput">Subject </label>
                        <input type="text" id="subjectInput" value={subject} onChange={(e) => setSubject(e.target.value)} />
                    </div>


                    <div className="input-container">
                        <label htmlFor="timeInput">Time</label>
                        <input type="text" id="timeInput" value={time} onChange={(e) => setTime(e.target.value)} />
                    </div>

                    <div className="input-container">
                        <label htmlFor="dateInput">Date</label>
                        <input type="text" id="dateInput" value={date} onChange={(e) => setDate(e.target.value)} />
                    </div>

                  

                    <div className="input-container">
                        <label htmlFor="gradeInput">Grade</label>
                        <input type="text" id="gradeInput" value={grade} onChange={(e) => setGrade(e.target.value)} />
                    </div>

                    <div className="button-container">
                        <button className="cancel-button">Cancel</button>
                        <button className="save-button" type="submit">Save</button>
                    </div>
                </form>
            </div>
        </div>
        </div>
    );
}

export default UpdateClasses;
