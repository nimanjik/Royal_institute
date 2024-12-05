import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './TeacherMyClasses.css';
import axios from 'axios';
import Swal from 'sweetalert2'; // Import Swal
import { toast } from 'react-toastify'; // Import toast
import Head from '../Header/Header';

function TeacherMyClasses() {
    const [addclasses, setAddclasses] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

  

      useEffect(() => {
        axios.get('/teacherprofile')
          .then((res) => {
            const tid = res.data.teid;
            axios.get('/teachermyclasses/addclasses')
              .then((res) => {
                const viewteclass = res.data.filter(viewclasses => viewclasses.teacherid === tid );
                setAddclasses(viewteclass);
              })
              .catch((err) => {
                console.log(err);
              });
          })
          .catch((err) => {
            console.log(err);
          });
      }, []);


    const handleDelete = async (id) => {
        try {
            const result = await Swal.fire({
                title: "Delete Class",
                text: "Are you sure you want to proceed with the Class?",
                icon: "question",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, proceed!",
                cancelButtonText: "Cancel",
            });
            if (result.isConfirmed) {
                await axios.delete(`http://localhost:5001/deleteClass/${id}`);
                toast.success('Class is Deleted!');
                setTimeout(() => {
                    window.location.reload();
                }, 2500); // Wait for 2.5 seconds before reloading
            } else {
                Swal.fire({
                    title: "Class is Not Deleted",
                    icon: "error",
                });
            }
        } catch (err) {
            console.error(err);
            toast.error('Failed to delete class. Please try again.');
        }
    };

    const filteredClasses = addclasses.filter((addclass) =>
        addclass.grade.toString().toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div>
            <Head/>
       
        <div className="my-classes-container">
            <h2 className="my-classes-title">My Classes</h2>
            <input
                type="text"
                className="search-grade-input"
                placeholder="Search Grade"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
            />
            <table className="classes-table">
                <thead>
                    <tr>
                        <th>Teacher</th>
                        <th>Class Id</th>
                        <th>Teacher Id</th>
                        <th>Subject</th>
                        <th>Time</th>
                        <th>Date</th>
                        <th>Grade</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredClasses.map((addclass) => (
                        <tr key={addclass._id}>
                            <td>{addclass.teacher}</td>
                            <td>{addclass.classid}</td>
                            <td>{addclass.teacherid}</td>
                            <td>{addclass.subject}</td>
                            <td>{addclass.time}</td>
                            <td>{addclass.date}</td>
                            <td>{addclass.grade}</td>
                            <td>
                                <Link to={`/update/${addclass._id}`} className="edit-classes-button">Edit</Link>
                            </td>
                            <td>
                                <button className="delete-button" onClick={() => handleDelete(addclass._id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <br/>
            <Link to="/addclasses" className="add-classes-button">Add Classes</Link><br/><br/>
            <Link to="/additionalclasses" className="viewadditional-classes-button">View Additional classes</Link>
        </div>
        </div>
    );
}

export default TeacherMyClasses;
