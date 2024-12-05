import React, { useEffect, useState } from 'react';
import './AddMaterial.css';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import Swal from 'sweetalert2';

function AddMaterials() {
  const [lesson_topic, setLessonTopic] = useState('');
  const [lesson_files, setLessonFiles] = useState(null);
  const [lesson_date, setLessonDate] = useState('');
  const [lesson_fileType, setLessonFileType] = useState('');
  const [lesson_description, setLessonDescription] = useState('');
  const [subject_name, setClass_id] = useState('');
  const [grade, setGrade] = useState('');
  const [teacher_id, setTeacher_id] = useState('');
  const [teachername, setTeachername] = useState('');
  const [fileSizeError, setFileSizeError] = useState('');

  const navigate = useNavigate();

  // Effect to set current date
  useEffect(() => {
    const today = new Date();
    const yyyy = today.getFullYear();
    let mm = today.getMonth() + 1;
    let dd = today.getDate();

    if (mm < 10) mm = '0' + mm;
    if (dd < 10) dd = '0' + dd;

    const formattedDate = yyyy + '-' + mm + '-' + dd;
    setLessonDate(formattedDate);
  }, []);

  // Effect to fetch teacher profile
  useEffect(() => {
    axios.get('/teacherprofile')
      .then((res) => {
        setTeacher_id(res.data.teid);
        setClass_id(res.data.subject);
        setTeachername(res.data.name);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const submitFile = async (e) => {
    e.preventDefault();

    // Check file size before submission
    const fileSizeLimit = 10 * 1024 * 1024; // 10MB
    if (lesson_files && lesson_files.size > fileSizeLimit) {
      setFileSizeError('File size exceeds 10MB limit.');
      return;
    }

    // Reset file size error if there's no issue
    setFileSizeError('');

    const formData = new FormData();
    formData.append('file', lesson_files);
    formData.append('lesson_topic', lesson_topic);
    formData.append('lesson_date', lesson_date);
    formData.append('lesson_fileType', lesson_fileType);
    formData.append('lesson_description', lesson_description);
    formData.append('subject_name', subject_name);
    formData.append('grade', grade);
    formData.append('teacher_id', teacher_id);
    formData.append('teachername', teachername);

    try {
      await axios.post('http://localhost:5000/addmaterial', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      await Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Material added successfully!',
        confirmButtonText: 'OK'
      });
      navigate('/myclasses');
    } catch (error) {
      console.error(error);

      await Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'An error occurred while adding the material. Please try again later.',
        confirmButtonText: 'OK'
      });
    }
  };

  // Handle file drop
  const handleDrop = (e) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    setLessonFiles(files[0]);
  };

  // Render
  return (
    <div className="adm_container">
      <h2 className="form_topic">Lesson Material Upload</h2>
      <hr />
      <br />

      <div className="drop-area" onDrop={handleDrop}>
        <h3>Drag and Drop Files Here</h3>
        <p>or</p>
        <label htmlFor="fileInput" className="file_input">
          <input
            type="file"
            accept=".pdf, .png, .jpg, .jpeg, .pptx, .doc"
            required
            onChange={(e) => setLessonFiles(e.target.files[0])}
          />
          Choose File
        </label>
      </div>

      {fileSizeError && <p className="error-message">{fileSizeError}</p>}

      <h2 className="form_topic">Lesson Material Details</h2>
      <hr />
      <div className="input_container">
        <form onSubmit={submitFile}>
          {/* Remaining form elements */}
          <label htmlFor="grade" className="input_col">Enter Grade:</label>
          <select id="grade" name="grade" required onChange={(a) => setGrade(a.target.value)}>
            <option value="">Select</option>
            <option value="06">6</option>
            <option value="07">7</option>
            <option value="08">8</option>
            <option value="09">9</option>
            <option value="10">10</option>
            <option value="11">11</option>
          </select>

          <label htmlFor="topic">Topic:</label>
          <input type="text" name="topic" placeholder="Enter topic" onChange={(e) => setLessonTopic(e.target.value)} required />
          <div className="input_group">
            <div className="input_col">
              <label htmlFor="date">Date:</label>
              <input
                type="date"
                name="date"
                min={lesson_date} // Set the minimum date to the current date
                value={lesson_date} // Automatically fill the current date
                onChange={(e) => setLessonDate(e.target.value)}
                required
              />


            </div>
            <div className="input_col">
              <label htmlFor="fileType">File Type:</label>
              <select name="fileType" onChange={(e) => setLessonFileType(e.target.value)}>
                <option value="pdf">Select</option>
                <option value="pdf">PDF</option>
                <option value="image">Image/Png</option>
                <option value="pptx">PPTX</option>
                <option value="doc">Word DOC</option>
              </select>
            </div>
          </div>

          <label htmlFor="description">Description:</label>
          <textarea name="description" placeholder="Enter description" onChange={(e) => setLessonDescription(e.target.value)} required></textarea>

          <input type="hidden" name="class_id" value={subject_name} onChange={(e) => setClass_id(e.target.value)} />
          <input type="hidden" name="teacher_id" value={teacher_id} onChange={(e) => setTeacher_id(e.target.value)} />

          <div className="ad_button_group">
            <button type="submit">Upload</button>
            <Link to="/myclasses" className="cancelbutton_AM">
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddMaterials;
