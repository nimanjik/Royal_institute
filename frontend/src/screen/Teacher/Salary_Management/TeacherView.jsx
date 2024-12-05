import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Head from '../Header/Header';


function TeacherView() {

  const [teachers, setTeachers] = useState([]);



  useEffect(() => {
    axios.get('/teacherprofile')
      .then((res) => {
        const tid= res.data.teid;
        axios.get('/users')
          .then((res) => {
            const viewsalary = res.data.filter(viewsalarys => viewsalarys.TeacherID === tid );
            setTeachers(viewsalary);
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <Head/>
    <div className='bodyE'>
          <div>
      <label className="heading3A"> My Salary</label>
      <table style={{ position: 'absolute', left: '344px', top: '220px', width: '864px', background: '#FFFFFF', padding: '10px', borderCollapse: 'collapse' }}>
  <thead>
    <tr style={{ borderBottom: '1px solid #000000' }}>
      <th style={{ padding: '10px', textAlign: 'left' }}>Teacher Name</th>
      <th style={{ padding: '10px', textAlign: 'left' }}>Teacher ID</th>
      <th style={{ padding: '10px', textAlign: 'left' }}>Subject Name</th>
      <th style={{ padding: '10px', textAlign: 'left' }}>Grade</th>
      <th style={{ padding: '10px', textAlign: 'left' }}>Attend Student</th>
      <th style={{ padding: '10px', textAlign: 'left' }}>Free Card Amount</th>
      <th style={{ padding: '10px', textAlign: 'left' }}>Institute Payment</th>
      <th style={{ padding: '10px', textAlign: 'left' }}>Monthly Salary</th>
      <th style={{ padding: '10px', textAlign: 'left' }}>Date</th>
    </tr>
  </thead>
  <tbody>
    {teachers.map((teacher, index) => (
      <tr key={index} style={{ borderBottom: '1px solid #000000' }}>
        <td style={{ padding: '10px' }}>{teacher.TeacherName}</td>
        <td style={{ padding: '10px' }}>{teacher.TeacherID}</td>
        <td style={{ padding: '10px' }}>{teacher.SubjectName}</td>
        <td style={{ padding: '10px' }}>{teacher.setEnterGrade}</td>
        <td style={{ padding: '10px' }}>{teacher.AttendStudents}</td>
        <td style={{ padding: '10px' }}>{teacher.FreeCardAmount}</td>
        <td style={{ padding: '10px' }}>{teacher.InstitutePayment}</td>
        <td style={{ padding: '10px' }}>{teacher.MonthlySalary}</td>
        <td style={{ padding: '10px' }}>{teacher.Date}</td>
      </tr>
    ))}
  </tbody>
</table>

    </div>

    </div>
    </div>

  )
}

export default TeacherView;
