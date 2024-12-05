import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { PDFDownloadLink, Document, Page, Text, View, StyleSheet,Image } from '@react-pdf/renderer';


import logo from '../photos/logofull.png';


const FeedbackReport = () => {
    const [allFeedbacks, setAllFeedbacks] = useState([]);
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const selectedMonth = queryParams.get('month');

    useEffect(() => {
        const fetchLessons = async () => {
            try {
                const onlineRes = await axios.get('http://localhost:5000/MySFeedbacks');
                const feedback = onlineRes.data;

                const filteredFeedbacks = feedback.filter(feedback => {
                    const FDate = new Date(feedback.date);
                    return FDate.getMonth() === parseInt(selectedMonth.split('-')[1]) - 1; // Month is zero-based
                });
                setAllFeedbacks(filteredFeedbacks);
            } catch (error) {
                console.error(error);
            }
        };

        fetchLessons();
    }, [selectedMonth]);

    const feedbackcounts = {
        totalfeedbacks: allFeedbacks.length,
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


    const MyDocument = ({ allFeedbacks }) => (
        <Document>
            <Page size="A4">
            <View>
                    <Image src={logo} style={styles.logo} />
                    <Text style={styles.header}>Feedback  Report for {selectedMonth}</Text>
                </View>
                <br /><br /><br /><br />
                <View style={styles.row}>

                  
                    <Text style={styles.cell}>Studet ID</Text>
                    <Text style={styles.cell}>Grade</Text>
                    <Text style={styles.cell}>Feedback</Text>
                    <Text style={styles.cell}>Date</Text>
            
                </View>
                {allFeedbacks.map((feedback, index) => (
                    <View key={index} style={styles.row}>
                     
                        <Text style={styles.cell}>{feedback.sid}</Text>
                        <Text style={styles.cell}>{feedback.grade}</Text>
                        <Text style={styles.cell}>{feedback.feedback}</Text>
                        <Text style={styles.cell}>{feedback.date}</Text>
                
                    </View>
                ))}
                 <View style={styles.statisticsContainer}>
                    <Text style={styles.statisticsText}>Feedback Statistics</Text>
                    <Text style={styles.statisticsText}>Total Feedbacks: {feedbackcounts.totalfeedbacks}</Text>
                    
                </View>
        </Page>
        </Document >

        
    );




return (
    <div>
     
    
    <div className='lesson-report'>
        <div className='bodymvl'>
            <h1 className='h1mvl'>Feedback Report for {selectedMonth}</h1>
            <br /><br /><br /><br />
            <PDFDownloadLink document={<MyDocument allFeedbacks={allFeedbacks} />} fileName="feedback.pdf">
                {({ loading, error }) => (
                    loading ? 'Loading document...' : (error ? 'Error generating PDF' : 'Download PDF')
                )}
            </PDFDownloadLink>
            <div className="table-container">
                <table className="table">
                    <thead>
                        <tr>
                            
                            <th>Studet ID</th>
                            <th>Grade</th>
                            <th>Feedback</th>
                            <th>Date</th>
                          
                        </tr>
                    </thead>
                    <tbody>
                        {allFeedbacks.map((feedback, index) => (
                            <tr key={index}>
                              
                                <td>{feedback.sid}</td>
                                <td>{feedback.grade}</td>
                                <td>{feedback.feedback}</td>
                                <td>{feedback.date}</td>
                           
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div >
                <p  className='static1'>Total Feedbacks: {feedbackcounts.totalfeedbacks}</p>
                </div>
        </div>
    </div>
    </div>
);
};

export default FeedbackReport;

