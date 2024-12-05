import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { PDFDownloadLink, Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';
import logo from '../photos/logofull.png';

const UserReport = () => {
    const [allusers, setAllUsers] = useState([]);
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const selectedMonth = queryParams.get('month');

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const onlineRes = await axios.get('http://localhost:5000/getstudentsadmin');
                const User = onlineRes.data;

                const filteredUsers = User.filter(User => {
                    const UserDate = new Date(User.createdAt);
                    return UserDate.getMonth() === parseInt(selectedMonth.split('-')[1]) - 1; // Month is zero-based
                });
                setAllUsers(filteredUsers);
            } catch (error) {
                console.error(error);
            }
        };

        fetchUsers();
    }, [selectedMonth]);


    const usercounts = {
        totalcounts: allusers.length,
    };


    const styles = StyleSheet.create({
        page: {
            padding: 40,
            marginTop: 60,
            backgroundColor: '#f0f0f0', // Light gray background
        },
        row: {
            flexDirection: 'row',
            borderBottomWidth: 1,
            borderBottomColor: '#ccc', // Light gray border
            alignItems: 'center',
            minHeight: 24,
            marginTop: 30, // Increased margin-top for more space between rows
            marginLeft: 10,
            backgroundColor: '#fff', // White background
            borderRadius: 8, // Rounded corners
            padding: 10, // Increased padding
            shadowColor: '#000', // Shadow color
            shadowOffset: { width: 0, height: 2 }, // Shadow offset
            shadowOpacity: 0.25, // Shadow opacity
            shadowRadius: 3, // Shadow radius
            elevation: 5, // Android shadow
        },
        header: {
            marginLeft: 160,
            fontSize: 20, // Larger font size
            fontWeight: 'bold',
            color: '#333', // Dark gray text color
            flex: 1, // Expanded to fill space
        },
        cell: {
            flex: 1,
            fontSize: 12,
            color: '#666', // Medium gray text color
        },
        logo: {
            marginLeft: 200,
            marginBottom: 20,
            width: 200, // Adjust as needed
            height: 60, // Adjust as needed
        },
    });


    const MyDocument = ({ allusers }) => (
        <Document>
            <Page size="A4">
                <View>
                    <Image src={logo} style={styles.logo} />
                    <Text style={styles.header}>User  Report for {selectedMonth}</Text>
                </View>
                <br /><br /><br /><br />
                <View style={styles.row}>


                    <Text style={styles.cell}>Student Name</Text>

                    <Text style={styles.cell}>Phone</Text>
                    <Text style={styles.cell}>Grade</Text>
                    <Text style={styles.cell}>User Name</Text>
                    <Text style={styles.cell}>Student ID</Text>
                    <Text style={styles.cell}>Gender</Text>
                </View>
                {allusers.map((user, index) => (
                    <View key={index} style={styles.row}>

                        <Text style={styles.cell}>{user.name}</Text>

                        <Text style={styles.cell}>{user.contactnumber}</Text>
                        <Text style={styles.cell}>{user.grade}</Text>
                        <Text style={styles.cell}>{user.username}</Text>
                        <Text style={styles.cell}>{user.stdid}</Text>
                        <Text style={styles.cell}>{user.gender}</Text>
                    </View>
                    
                ))}
                <View style={styles.statisticsContainer}>
                                <Text style={styles.statisticsText}>User Statistics</Text>
                                <Text style={styles.statisticsText}>Total Users: {usercounts.totalcounts}</Text>

                            </View>
            </Page>
        </Document >


    );




    return (
        <div className='lesson-report'>
            <div className='bodymvl'>
                <h1 className='h1mvl'>User Report for {selectedMonth}</h1>
                <br /><br /><br /><br />
                <PDFDownloadLink document={<MyDocument allusers={allusers} />} fileName="user.pdf">
                    {({ loading, error }) => (
                        loading ? 'Loading document...' : (error ? 'Error generating PDF' : 'Download PDF')
                    )}
                </PDFDownloadLink>
                <div className="table-container">
                    <table className="table">
                        <thead>
                            <tr>

                                <th>Student Name</th>

                                <th>Phone</th>
                                <th>Grade</th>
                                <th>User Name</th>
                                <th>Student ID</th>
                                <th>Gender</th>

                            </tr>
                        </thead>
                        <tbody>
                            {allusers.map((user, index) => (
                                <tr key={index}>

                                    <td>{user.name}</td>

                                    <td>{user.contactnumber}</td>
                                    <td>{user.grade}</td>
                                    <td>{user.username}</td>
                                    <td>{user.stdid}</td>
                                    <td>{user.gender}</td>
                                </tr>
                            ))}
                            
                        </tbody>
                    </table>
                </div>
                <div >
                    <p className='static1'>Total Users: {usercounts.totalcounts}</p>
                </div>
            </div>
        </div>
    );
};

export default UserReport;

