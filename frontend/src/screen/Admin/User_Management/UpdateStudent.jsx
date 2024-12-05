import React, { useEffect, useState } from 'react'
import './profile.css';
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Head from '../Header/Header';
import Swal from 'sweetalert2';

function UpdateStudent() {

    const navigate = useNavigate();
    const [sid, setSid] = useState('');
    const [name, setName] = useState('');
    const [stdid, setstdid] = useState('');
    const [username, setUsername] = useState('');
    const [gender, setGender] = useState('');
    const [email, setEmail] = useState('');
    const [contactnumber, setContactnumber] = useState('');
    const [parentname, setParentName] = useState('');
    const [parentphonenumber, setParentPhonenumber] = useState('');
    const [secanswer, setSecAnswer] = useState('');   
    const [show_profile_photo, setProfilePhotoView] = useState(null);
    const { id } = useParams();  

    useEffect(() => {
        axios.get(`/studentprofileid/${id}`)
            .then((res) => {
                setSid(res.data._id);
                setName(res.data.name);
                setstdid(res.data.stdid);
                setUsername(res.data.username);
                setEmail(res.data.email);
                setContactnumber(res.data.contactnumber);
                setGender(res.data.gender);
                setParentName(res.data.parentname);
                setParentPhonenumber(res.data.parentphonenumber);
                setSecAnswer(res.data.SecAnswer);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [id]);

    const updateStudent = async (e) => {
        e.preventDefault(); 
        try {
            await axios.put(`/studentprofileeditid/${sid}`, {
                name,
                username,
                gender,
                email,
                contactnumber,
                parentname,
                parentphonenumber,
                secanswer
            })
        
            await Swal.fire({
                icon: 'success',
                title: 'Success',
                text: 'Student details updated successfully!',
                confirmButtonText: 'OK'
            });
            navigate('/searchusersadmin');
            } catch (error) {
            console.error(error);
        
            await Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'An error occurred while adding student details. Please try again later.',
                confirmButtonText: 'OK'
            });
            }
    };

    useEffect(() => {
        getImage();
    }, []);

    const getImage = async () => {
        try {
            const result = await axios.get('/getimage');
            setProfilePhotoView(result.data.data);
        } catch (error) {
            console.error(error);
        }
    };

  return (
    <main>
            <Head/>
            <div className='profilecontent'>
                <div>
                    <p className='usertxt'>User Profile</p>
                    <div className="line1"></div>
                    <table>
                        <tbody>
                            <tr>
                                <td>
                                    {show_profile_photo === null
                                        ? ""
                                        : show_profile_photo.map((data, index) => (
                                            <div key={index}>
                                                <img
                                                    src={`http://localhost:5000/profilephotos/${data.profile_photo}`}
                                                    height={100}
                                                    width={100}
                                                    alt="profile"
                                                />
                                                <br />                                                

                                            </div>
                                            
                                        ))}

                                </td>
                                <td>
                                <p class='hellotxt'>{name}<br/>{stdid}<br/>Student</p>
                                </td>                               

                            </tr>
                        </tbody>
                    </table>
                    <br />
                    <div className="updateform">
                        <form onSubmit={updateStudent}>
                            <div className="line"></div>
                            <p className='userprofiletxt'>Full name</p>
                            <input type="text" id="name" name="name" className="profileboxshow" value={name} onChange={(e) => setName(e.target.value)} />
                            <p className='userprofiletxt'>Username</p>
                            <input type="text" id="username" name="username" className="profileboxshow" value={username} onChange={(e) => setUsername(e.target.value)} />
                            <p className='userprofiletxt'>Gender</p>
                            <table className='gendertbl'>
                                <tbody>
                                    <tr>
                                        <td>
                                            <input type="radio" id="gender" name="gender" value="Male" checked={gender === 'Male'} onChange={(e) => setGender(e.target.value)} />
                                        </td>
                                        <td>
                                            <p className='gendertxt'>Male</p>
                                        </td>
                                        <td>
                                            <input type="radio" id="gender" name="gender" value="Female" checked={gender === 'Female'} onChange={(e) => setGender(e.target.value)} />
                                        </td>
                                        <td>
                                            <p className='gendertxt'>Female</p>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <div className="line"></div>
                            <table>
                                <tbody>
                                    <tr>
                                        <td className='conatctcol'>
                                            <p className='userprofiletxt'>Email Address</p>
                                            <input type="text" id="email" name="email" className="profileboxshow" value={email} onChange={(e) => setEmail(e.target.value)} />
                                        </td>
                                        <td>
                                            <p className='userprofiletxt'>Phone Number</p>
                                            <input type="number" id="cnumber" name="cnumber" className="profileboxshow" value={contactnumber} onChange={(e) => setContactnumber(e.target.value)} />
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <br />
                            <div className="line"></div>
                            <table>
                                <tbody>
                                    <tr>
                                        <td className='conatctcol'>
                                            <p className='userprofiletxt'>Parent Name</p>
                                            <input type="text" id="pname" name="pname" className="profileboxshow" value={parentname} onChange={(e) => setParentName(e.target.value)} />
                                        </td>
                                        <td>
                                            <p className='userprofiletxt'>Parent Phone Number</p>
                                            <input type="number" id="pcnumber" name="pcnumber" className="profileboxshow" value={parentphonenumber} onChange={(e) => setParentPhonenumber(e.target.value)} />
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <br />
                            <div className="line"></div>
                            <p className='userprofiletxt'>Security Question - What city were you born in?</p>
                            <input type="text" id="qans" name="qans" className="profileboxshow" value={secanswer} onChange={(e) => setSecAnswer(e.target.value)} />
                            <br /><br />
                            <table>
                                <tbody>
                                    <tr>
                                        <td>
                                            <button className='btnedit' type="submit">Save changes</button>
                                        </td>
                                        <td>
                                            <Link to={'/searchusersadmin'}><button className='btnedit'>Cancel</button></Link>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </form>
                    </div>
                </div>
            </div>
        </main>
  )
}

export default UpdateStudent
