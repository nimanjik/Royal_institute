import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Manager.css';
import toast, { Toaster } from 'react-hot-toast';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import Head from '../Header/Header';

function Manager() {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const navigator = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:5000/users')
      .then((res) => {
        setUsers(res.data);
      })
      .catch((err) => console.error(err));
  }, []);

  const handleDelete = (id) => {
    axios.delete('http://Localhost:5000/deleteUser/' + id)
      .then((res) => {

      })
      .catch((err) => console.error(err));
  }



  const filteredUsers = users.filter((user) => {
    return user.TeacherName.toLowerCase().includes(searchQuery.toLowerCase());
  });

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSubmit = (id) => {
    Swal.fire({
      title: "Delete Payment",
      text: "Are you sure you want to delete the Payment Record?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, proceed!",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        handleDelete(id); // Call handleDelete function with payment ID
        Swal.fire({
          title: "Payment is Deleted",
          icon: "success",
        });
        handleClick2();
      } else {
        Swal.fire({
          title: "Changes are Canceled",
          icon: "error",
        });
      }
    });
  };


  const handleClick2 = () => {
    toast.loading('Salary is Deleting...', {
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
        toast.success('Salary is Deleted!', {
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
          navigator('/homemain');
        }, 2500); // Wait for 2 seconds after displaying success toast before navigating
      }, 2500); // Wait for 2 seconds after dismissing loading toast before displaying success toast
    }, 5000); // Wait for 5 seconds before dismissing loading toast
  };

  
    //show file
    const showFile = (upload_paymentFiles) => {
      window.open(`http://localhost:5000/files3/${upload_paymentFiles}`, "_blank", "noreferrer");
    };



  return (
    <div>
      <Head />
      <Toaster />
      <div className='bodykn1'>
        <h1 className='h1kn'><br></br>My Salary</h1>
        <br /><br /><br /><br />
        <div className="search_bar_container1">
          <input
            type="search"
            className='search_input'
            placeholder="Search by teacher name..."
            value={searchQuery}
            onChange={handleSearchChange}
          />


          <br></br>
          <br></br>

          <div className='tbl-headerkn'>
            <table className='tablekn'>
              <tr>
                <th className='thkn' >Teacher Name</th>
                <th className='thkn'>Teacher ID</th>
                <th className='thkn'>Subject Name</th>
                <th className='thkn'>Grade</th>
                <th className='thkn'>Attend Students</th>
                <th className='thkn'>Free Card Amount</th>
                <th className='thkn'>Institute Payment</th>
                <th className='thkn'>Monthly Salary</th>
                <th className='thkn'>Date</th>
                <th className='thkn'>Action</th>

                <th ></th>
              </tr>
            </table>
          </div>

          <div className='tbl-contentkn'>
            <table className='tablekn'>
              {filteredUsers.map((salary) => (
                <tr key={salary._id}>
                  <td className='tdkn'>{salary.TeacherName}</td>
                  <td className='tdkn'>{salary.TeacherID}</td>
                  <td className='tdkn'>{salary.SubjectName}</td>
                  <td className='tdkn'>{salary.Grade}</td>
                  <td className='tdkn'>{salary.AttendStudents}</td>
                  <td className='tdkn'>{salary.FreeCardAmount}</td>
                  <td className='tdkn'>{salary.InstitutePayment}</td>
                  <td className='tdkn'>{salary.MonthlySalary}</td>
                  <td className='tdkn'>{salary.Date}</td>
                  <td className='tdkn'>
                    <Link to={`/updatesal/${salary._id}`}>
                      <button className='buttonkn4'>Update</button>
                    </Link>
                  </td>
                  <td className='tdkn'>
                    <button className="buttonkn4" onClick={() => showFile(salary.upload_paymentFiles)}>view</button>
                  </td>

                  <td className='tdkn'>
                    <button className='buttonkn5' onClick={() => handleSubmit(salary._id)}>Delete</button>
                  </td>

                </tr>
              ))}
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Manager;
