import './Style2.css'
import { React, useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

function EditMaterials() {

  const { id } = useParams();


  const [lesson_topic, setLessonTopic] = useState();
  const [lesson_date, setLessonDate] = useState();
  const [lesson_fileType, setLessonFileType] = useState();
  const [lesson_description, setLessonDescription] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:5000/getmaterial/' + id)
      .then((res) => {

        setLessonTopic(res.data.lesson_topic);
        setLessonDate(res.data.lesson_date);
        setLessonFileType(res.data.lesson_fileType);
        setLessonDescription(res.data.lesson_description);
      })
  }, [id]);
  const update = (e) => {
    e.preventDefault();
    axios.put('http://localhost:5000/updatematerial/' + id, {

      lesson_topic: lesson_topic,
      lesson_date: lesson_date,
      lesson_fileType: lesson_fileType,
      lesson_description: lesson_description
    })
      .then((res) => {
        console.log('Success');
        Swal.fire(
          'Lesson Updated!',
          'Your Lesson has been successfully updated.',
          'success'
        ).then(() => {
          navigate('/myclasses'); // Redirect to '/myclasses' after displaying the notification
        });
      })
      .catch((err) => {
        console.error(err);
        Swal.fire(
          'Error!',
          'An error occurred while updating the Material.',
          'error'
        );
      });
  }




  return (
    <div class="lessoncontainer">
      <h2 class="form_topic">Edit Lesson Material</h2>
      <hr />
      <br />
      <div class="input_container">

        <form onSubmit={update} >

          <label for="topic">Topic:</label>

          <input type="text" name="topic" placeholder="Enter topic" value={lesson_topic} onChange={(l) => setLessonTopic(l.target.value)} />
          <div class="input_group">
            <div class="input_col">
              <label for="date">Date:</label>

              <input type="date" name="date" value={lesson_date} onChange={(l) => setLessonDate(l.target.value)} />

            </div>
            <div class="input_col">
              <label for="fileType">File Type:</label>

              <select name="fileType" value={lesson_fileType} onChange={(l) => setLessonFileType(l.target.value)}>
                <option value="pdf">PDF</option>
                <option value="image">Image</option>
                <option value="pptx">PPTX</option>
                <option value="Doc">Word Doc</option>
              </select>
            </div>
          </div>
          <label for="description">Description:</label>

          <textarea name="description" placeholder="Enter description" value={lesson_description} onChange={(l) => setLessonDescription(l.target.value)} />

          <div class="button-group">
            <button type='submit'>Save</button>
            <Link to="/myclasses" class="cancelbutton_EM">Cancel</Link>
          </div>
        </form>

      </div>

    </div>
  )
}

export default EditMaterials