import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Head from '../Header/Header'

import Swal from 'sweetalert2';
import './MyClasses.css';



//icons
import { FaArrowCircleDown } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { IoIosAddCircle } from "react-icons/io";
import { IoIosArrowDroprightCircle } from "react-icons/io";




function MyClasses() {
  const [notices, setNotices] = useState([]);
  const [materials, setMaterials] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [teacher, setTeacher] = useState('');
  const [subject, setSubject] = useState('');

  useEffect(() => {
    axios.get('http://localhost:5000/viewnotice')
      .then(res => {
        setNotices(res.data);
      })
      .catch(err => console.error(err));

    axios.get('http://localhost:5000/showmaterials')
      .then(res => {
        setMaterials(res.data);
      })
      .catch(err => console.error(err));
  }, []);

  useEffect(() => {
    axios.get('/teacherprofile')
      .then((res) => {
        const tid = res.data.teid;

        axios.get('/viewnotice')
          .then((noticeRes) => {
            const viewnotice = noticeRes.data.filter(viewnotices => viewnotices.teacher_id === tid);
            setNotices(viewnotice);
          })
          .catch((err) => {
            console.log(err);
          });

        axios.get('/showmaterials')
          .then((materialsRes) => {
            const viewmaterials = materialsRes.data.filter(viewmaterials => viewmaterials.teacher_id === tid);
            setMaterials(viewmaterials);
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleDeleteNotice = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "Are you sure you want to delete this notice?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete('http://localhost:5000/deletenotice/' + id)
          .then((res) => {
            console.log('success');
            Swal.fire(
              'Deleted!',
              'Your notice has been deleted.',
              'success'
            ).then(() => {
              window.location.reload();
            });
          })
          .catch((err) => {
            console.error(err);
            Swal.fire(
              'Error!',
              'An error occurred while deleting the notice.',
              'error'
            );
          });
      }
    });
  }

  const handleDeleteMaterial = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "Are you sure you want to delete this material?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete('http://localhost:5000/deletematerial/' + id)
          .then((res) => {
            console.log('success');
            Swal.fire(
              'Deleted!',
              'Your material has been deleted.',
              'success'
            ).then(() => {
              window.location.reload();
            });
          })
          .catch((err) => {
            console.error(err);
            Swal.fire(
              'Error!',
              'An error occurred while deleting the material.',
              'error'
            );
          });
      }
    });
  }

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredMaterials = materials.filter(material =>
    material.lesson_topic.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const noticesByGrade = {};
  const materialsByGrade = {};

  notices.forEach(notice => {
    if (!noticesByGrade[notice.grade]) {
      noticesByGrade[notice.grade] = [];
    }
    noticesByGrade[notice.grade].push(notice);
  });

  filteredMaterials.forEach(material => {
    if (!materialsByGrade[material.grade]) {
      materialsByGrade[material.grade] = [];
    }
    materialsByGrade[material.grade].push(material);
  });

  const renderNotices = () => {
    const noticeComponents = [];
    for (let grade = 6; grade <= 11; grade++) {
      if (noticesByGrade[grade]) {
        noticeComponents.push(
          <div key={`grade-${grade}`}>
            <h3 style={{ color: '#191970' }}>Grade {grade} Notices</h3>
            <hr />
            {noticesByGrade[grade].map(notice => (
              <div className="notice" key={notice._id}>
               
                <div className="notice-date">{notice.date}</div>
                <br />
                <div className="notice-title">{notice.topic}</div>
                <div className="notice-description">{notice.description}</div>
                <Link to={`/editnotice/${notice._id}`} className="edit_button">Edit Notice <FaEdit style={{ marginTop: '5px', marginLeft: '2px', fontSize: '13px' }} /></Link>
                <button className="delete_button" onClick={(e) => handleDeleteNotice(notice._id)}>Delete Notice <MdDelete style={{ marginTop: '5px', marginLeft: '2px', fontSize: '13px' }} /> </button>
              </div>
            ))}
          </div>
        );
      }
    }
    return noticeComponents;
  };

  const renderMaterials = () => {
    const materialComponents = [];
    for (let grade = 6; grade <= 11; grade++) {
      if (materialsByGrade[grade]) {
        materialComponents.push(
          <div key={`grade-${grade}`}>
            <h3 style={{ color: '#191970' }}>Grade {grade} Materials</h3>
            <hr />

            {materialsByGrade[grade].map(material => (
              <div className="lesson" key={material._id}>
               
                <div className="lesson-date">Date: {material.lesson_date}</div>
                <br />
                <div className="lesson-title">{material.lesson_topic}</div>
                <div className="lesson-description">  {material.lesson_description}</div>
                <button className="material_link" onClick={() => showFile(material.lesson_Files)}>View Material <IoIosArrowDroprightCircle style={{ marginTop: '5px', marginLeft: '2px', fontSize: '12px' }} /></button>
                <button className="material_link" onClick={() => downloadFile(material.lesson_Files)} >Download <FaArrowCircleDown style={{ marginTop: '5px', marginLeft: '2px', fontSize: '12px' }} /></button>
                <Link to={`/editmaterial/${material._id}`} className="edit_button">Edit Material <FaEdit style={{ marginTop: '5px', marginLeft: '2px', fontSize: '13px' }} /></Link>
                <button className="delete_button" onClick={(e) => handleDeleteMaterial(material._id)}>Delete Notice <MdDelete style={{ marginTop: '5px', marginLeft: '2px', fontSize: '13px' }} /> </button>
              </div>
            ))}
          </div>
        );
      }
    }
    return materialComponents;
  };

  const showFile = (lesson_Files) => {
    window.open(`http://localhost:5000/files/${lesson_Files}`, "_blank", "noreferrer");
  };

  const downloadFile = async (lesson_Files) => {
    try {
      const url = `http://localhost:5000/files/${lesson_Files}`;
      const response = await axios.get(url, {
        responseType: 'blob'
      });
      const file = new Blob([response.data]);
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(file);
      link.setAttribute('download', lesson_Files);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Error downloading file:', error);
    }
  };

  useEffect(() => {
    axios.get('/teacherprofile')
      .then((res) => {
        setTeacher(res.data.name);
        setSubject(res.data.subject);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <Head />
      <div className="container">
        <div className="main-content">
          <div className="class_details">
            <h2>Class Details</h2>
            <div className="class-info">
              <div className="class-title">{subject}</div>
              <i className="fa-solid fa-cloud-arrow-down"></i>
              <div className="class-detail">Teacher: {teacher}</div>
            </div>
          </div>
          <div className="notices">
            <h2 style={{ color: 'black' }}>Notices</h2>
            <Link to="/createnotice" className="add_button ">
              Add New Notice <IoIosAddCircle style={{ marginTop: '5px', marginLeft: '2px', fontSize: '13px' }} />
            </Link>
            {renderNotices()}
          </div>
          <div className="lesson-container">
            <h2>Lesson Materials</h2>
            <Link to="/addmaterial" className="add_button ">
              Add New Material <IoIosAddCircle style={{ marginTop: '5px', marginLeft: '2px', fontSize: '13px' }} />
            </Link>
            <div className="search_bar_container">
              <input type="search" className="search_input" placeholder="Search Materials..." value={searchTerm} onChange={handleSearchChange} />
            </div>
            {renderMaterials()}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyClasses;
