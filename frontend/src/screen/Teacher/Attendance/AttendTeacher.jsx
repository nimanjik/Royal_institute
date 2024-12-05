import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import Head from '../Header/Header';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import '../../../styles/Sasi.css';
import jsPDF from 'jspdf';

function AttendTeacher() {
    const [attendances, setAttendances] = useState([]);
    const [classFilter, setClassFilter] = useState('');
    const [studentFilter, setStudentFilter] = useState('');
    const [studentTeacher, setteacherFilter] = useState('');

    useEffect(() => {
        axios.get('/teacherprofile')
            .then((res) => {
                setteacherFilter(res.data.username);
            })
            .catch((err) => {
                console.log(err);
            })
    }, [])

    useEffect(() => {
        fetchAttendances();
    }, [studentTeacher]);

    const fetchAttendances = async () => {
        try {
            const response = await axios.get('/attendancemark', {
                params: {
                    teacherId: studentTeacher
                }
            });
            setAttendances(response.data);
        } catch (error) {
            console.error('Error fetching attendances:', error);
            toast.error('Failed to fetch attendances');
        }
    };

    const handleClassFilter = (e) => {
        const selectedClass = e.target.value;
        setClassFilter(selectedClass);
    };

    const handleStudentFilter = (e) => {
        const selectedStudent = e.target.value;
        setStudentFilter(selectedStudent);
    };

    const filteredAttendances = attendances.filter((attendance) =>
        (classFilter ? attendance.classId.includes(classFilter) : true) &&
        (studentFilter ? attendance.studentId.includes(studentFilter) : true)
    );

    const generateFilteredPDF = () => {
        const doc = new jsPDF();
        doc.text('Filtered Attendances Report', 10, 10);
        doc.autoTable({
            head: [['Class ID', 'Student ID', 'Date', 'Time']],
            body: filteredAttendances.map(attendance => [attendance.classId, attendance.studentId, attendance.date, attendance.time]),
            startY: 20
        });


        doc.save('filtered_attendances_report.pdf');
    };

    const generateAllPDF = () => {
        const doc = new jsPDF();
        doc.text('All Attendances Report', 10, 10);
        doc.autoTable({
            head: [['Class ID', 'Student ID', 'Date', 'Time']],
            body: attendances.map(attendance => [attendance.classId, attendance.studentId, attendance.date, attendance.time]),
            startY: 20
        });
        doc.save('all_attendances_report.pdf');
    };

    return (
        <main>
            <Head />
            <div className='profilecontent'>
                <div>
                    <p className='usertxt'>Attendance</p>
                    <div className='line1'></div>
                    <br />
                    <div className='ViewAttendances'>
                        <div className="card text-center">
                            <div className="card-header">
                                View Attendance
                            </div>
                            <div className="card-body">
                                <div className="input-group mb-3">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Search by Class ID"
                                        value={classFilter}
                                        onChange={handleClassFilter}
                                    />
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Search by Student ID"
                                        value={studentFilter}
                                        onChange={handleStudentFilter}
                                    />
                                </div>
                                <div className="table-responsive">
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th scope="col">Class ID</th>
                                                <th scope="col">Student ID</th>
                                                <th scope="col">Date</th>
                                                <th scope="col">Time</th>
                                            </tr>
                                        </thead>
                                        <tbody className="table-body-scroll">
                                            {filteredAttendances.map((attendance) => (
                                                <tr key={attendance._id}>
                                                    <td>{attendance.classId}</td>
                                                    <td>{attendance.studentId}</td>
                                                    <td>{attendance.date}</td>
                                                    <td>{attendance.time}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                    <button type="button" className="btn btn-info" onClick={generateFilteredPDF}>Download Filtered Attendances Report</button>
                                    <button type="button" className="btn btn-secondary" onClick={generateAllPDF}>Download All Attendances Report</button>
                                </div>
                            </div>
                        </div>

                    </div>

                </div>


            </div>
        </main>
    );
}

export default AttendTeacher;