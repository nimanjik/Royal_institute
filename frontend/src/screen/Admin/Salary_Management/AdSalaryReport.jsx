import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { PDFDownloadLink, Document, Page, Text, View, StyleSheet,Image } from '@react-pdf/renderer';
import logo from '../photos/logofull.png';

const SalaryReport = () => {
    const [allSalary, setAllSalary] = useState([]);
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const selectedMonth = queryParams.get('month');

    useEffect(() => {
        const fetchSalary = async () => {
            try {
                const onlineRes = await axios.get('http://localhost:5000/users');
                const Salary = onlineRes.data;

                const filteredSalary = Salary.filter(Salary => {
                    const SalaryDate = new Date(Salary.Date);
                    return SalaryDate.getMonth() === parseInt(selectedMonth.split('-')[1]) - 1; // Month is zero-based
                });
                setAllSalary(filteredSalary);
            } catch (error) {
                console.error(error);
            }
        };

        fetchSalary();
    }, [selectedMonth]);


    const salrycounts = {
        totalcounts: allSalary.length,
    };
    
    const totalstudents = allSalary.reduce((total, salary) => total + parseFloat(salary.AttendStudents), 0);
    const totalfreecardAmount = allSalary.reduce((total, salary) => total + parseFloat(salary.FreeCardAmount), 0);
    const totalinstutitepayment = allSalary.reduce((total, salary) => total + parseFloat(salary.InstitutePayment), 0);
    const totalmothlysalry = allSalary.reduce((total, salary) => total + parseFloat(salary.MonthlySalary), 0);
    
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


    const MyDocument = ({ allSalary }) => (
        <Document>
            <Page size="A4">
            <View>
                    <Image src={logo} style={styles.logo} />
                    <Text style={styles.header}>Salary  Report for {selectedMonth}</Text>
                </View>
                <br /><br /><br /><br />
                <View style={styles.row}>

                  
                    <Text style={styles.cell}>Teacher Name</Text>
                    <Text style={styles.cell}>Teacher ID</Text>
                    <Text style={styles.cell}>Subject</Text>
                    <Text style={styles.cell}>Grade</Text>
                    <Text style={styles.cell}>Attend Students</Text>
                    <Text style={styles.cell}>Free Card Amount</Text>
                    <Text style={styles.cell}>Institute payment</Text>
                    <Text style={styles.cell}>Month Salary</Text>
                    <Text style={styles.cell}>Date</Text>
                </View>
                {allSalary.map((salary, index) => (
                    <View key={index} style={styles.row}>
                     
                        <Text style={styles.cell}>{salary.TeacherName}</Text>
                        <Text style={styles.cell}>{salary.TeacherID}</Text>
                        <Text style={styles.cell}>{salary.SubjectName}</Text>
                        <Text style={styles.cell}>{salary.Grade}</Text>
                        <Text style={styles.cell}>{salary.AttendStudents}</Text>
                        <Text style={styles.cell}>{salary.FreeCardAmount}</Text>
                        <Text style={styles.cell}>{salary.InstitutePayment}</Text>
                        <Text style={styles.cell}>{salary.MonthlySalary}</Text>
                        <Text style={styles.cell}>{salary.Date}</Text>
                    </View>
                ))}
                 <View style={styles.statisticsContainer}>
                    <Text style={styles.statisticsText}>Salary Statistics</Text>
                    <Text style={styles.statisticsText}>Total Users: {salrycounts.totalcounts}</Text>
                    <Text style={styles.statisticsText}>Total Free Card Amount: {totalfreecardAmount.toFixed(2)}</Text>
                    <Text style={styles.statisticsText}>Total Instutite Amount: {totalinstutitepayment.toFixed(2)}</Text>
                    <Text style={styles.statisticsText}>Total Salary Amount: {totalmothlysalry.toFixed(2)}</Text>
                </View>
        </Page>
        </Document >

        
    );




return (
    <div className='lesson-report'>
        <div className='bodymvl'>
            <h1 className='h1mvl'>Teacher Salary Report for {selectedMonth}</h1>
            <br /><br /><br /><br />
            <PDFDownloadLink document={<MyDocument allSalary={allSalary} />} fileName="salary.pdf">
                {({ loading, error }) => (
                    loading ? 'Loading document...' : (error ? 'Error generating PDF' : 'Download PDF')
                )}
            </PDFDownloadLink>
            <div className="table-container">
                <table className="table">
                    <thead>
                        <tr>
                            
                            <th>Teacher Name</th>
                            <th>Teacher ID</th>
                            <th>Subject</th>
                            <th>Grade</th>
                            <th>Attend Students</th>
                            <th>Free Card Amount</th>
                            <th>Institute payment</th>
                            <th>Month Salary</th>
                            <th>Date</th>

                        </tr>
                    </thead>
                    <tbody>
                        {allSalary.map((salary, index) => (
                            <tr key={index}>
                              
                                <td>{salary.TeacherName}</td>
                                <td>{salary.TeacherID}</td>
                                <td>{salary.SubjectName}</td>
                                <td>{salary.Grade}</td>
                                <td>{salary.AttendStudents}</td>
                                <td>{salary.FreeCardAmount}</td>
                                <td>{salary.InstitutePayment}</td>
                                <td>{salary.MonthlySalary}</td>
                                <td>{salary.Date}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div >
                <p  className='static1'>Total Users: {salrycounts.totalcounts}</p>
                <p className='static1'>Total Students: {totalstudents}</p>
                <p className='static1'>Total Free Card Amount: {totalfreecardAmount.toFixed(2)}</p>
                <p className='static1'>Total Instutite Amount: {totalinstutitepayment.toFixed(2)}</p>
                <p className='static1'>Total Salary Amount: {totalmothlysalry.toFixed(2)}</p>
                </div>
        </div>
    </div>
);
};

export default SalaryReport;

