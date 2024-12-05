import React, { useEffect, useState } from 'react';
import './RequestedAdditionalClasses.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Head from '../Header/Header'

function RequestedAdditionalClasses() {
    const [addAdditionalClasses, setAddAdditionalClasses] = useState([]);
    const [requestSchedule, setRequestSchedule] = useState([]);

    // Fetch requested additional classes
    useEffect(() => {
        axios.get('http://localhost:5000/requestedadditionalclasses/additionalclasses')
            .then((res) => {
                setAddAdditionalClasses(res.data);
            })
            .catch((err) => console.error(err));
    }, []);

    // Fetch requested schedules
    useEffect(() => {
        axios.get('http://localhost:5000/requestedadditionalclasses/schedules')
            .then((res) => {
                setRequestSchedule(res.data);
            })
            .catch((err) => console.error(err));
    }, []);

    const handleDeleteAdditionalClass = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/deleteAdditionalClass/${id}`);
            window.location.reload(); // Refresh the page after deletion
        } catch (err) {
            console.error(err);
        }
    };

    const handleDeleteSchedule = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/deleteSchedule/${id}`);
            window.location.reload(); // Refresh the page after deletion
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div>
            <Head/>
     
        <div className="requested-classes-container">
            <h2 className="requested-classes-title">Requested Additional Classes</h2>
            <table className="requestedclasses-table">
                <thead>
                    <tr>
                        <th>Teacher</th>
                        <th>Grade</th>
                        <th>Subject</th>
                        <th>Date 1</th>
                        <th>Date 2</th>
                        <th>Date 3</th>
                        <th>Date 4</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {addAdditionalClasses.map((addAdditionalClass) => (
                        <tr key={addAdditionalClass._id}>
                            <td>{addAdditionalClass.teacher}</td>
                            <td>{addAdditionalClass.grade}</td>
                            <td>{addAdditionalClass.subject}</td>
                            <td>{addAdditionalClass.date}</td>
                            <td>{addAdditionalClass.date2}</td>
                            <td>{addAdditionalClass.date3}</td>
                            <td>{addAdditionalClass.date4}</td>
                            <td>
                                <Link to={`/approvalclasses/${addAdditionalClass._id}`}>Edit</Link><br/><br/>
                                <button className="cancel-button" onClick={() => handleDeleteAdditionalClass(addAdditionalClass._id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                    {requestSchedule.map((schedule) => (
                        <tr key={schedule._id}>
                            <td>{schedule.teacher}</td>
                            <td>{schedule.grade}</td>
                            <td>{schedule.subject}</td>
                            <td>{schedule.date1}</td>
                            <td>{schedule.date2}</td>
                            <td>{schedule.date3}</td>
                            <td>{schedule.date4}</td>
                            <td>
                                <Link to={`/approvalclasses/${schedule._id}`}>Edit</Link><br/><br/>
                                <button className="cancel-button" onClick={() => handleDeleteSchedule(schedule._id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        </div>
    );
}

export default RequestedAdditionalClasses;
