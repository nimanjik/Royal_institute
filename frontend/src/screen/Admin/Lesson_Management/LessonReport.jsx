import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { PDFDownloadLink, Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';
import './LessonReport.css';

import logo from '../photos/logofull.png';

const LessonReport = () => {
    const [allLessons, setAllLessons] = useState([]);
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const selectedMonth = queryParams.get('month');

    useEffect(() => {
        const fetchLessons = async () => {
            try {
                const onlineRes = await axios.get('http://localhost:5000/showmaterials');
                const Lesson = onlineRes.data;

                const filteredLessons = Lesson.filter(lesson => {
                    const lessonDate = new Date(lesson.lesson_date);
                    return lessonDate.getMonth() === parseInt(selectedMonth.split('-')[1]) - 1; // Month is zero-based
                });
                setAllLessons(filteredLessons);
            } catch (error) {
                console.error(error);
            }
        };

        fetchLessons();
    }, [selectedMonth]);

    const lessonCounts = {
        totalStudents: allLessons.length,
        ict: allLessons.filter(lesson => lesson.subject_name === 'ICT').length,
        history: allLessons.filter(lesson => lesson.subject_name === 'History').length,
        commerce: allLessons.filter(lesson => lesson.subject_name === 'Commerce').length,
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

    const MyDocument = ({ allLessons }) => (
        <Document>
            <Page size="A4">
                <View>
                    <Image src={logo} style={styles.logo} />
                    <Text style={styles.header}>Lesson material Report for {selectedMonth}</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.cell}>Grade</Text>
                    <Text style={styles.cell}>Subject</Text>
                    <Text style={styles.cell}>Teacher</Text>
                    <Text style={styles.cell}>Date</Text>
                    <Text style={styles.cell}>Topic</Text>
                    <Text style={styles.cell}>File Type</Text>
                </View>
                {allLessons.map((lesson, index) => (
                    <View key={index} style={styles.row}>
                        <Text style={styles.cell}>{lesson.grade}</Text>
                        <Text style={styles.cell}>{lesson.subject_name}</Text>
                        <Text style={styles.cell}>{lesson.teachername}</Text>
                        <Text style={styles.cell}>{lesson.lesson_date}</Text>
                        <Text style={styles.cell}>{lesson.lesson_topic}</Text>
                        <Text style={styles.cell}>{lesson.lesson_fileType}</Text>
                    </View>
                    
                ))}
               <View style={styles.statisticsContainer}>
                    <Text style={styles.statisticsText}>Lessons Statistics</Text>
                    <Text style={styles.statisticsText}>Total Lessons: {lessonCounts.totalStudents}</Text>
                    <Text style={styles.statisticsText}>ICT Lessons: {lessonCounts.ict}</Text>
                    <Text style={styles.statisticsText}>History Lessons: {lessonCounts.history}</Text>
                    <Text style={styles.statisticsText}>Commerce Lessons: {lessonCounts.commerce}</Text>
                </View>
            </Page>
        </Document>
    );

    return (
        <div className='lesson-report'>
            
            <div className='bodymvl'>
                <h1 className='h1mvl'>Lesson Report for {selectedMonth}</h1>
                <PDFDownloadLink document={<MyDocument allLessons={allLessons} />} fileName="lessons.pdf">
                    {({ loading, error }) => (
                        loading ? 'Loading document...' : (error ? 'Error generating PDF' : 'Download PDF')
                    )}
                </PDFDownloadLink>
                <div className="table-container">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Grade</th>
                                <th>Subject</th>
                                <th>Teacher</th>
                                <th>Date</th>
                                <th>Topic</th>
                                <th>File Type</th>
                            </tr>
                        </thead>
                        <tbody>
                            {allLessons.map((lesson, index) => (
                                <tr key={index}>
                                    <td>{lesson.grade}</td>
                                    <td>{lesson.subject_name}</td>
                                    <td>{lesson.teachername}</td>
                                    <td>{lesson.lesson_date}</td>
                                    <td>{lesson.lesson_topic}</td>
                                    <td>{lesson.lesson_fileType}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div>
                    <h1><br/>Lessons Statistics</h1>
                    <div>
                        <p className='static1'>Total Lessons: {lessonCounts.totalStudents}</p>
                        <p className='static1'>ICT Lessons: {lessonCounts.ict}</p>
                        <p className='static1'>History Lessons: {lessonCounts.history}</p>
                        <p className='static1'>Commerce Lessons: {lessonCounts.commerce}</p>
                    </div>
                </div>
            </div>     
        </div>
    );
};

export default LessonReport;
