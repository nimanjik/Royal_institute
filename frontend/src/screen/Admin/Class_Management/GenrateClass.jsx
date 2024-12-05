import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { PDFDownloadLink, Document, Page, Text, View, StyleSheet,Image } from '@react-pdf/renderer';

import logo from '../photos/logofull.png';


const ClassReport = () => {
    const [allClasses, setAllClasses] = useState([]);
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const selectedMonth = queryParams.get('month');

    useEffect(() => {
        const fetchLessons = async () => {
            try {
                const onlineRes = await axios.get('http://localhost:5000/requestedadditionalclasses/additionalclasses');
                const classes = onlineRes.data;

                const filteredClasses = classes.filter(classes => {
                    const classDate = new Date(classes.date);
                    return classDate.getMonth() === parseInt(selectedMonth.split('-')[1]) - 1; // Month is zero-based
                });
                setAllClasses(filteredClasses);
            } catch (error) {
                console.error(error);
            }
        };

        fetchLessons();
    }, [selectedMonth]);

    const classcounts = {
        totalclasses: allClasses.length,
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


    const MyDocument = ({ allClasses }) => (
        <Document>
            <Page size="A4">
                <View>
                    <Image src={logo} style={styles.logo} />
                    <Text style={styles.header}>Class  Report for {selectedMonth}</Text>
                </View>
                <br /><br /><br /><br />
                
                <br /><br /><br /><br />
                <View style={styles.row}>

                    <Text style={styles.cell}>Teacher</Text>
                    <Text style={styles.cell}>Grade</Text>
                    <Text style={styles.cell}>Subject</Text>
                    <Text style={styles.cell}>Date1</Text>
                    <Text style={styles.cell}>Status</Text>


                </View>
                {allClasses.map((classes, index) => (
                    <View key={index} style={styles.row}>

                        <Text style={styles.cell}>{classes.teacher}</Text>
                        <Text style={styles.cell}>{classes.grade}</Text>
                        <Text style={styles.cell}>{classes.subject}</Text>
                        <Text style={styles.cell}>{classes.date}</Text>

                        <Text style={styles.cell}>{classes.status}</Text>
                    </View>
                ))}
                 <View style={styles.statisticsContainer}>
                    <Text style={styles.statisticsText}>Class Statistics</Text>
                    <Text style={styles.statisticsText}>Total Classes: {classcounts.totalclasses}</Text>
                </View>
                   
            </Page>
        </Document >


    );




    return (
        <div className='lesson-report'>
            <div className='bodymvl'>
                <h1 className='h1mvl'>Class Report for {selectedMonth}</h1>
                <br /><br /><br /><br />
                <PDFDownloadLink document={<MyDocument allClasses={allClasses} />} fileName="Classs.pdf">
                    {({ loading, error }) => (
                        loading ? 'Loading document...' : (error ? 'Error generating PDF' : 'Download PDF')
                    )}
                </PDFDownloadLink>
                <div className="table-container">
                    <table className="table">
                        <thead>
                            <tr>

                                <th>Teacher</th>
                                <th>Grade</th>
                                <th>Subject</th>
                                <th>Date1</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {allClasses.map((classes, index) => (
                                <tr key={index}>

                                    <td>{classes.teacher}</td>
                                    <td>{classes.grade}</td>
                                    <td>{classes.subject}</td>
                                    <td>{classes.date}</td>

                                    <td>{classes.status}</td>

                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div >
                <p  className='static1'>Total Classes: {classcounts.totalclasses}</p>
                </div>
            </div>
        </div>
    );
};

export default ClassReport;

