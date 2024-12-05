import React, { useEffect, useState } from 'react';
import './profile.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Head from '../Header/Header';

function StudentProfile() {
    const [name, setName] = useState();
    const [stdid, setStdId] = useState();
    const [username, setUsername] = useState();
    const [email, setEmail] = useState();
    const [contactnumber, setContactnumber] = useState();
    const [gender, setGender] = useState();
    const [parentname, setParentName] = useState();
    const [parentphonenumber, setParentPhonenumber] = useState();
    const [secanswer, setSecAnswer] = useState();
    const [profilePhoto, setProfilePhoto] = useState(null);

    useEffect(() => {
        axios.get('/studentprofile')
            .then((res) => {
                setName(res.data.name);
                setStdId(res.data.stdid);
                setUsername(res.data.username);
                setEmail(res.data.email);
                setContactnumber(res.data.contactnumber);
                setGender(res.data.gender);
                setParentName(res.data.parentname);
                setParentPhonenumber(res.data.parentphonenumber);
                setSecAnswer(res.data.SecAnswer);
                fetchProfilePhoto(res.data.stdid); // Fetch profile photo
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    const fetchProfilePhoto = async (studentId) => {
        try {
            const result = await axios.get(`/getimage/${studentId}`);
            setProfilePhoto(result.data.data); // Set the profile photo
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <main>
            <Head />
            <div className='profilecontent'>
                <div>
                    <p className='usertxt'>User Profile</p>
                    <div className="line1"></div>
                    <table>
                        <tbody>
                            <tr>
                                <td>
                                    {profilePhoto && (
                                        <img
                                            src={`http://localhost:5000/profilephotos/${profilePhoto.profile_photo}`}
                                            height={100}
                                            width={100}
                                            alt="profile"
                                        />
                                    )}
                                </td>
                                <td>
                                    <p className='hellotxt'>{name}<br />{stdid}<br />Student</p>
                                </td>
                                <td>
                                    <Link to={'/studentprofileedit'}>
                                        <button className='btnedit' type="submit">Edit User Details</button>
                                    </Link>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <div className="line"></div>
                    <p className='userprofiletxt'>Full name</p>
                    <div className='profilebox'>{name}</div>
                    <p className='userprofiletxt'>Username</p>
                    <div className='profilebox'>{username}</div>
                    <p className='userprofiletxt'>Gender</p>
                    <div className='profilebox'>{gender}</div>
                    <br />
                    <div className="line"></div>
                    <table>
                        <tbody>
                            <tr>
                                <td className='conatctcol'>
                                    <p className='userprofiletxt'>Email Address</p>
                                    <div className='profilebox'>{email}</div>
                                </td>
                                <td>
                                    <p className='userprofiletxt'>Phone Number</p>
                                    <div className='profilebox'>{contactnumber}</div>
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
                                    <div className='profilebox'>{parentname}</div>
                                </td>
                                <td>
                                    <p className='userprofiletxt'>Parent Phone Number</p>
                                    <div className='profilebox'>{parentphonenumber}</div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <br />
                    <div className="line"></div>
                    <p className='userprofiletxt'>Security Question - What city were you born in?</p>
                    <div className='profilebox'>{secanswer}</div>
                    <br />
                    <div className="line"></div>
                    <br />
                </div>
            </div>
        </main>
    );
}

export default StudentProfile;
