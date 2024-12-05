import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import Head from '../Header/Header';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import '../../../styles/Sasi.css';

import '../../Manager/Attendance/Attendmanage.css';
import '../Attendance/attend.css';
import { PDFDownloadLink, Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

function AttendStudent() {
    const [enrollments, setEnrollments] = useState([]);
    const [search, setSearch] = useState('');
    const [attendances, setAttendances] = useState([]);
    const [dateFilter, setDateFilter] = useState('');
    const [classFilter, setClassFilter] = useState('');
    const [todayDate, setTodayDate] = useState('');
    const [studentId, setStudentId] = useState('');
    const [classId, setClassId] = useState('');
    const [studentName, setStudentName] = useState('');
    const [userName, setUserName] = useState('');

    useEffect(() => {
        fetchEnrollments();
        fetchAttendances();
        fetchStudentProfile();
    }, []);

    const fetchStudentProfile = async () => {
        try {
            const response = await axios.get('/studentprofile');
            const data = response.data;
            setStudentId(data.username);
            setStudentName(data.name); // Set student's name
            setUserName(data.username); // Set student's username
        } catch (error) {
            console.log('Error fetching student profile:', error);
        }
    };

    useEffect(() => {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        const formattedDate = `${year}-${month}-${day}`;
        setTodayDate(formattedDate);
    }, []);

    const fetchEnrollments = async () => {
        try {
            const response = await axios.get('/classenrollments');
            setEnrollments(response.data);
        } catch (error) {
            console.error('Error fetching enrollments:', error);
            toast.error('Failed to fetch enrollments');
        }
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
            fetchAttendances(); // Update attendance after marking
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

    const handleClassFilter = (e) => {
        const selectedClass = e.target.value;
        setClassFilter(selectedClass);
    };

    const filteredAttendances = attendances.filter((attendance) =>
        attendance.studentId === studentId && (dateFilter ? attendance.date.includes(dateFilter) : true)
    );

    const filteredAttendancesByClass = attendances.filter((attendance) =>
        attendance.studentId === studentId && (classFilter ? attendance.classId.includes(classFilter) : true)
    );

    const MyDocument = () => (
        <Document>
            <Page size="A4">
                <View style={styles.section}>
                    <Text style={styles.header}>Attendance Report</Text>
                    <Text style={styles.subheader}>Student Name: {studentName}</Text>
                    <Text style={styles.subheader}>Username: {userName}</Text>

                    <View style={styles.table}>
                        <View style={styles.tableRow}>
                            <Text style={styles.tableHeader}>Class ID</Text>
                            <Text style={styles.tableHeader}>Subject</Text>
                            <Text style={styles.tableHeader}>Date</Text>
                            <Text style={styles.tableHeader}>Time</Text>
                        </View>
                        {filteredAttendances.map((attendance) => (
                            <View key={attendance._id} style={styles.tableRow}>
                                <Text style={styles.tableData}>{attendance.classId}</Text>
                                <Text style={styles.tableData}>{attendance.subject}</Text>
                                <Text style={styles.tableData}>{attendance.date}</Text>
                                <Text style={styles.tableData}>{attendance.time}</Text>
                            </View>
                        ))}
                    </View>
                </View>
            </Page>
        </Document>
    );

    const generatePDF = () => (
        <PDFDownloadLink document={<MyDocument />} fileName="Student_attendance_report.pdf">
            {({ blob, url, loading, error }) => (loading ? 'Generating PDF...' : 'Download PDF')}

        </PDFDownloadLink>



    );

    return (
        <main>
            <Head />
            <div className='profilecontent'>
                <div>
                    <p className='usertxt'>Attendance</p>
                    <div className='line1'></div>
                    <br />
                    <div className='ViewAttends By Class'>
                        <div className="card text-center">
                            <div className="card-header">
                                View Attendance by Class
                            </div>
                            <div className="card-body">
                                <input
                                    type="text"
                                    className="form-control mb-4"
                                    placeholder="Search By Class ID Or Subject "
                                    value={classFilter}
                                    onChange={handleClassFilter}
                                />
                                <div className="table-responsive">
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th scope="col">Class ID</th>
                                                <th scope="col">Subject</th>
                                                <th scope="col">Date</th>
                                                <th scope="col">Time</th>
                                            </tr>
                                        </thead>
                                        <tbody className="table-body-scroll">
                                            {filteredAttendancesByClass.map((attendance) => (
                                                <tr key={attendance._id}>
                                                    <td>{attendance.classId}</td>
                                                    <td>{attendance.subject}</td>
                                                    <td>{attendance.date}</td>
                                                    <td>{attendance.time}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                    <button className="btn btn-light">
                                        {generatePDF()}

                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <br />
                    <div className='ViewAttendsbydate2'>
                        <div className="card text-center">
                            <div className="card-header">
                                View Attendance By Date
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
                                                <th scope="col">Class ID</th>
                                                <th scope="col">Subject</th>
                                                <th scope="col">Date</th>
                                                <th scope="col">Time</th>
                                            </tr>
                                        </thead>
                                        <tbody className="table-body-scroll">
                                            {filteredAttendances.map((attendance) => (
                                                <tr key={attendance._id}>
                                                    <td>{attendance.classId}</td>
                                                    <td>{attendance.subject}</td>
                                                    <td>{attendance.date}</td>
                                                    <td>{attendance.time}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div><br/>
                    </div>
                    <div>

                    </div>
                </div>
            </div>
        </main>
    );
}

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        padding: 5,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc', // Adjusted borderBottomColor value
    },

    section: {
        margin: 10,
        padding: 10,
        flexGrow: 1,
    },
    header: {
        fontSize: 20,
        marginBottom: 10,
        textAlign: 'center',
    },
    subheader: {
        fontSize: 12,
        marginBottom: 5,
    },
    table: {
        display: 'table',
        width: '100%',
    },
    tableRow: {
        flexDirection: 'row',
    },
    tableHeader: {
        backgroundColor: '#f0f0f0',
        fontWeight: 'bold',
        padding: 5,
        flex: 1,
        textAlign: 'center',
    },
    tableData: {
        padding: 5,
        flex: 1,
        textAlign: 'center',
    },
});

export default AttendStudent;