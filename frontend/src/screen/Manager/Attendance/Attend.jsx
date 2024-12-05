import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import Head from '../Header/Header';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import '../../../styles/Sasi.css';
import jsPDF from 'jspdf';
import './Attendmanage.css';


function Attend() {
    const [enrollments, setEnrollments] = useState([]);
    const [search, setSearch] = useState('');
    const [attendances, setAttendances] = useState([]);
    const [dateFilter, setDateFilter] = useState('');
    const [todayDate, setTodayDate] = useState('');
    const [, setManagerName] = useState('');
    const [, setManagerUsername] = useState('');
    // const [reportDateTime, setReportDateTime] = useState('');

    useEffect(() => {
        fetchEnrollments();
        fetchAttendances();
        fetchManagerDetails(); // Fetch manager details when component mounts
    }, []);

    useEffect(() => {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        const formattedDate = `${month}/${day}/${year}`;
        setTodayDate(formattedDate);
    }, []);

    const fetchManagerDetails = async () => {
        try {
            // Fetch manager details from an API endpoint
            const response = await axios.get('/managerdetails');
            setManagerName(response.data.name);
            setManagerUsername(response.data.username);
        } catch (error) {
            console.error('Error fetching manager details:', error);
            toast.error('Failed to fetch manager details');
        }
    };

    const fetchEnrollments = async () => {
        try {
            const response = await axios.get('/classenrollments');
            setEnrollments(response.data);
        } catch (error) {
            console.error('Error fetching enrollments:', error);
            toast.error('Failed to fetch enrollments');
        }
    };

    // Function to handle search
    const handleSearch = (e) => {
        const query = e.target.value.toLowerCase();
        setSearch(query);
    };

    const markAttendance = async (enrollment) => {
        try {
            await axios.post('/attendancemark', {
                studentId: enrollment.studentId,
                classId: enrollment.classId,
                teacherId: enrollment.teacherid,
                subject: enrollment.subject
            });
            toast.success('Attendance marked successfully');
            window.location.reload();
        } catch (error) {
            console.error('Error marking attendance:', error);
            toast.error('Failed to mark attendance');
        }
    };

    const fetchAttendances = async () => {
        try {
            const response = await axios.get('/attendancemark');
            setAttendances(response.data);
        } catch (error) {
            console.error('Error fetching attendances:', error);
            toast.error('Failed to fetch attendances');
        }
    };

    const handleDateFilter = (e) => {
        const selectedDate = e.target.value;
        setDateFilter(selectedDate);
    };

    const filteredEnrollments = enrollments.filter((enrollment) =>
        Object.values(enrollment).some((value) =>
            typeof value === 'string' && value.toLowerCase().includes(search)
        )
    );

    const filteredAttendances = attendances.filter((attendance) =>
        dateFilter ? attendance.date.includes(dateFilter) : true
    );

    const handleClearAttendance = async () => {
        try {
            // Make a DELETE request to clear all attendance data
            await axios.delete('/attendancemark/all');
            // Update the UI to reflect the cleared attendance data
            setAttendances([]);
            // Show a success message to the user
            toast.success('Attendance cleared successfully');
            window.location.reload();
        } catch (error) {
            // Log the error to console for debugging purposes
            console.error('Error clearing attendance:', error);
            // Show an error message to the user
            toast.error('Failed to clear attendance');
        }
    };

    const generatePDF = () => {
        const doc = new jsPDF();
        const currentDate = new Date();
        const formattedDate = `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${currentDate.getDate()}`;
        doc.text('Attendance Report', 10, 10);
        doc.text(`Report Generated On:${formattedDate}`, 10, 40);
        // Add table for enrollments
        let yPos = 50;
        doc.autoTable({
            head: [['Student ID', 'Class ID', 'Teacher ID', 'Subject', 'Grade']],
            body: filteredEnrollments.map(enrollment => [enrollment.studentId, enrollment.classId, enrollment.teacherid, enrollment.subject, enrollment.grade]),
            startY: yPos
        });
        // Add table for attendances
        yPos = doc.autoTable.previous.finalY + 10;
        doc.autoTable({
            head: [['Student ID', 'Class ID', 'Date', 'Time']],
            body: filteredAttendances.map(attendance => [attendance.studentId, attendance.classId, attendance.date, attendance.time]),
            startY: yPos
        });
        doc.save('attendance_report.pdf');
    };

    return (
        <main>
            <Head />
            <div className='profilecontent'>
                <div>
                    <p className='usertxt'>Attendance</p>
                    <button className="btn btn-primary" onClick={generatePDF}>Download PDF</button>
                    <div className='line1'></div>
                    <br />
                    <div className='MrkAttend'>
                        <div className="card text-center">
                            <div className="card-header">
                                Mark Attendance
                            </div>
                            <div className="card-body">
                                <input
                                    type="text"
                                    className="form-control mb-4"
                                    placeholder="Search..."
                                    value={search}
                                    onChange={handleSearch}
                                />
                                <div className="table-responsive">
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th scope="col">Student ID</th>
                                                <th scope="col">Class ID</th>
                                                <th scope="col">Teacher ID</th>
                                                <th scope="col">Subject</th>
                                                <th scope="col">Grade</th>
                                                <th scope="col">Attendance Mark</th>
                                            </tr>
                                        </thead>
                                        <tbody className="table-body-scroll">
                                            {filteredEnrollments.map((enrollment) => (
                                                <tr key={enrollment._id}>
                                                    <td>{enrollment.studentId}</td>
                                                    <td>{enrollment.classId}</td>
                                                    <td>{enrollment.teacherid}</td>
                                                    <td>{enrollment.subject}</td>
                                                    <td>{enrollment.grade}</td>
                                                    <td>
                                                        <center>
                                                            <button className="btn btn-primary" onClick={() => markAttendance(enrollment)}>Mark</button>
                                                        </center>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='ViewAttend'>
                <div className="card text-center">
                    <div className="card-header">
                        View Attendance
                    </div>
                    <div className="card-body">
                        <input
                            type="date"
                            className="form-control mb-4"
                            placeholder={todayDate}
                            value={dateFilter}
                            onChange={handleDateFilter}
                        />
                        <div className="table-responsive">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th scope="col">Student ID</th>
                                        <th scope="col">Class ID</th>
                                        <th scope="col">Date</th>
                                        <th scope="col">Time</th>
                                    </tr>
                                </thead>
                                <tbody className="table-body-scroll">
                                    {filteredAttendances.map((attendance) => (
                                        <tr key={attendance._id}>
                                            <td>{attendance.studentId}</td>
                                            <td>{attendance.classId}</td>
                                            <td>{attendance.date}</td>
                                            <td>{attendance.time}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <button className="btn btn-primary" onClick={handleClearAttendance}>Clear Attendance</button>
            </div>
        </main>
    );
}

export default Attend;