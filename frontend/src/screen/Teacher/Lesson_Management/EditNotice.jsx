import React, { useEffect } from 'react'
import './Style.css'
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';
import Swal from 'sweetalert2';



function EditNotice() {

    const { id } = useParams();
    const [topic, setTopic] = useState();
    const [date, setDate] = useState();
    const [description, setDescription] = useState();
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:5000/getnotice/' + id)
            .then((res) => {
                setTopic(res.data.topic);
                setDate(res.data.date);
                setDescription(res.data.description);
            })
    }, [id]);



    const update = (e) => {
        e.preventDefault();
        axios.put('http://localhost:5000/updatenotice/' + id, {
            topic: topic,
            date: date,
            description: description
        })
            .then((res) => {
                console.log('Success');
                Swal.fire(
                    'Notice Updated!',
                    'Your notice has been successfully updated.',
                    'success'
                ).then(() => {
                    navigate('/myclasses'); 
                });
            })
            .catch((err) => {
                console.error(err);
                Swal.fire(
                    'Error!',
                    'An error occurred while updating the notice.',
                    'error'
                );
            });
    }



    return (

        <div class="Noticecontainer">
            <h2 class="form_topic">Edit Notice</h2>

            <div class="input_container">


                <form onSubmit={update}>
                    <label for="topic">Notice Topic:</label>

                    <input type="text" name="topic" placeholder="Enter topic" value={topic} onChange={(e) => setTopic(e.target.value)} required />
                    <div class="input_group">
                        <div class="input_col">
                            <label for="date">Date:</label>
                            <input type="date" name="date" value={date} onChange={(e) => setDate(e.target.value)} required />
                        </div>

                    </div>
                    <label for="description">Description:</label>
                    <input type="text" name="description" placeholder="Enter description" value={description} onChange={(e) => setDescription(e.target.value)} required />

                    <div class="button-group">
                        <button type="submit">Edit</button>
                        <Link to="/myclasses" class="cancelbutton_EN">Cancel</Link>
                    </div>
                </form>



            </div>

        </div>
    )
}

export default EditNotice