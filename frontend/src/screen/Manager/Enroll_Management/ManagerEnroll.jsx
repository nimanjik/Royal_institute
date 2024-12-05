import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Head from '../Header/Header';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import '../../../styles/Sasi.css';
import { toast } from 'react-hot-toast';
import jsPDF from 'jspdf';
import { useNavigate } from 'react-router-dom';
import './enrolmanage.css';


function ManagerEnroll() {
    const [enrollments, setEnrollments] = useState([]);
    const [filteredEnrollments, setFilteredEnrollments] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [showPopup, setShowPopup] = useState(false);
    const [formData, setFormData] = useState({
        studentId: '',
        classId: '',
        teacherId: '',
        subject: '',
        time: '',
        grade: '',
    });

    useEffect(() => {
        fetchEnrollments();
    }, []);

    const fetchEnrollments = async () => {
        try {
            const response = await axios.get('http://localhost:5000/classenrollments');
            setEnrollments(response.data);
            setFilteredEnrollments(response.data);
        } catch (error) {
            console.error('Error fetching enrollments:', error);
            toast.error('Error Database not Connected');
        }
    };

    const navigate = useNavigate();

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/classenrollments/${id}`);
            fetchEnrollments();
            toast.success('Enrollment deleted successfully');
        } catch (error) {
            console.error('Error deleting enrollment:', error);
            toast.error('Error deleting enrollment');
        }
    };

    const handleSearch = (e) => {
        const query = e.target.value.toLowerCase();
        setSearchQuery(query);
        const filtered = enrollments.filter((enrollment) =>
            Object.values(enrollment).some((value) => {
                if (typeof value === 'string') {
                    return value.toLowerCase().includes(query);
                }
                return false;
            })
        );
        setFilteredEnrollments(filtered);
    };

    const handleOpenPopup = () => {
        setShowPopup(true);
    };

    const handleClosePopup = () => {
        setShowPopup(false);
    };

    const handleenrollform = () => {
        navigate("/EnrollmentForm");
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/classenrollments', formData);
            setShowPopup(false);
            toast.success('Enrollment added successfully');
            fetchEnrollments();
        } catch (error) {
            console.error('Error adding enrollment:', error);
            toast.error('Error adding enrollment');
        }
    };

    const generatePDF = () => {
        const doc = new jsPDF();
        const currentDate = new Date();
        const formattedDate = `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${currentDate.getDate()}`;
        doc.text('Enrollments Report', 10, 10);
        doc.text(`Report Generated On: ${formattedDate}`, 10, 40);
        doc.autoTable({
            head: [['Student ID', 'Class ID', 'Teacher ID', 'Subject', 'Grade']],
            body: enrollments.map(enrollment => [enrollment.studentId, enrollment.classId, enrollment.teacherid, enrollment.subject, enrollment.grade]),
            startY: 50
        });
        doc.save('enrollments_report.pdf');
    };

    return (
        <main>
            <Head />
            <div className='profilecontent'>
                <div>
                    <p className='usertxt'>Enrollments</p>
                    <div className='line1'></div>
                    <br />
                    <center>
                        <div className='srch'>
                            <input
                                type="text"
                                placeholder="Search by Studentid , class Id , teacher id or Subject..."
                                value={searchQuery}
                                onChange={handleSearch}
                                className="form-control mb-3" />

                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>Student ID</th>
                                        <th>Class ID</th>
                                        <th>Teacher ID</th>
                                        <th>Subject</th>
                                        <th>Grade</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody style={{ overflowY: 'auto', maxHeight: '400px' }}>
                                    {filteredEnrollments.map((enrollment) => (
                                        <tr key={enrollment._id}>
                                            <td>{enrollment.studentId}</td>
                                            <td>{enrollment.classId}</td>
                                            <td>{enrollment.teacherid}</td>
                                            <td>{enrollment.subject}</td>
                                            <td>{enrollment.grade}</td>
                                            <td>
                                                <button
                                                    onClick={() => handleDelete(enrollment._id)}
                                                    className="btn btn-danger btn-sm">
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <button onClick={handleenrollform} className="btn btn-primary">
                                Add Enrollment
                            </button>

                            <button onClick={generatePDF} className="btn btn-primary">
                                Download Report
                            </button>

                        </div>
                    </center>
                </div>
            </div>

            {showPopup && (
                <div className="popup">
                    <div className="popup-content">
                        <span className="close-popup" onClick={handleClosePopup}>
                            &times;
                        </span>
                        <form onSubmit={handleSubmit}>
                            <center>
                                <div className="login-box">
                                    <div className="user-box">
                                        <input
                                            type="text"
                                            name="studentId"
                                            value={formData.studentId}
                                            onChange={handleChange}
                                        />
                                        <label>Student ID:</label>
                                    </div>
                                    <div className="user-box">
                                        <input
                                            type="text"
                                            name="classId"
                                            value={formData.classId}
                                            onChange={handleChange}
                                        />
                                        <label>Class ID:</label>
                                    </div>
                                    <div className="user-box">
                                        <input
                                            type="text"
                                            name="teacherId"
                                            value={formData.teacherId}
                                            onChange={handleChange}
                                        />
                                        <label>Teacher ID:</label>
                                    </div>
                                    <div className="user-box">
                                        <input
                                            type="text"
                                            name="subject"
                                            value={formData.subject}
                                            onChange={handleChange}
                                        />
                                        <label>Subject:</label>
                                    </div>
                                    <div className="user-box">
                                        <input
                                            type="number"
                                            name="grade"
                                            value={formData.grade}
                                            onChange={handleChange}
                                        />
                                        <label>Grade:</label>
                                    </div>
                                    <div className="user-box">
                                        <input
                                            type="text"
                                            name="time"
                                            value={formData.time}
                                            onChange={handleChange}
                                        />
                                        <label>Time:</label>
                                    </div>

                                    <button className="btn btn-danger btn-sm" onClick={handleClosePopup}>
                                        Close
                                    </button>
                                </div>
                            </center>
                        </form>
                        <button onClick={handleenrollform} className="btn btn-primary">
                            Add Enrollment
                        </button>
                    </div>
                </div>
            )}
        </main>
    );
}

export default ManagerEnroll;