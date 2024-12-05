import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import '../../../styles/Sasi.css';
import Head from '../Header/Header';

const SubjectView = () => {
  const [subjects, setSubjects] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchSubjects();
  }, []);

  const fetchSubjects = async () => {
    try {
      const response = await axios.get('http://localhost:5000/viewSubject');
      setSubjects(response.data);
    } catch (error) {
      console.error('Error fetching subjects:', error);
    }
  };

  const handleDeleteSubject = async (id) => {
    if (window.confirm('Are you sure you want to delete this subject?')) {
      try {
        await axios.delete(`http://localhost:5000/getSubject/${id}`);
        toast.success('Subject deleted successfully!');
        // Refresh subjects after deletion
        fetchSubjects();
      } catch (error) {
        console.error('Error deleting subject:', error);
        toast.error('Failed to delete subject. Please try again later.');
      }
    }
  };

  const filteredSubjects = subjects.filter((subject) => {
    const search = searchTerm.toLowerCase();
    return (
      subject.sbid.toLowerCase().includes(search) ||
      subject.subjectname.toLowerCase().includes(search) ||
      subject.grade.toString().includes(search) ||
      subject.teid.toLowerCase().includes(search) ||
      subject.teachername.toLowerCase().includes(search)
    );
  });

  return (
    <div>
      <Head />
      <div className="container mt-5">
        <h1 className="mb-4">View All Classes</h1>
        <input
          type="text"
          className="form-control mb-3"
          placeholder="Search by Teacher ID, Teacher Name, Grade, Subject ID, or Subject Name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <table className="table">
          <thead>
            <tr>
              <th>Subject ID</th>
              <th>Subject Name</th>
              <th>Grade</th>
              <th>Teacher ID</th>
              <th>Teacher Name</th>
              <th>Amount</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredSubjects.map((subject) => (
              <tr key={subject._id}>
                <td>{subject.sbid}</td>
                <td>{subject.subjectname}</td>
                <td>{subject.grade}</td>
                <td>{subject.teid}</td>
                <td>{subject.teachername}</td>
                <td>{subject.amount}</td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDeleteSubject(subject._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SubjectView;