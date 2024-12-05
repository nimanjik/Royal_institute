import React, { useEffect, useState } from 'react';
import './AdditionalClass.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Head from '../Header/Header';

function AdditionalClasses() {
    const [requestedClasses, setRequestedClasses] = useState([]);
    const [additionalClasses, setAdditionalClasses] = useState([]);

  

    useEffect(() => {
        axios.get('/teacherprofile')
          .then((res) => {
            const tname = res.data.name;
            axios.get('/requestedadditionalclasses/additionalclasses')
              .then((res) => {
                const viewteclass = res.data.filter(viewclasses => viewclasses.teacher === tname );
                setAdditionalClasses(viewteclass);
              })
              .catch((err) => {
                console.log(err);
              });

              axios.get('/requestedadditionalclasses/schedules')
              .then((res) => {
                const viewteclass = res.data.filter(viewclasses => viewclasses.teacher === tname );
                setRequestedClasses(viewteclass);
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
        <div className="additional-classes-container">
            <h2 className="additional-classes-title">View Additional Classes</h2><br/>
            <table className="additionalclasses-table">
                <thead>
                    <tr>
                      
                        <th>Teacher</th>
                        <th>Grade</th>
                        <th>Subject</th>
                        <th>Date1</th>
                        <th>Date2</th>
                        <th>Date3</th>
                        <th>Date4</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {additionalClasses.map((requestedClass) => (
                        <tr key={requestedClass._id}>
                            <td>{requestedClass.teacher}</td>
                            <td>{requestedClass.grade}</td>
                            <td>{requestedClass.subject}</td>
                            <td>{requestedClass.date}</td>
                            <td>{requestedClass.date2}</td>
                            <td>{requestedClass.date3}</td>
                            <td>{requestedClass.date4}</td>
                            <td>{requestedClass.status}</td>
                        </tr>
                    ))}
                    {requestedClasses.map((requestedClass) => (
                        <tr key={requestedClass._id}>
                            <td>{requestedClass.teacher}</td>
                            <td>{requestedClass.grade}</td>
                            <td>{requestedClass.subject}</td>
                            <td>{requestedClass.date1}</td>
                            <td>{requestedClass.date2}</td>
                            <td>{requestedClass.date3}</td>
                            <td>{requestedClass.date4}</td>
                            <td>{requestedClass.status}</td>
                        </tr>
                    ))}
                </tbody>
            </table><br/><br/>
            <Link to="/AddAdditionalClasses" className="add-additional-button">Add Additional Class</Link><br/> <br/><br/>
            <Link to="/viewclasses" className="myclasses-button">My Classes</Link>
        </div>
        </div>
    );
}

export default AdditionalClasses;
