import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './AdReport.css';
import { useLocation } from 'react-router-dom';
import { PDFDownloadLink, Document, Page, Text, View, StyleSheet,Image } from '@react-pdf/renderer';
import Head from '../Header/Header';

import logo from '../photos/logofull.png';

function AdReport() {
    const [allPayments, setAllPayments] = useState([]);
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const selectedMonth = queryParams.get('month');


    const fetchPayments = async () => {
        try {
            const [onlineRes, bankRes, cashRes] = await Promise.all([
                axios.get('http://localhost:5000/displayonline'),
                axios.get('http://localhost:5000/displaybank'),
                axios.get('http://localhost:5000/displaycash')
            ]);
            const onlinePayments = onlineRes.data;
            const bankPayments = bankRes.data;
            const cashPayments = cashRes.data;
            const allPayments = [...onlinePayments, ...bankPayments, ...cashPayments];
            const filteredPayments = allPayments.filter(payment => {
                const paymentDate = new Date(payment.date);
                return paymentDate.getMonth() === parseInt(selectedMonth.split('-')[1]) - 1; // Month is zero-based
            });
            setAllPayments(filteredPayments);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchPayments();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedMonth]);

     const paymentCounts = {
        totalStudents: allPayments.length,
        approved: allPayments.filter(payment => payment.status === 'Approved').length,
        rejected: allPayments.filter(payment => payment.status === 'Rejected').length,
        pending: allPayments.filter(payment => payment.status === 'Pending').length,
        online: allPayments.filter(payment => payment.type === 'Online').length,
        bank: allPayments.filter(payment => payment.type === 'Bank').length,
        cash: allPayments.filter(payment => payment.type === 'Cash').length,
    };

    const totalAmount = allPayments.reduce((total, payment) => total + parseFloat(payment.amount), 0);
 
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

    const MyDocument = () => (
        <Document>
           <Page size="A4">
                 <View>
                    <Image src={logo} style={styles.logo} />
                    <Text style={styles.header}> payment Report for {selectedMonth}</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.cell}>Student IT Number</Text>
                    <Text style={styles.cell}>Description</Text>
                    <Text style={styles.cell}>Date</Text>
                    <Text style={styles.cell}>Amount</Text>
                    <Text style={styles.cell}>Type</Text>
                    <Text style={styles.cell}>Status</Text>
                </View>
                {allPayments.map((payment) => (
                    <View key={payment._id} style={styles.row}>
                        <Text style={styles.cell}>{payment.itnumber}</Text>
                        <Text style={styles.cell}>{payment.description}</Text>
                        <Text style={styles.cell}>{payment.date}</Text>
                        <Text style={styles.cell}>{payment.amount}</Text>
                        <Text style={styles.cell}>{payment.type}</Text>
                        <Text style={styles.cell}>{payment.status}</Text>
                    </View>
                ))}
                 <View style={styles.statisticsContainer}>
                    <Text style={styles.statisticsText}>Payment Statistics</Text>
                    <Text style={styles.statisticsText}>Total Students: {paymentCounts.totalStudents}</Text>
                    <Text style={styles.statisticsText}>Approved Payments: {paymentCounts.approved}</Text>
                    <Text style={styles.statisticsText}>Rejected Payments: {paymentCounts.rejected}</Text>
                    <Text style={styles.statisticsText}>Pending Payments: {paymentCounts.pending}</Text>
                    <Text style={styles.statisticsText}>Online Payments: {paymentCounts.online}</Text>
                    <Text style={styles.statisticsText}>Bank Payments: {paymentCounts.bank}</Text>
                    <Text style={styles.statisticsText}>Cash Payments: {paymentCounts.cash}</Text>
                    <Text style={styles.statisticsText}>Total Amount: {totalAmount.toFixed(2)}</Text>
                </View>
            </Page>
        </Document>
    );

    return (
        <div>
            <Head/>
            <div className='bodyadr'>
                <h1 className='h1adr'><br/>My Payments for {selectedMonth}</h1>
                <br /><br />
                <PDFDownloadLink document={<MyDocument />} fileName="payments.pdf">
                    {({ blob, url, loading, error }) => (<button className="pdf-download-button">
                {loading ? 'Loading document...' : 'Download PDF'}
            </button>
                    )}
    
                </PDFDownloadLink>
                <div className="tbl-headeradr">
                    <table className='tableadr'>
                        <thead>
                            <tr>
                                <th className='thadr'>Student IT Number</th>
                                <th className='thadr'>Description</th>
                                <th className='thadr'>Date</th>
                                <th className='thadr'>Amount</th>
                                <th className='thadr'>Type</th>
                                <th className='thadr'>Status</th>
                            </tr>
                        </thead>
                    </table>
                </div>
                <div className="tbl-contentadr">
                    <table className='tableadr'>
                        <tbody>
                            {allPayments.map((payment) => (
                                <tr key={payment._id}>
                                    <td className='tdadr'>{payment.itnumber}</td>
                                    <td className='tdadr'>{payment.description}</td>
                                    <td className='tdadr'>{payment.date}</td>
                                    <td className='tdadr'>{payment.amount}</td>
                                    <td className='tdadr'>{payment.type}</td>
                                    <td className='tdadr'>{payment.status}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <div className='bodyadr'>
                <h1 className='paystat'><br/>Payment Statistics</h1>
                <div className='stat'>
                <p className='static1'>Total Students: {paymentCounts.totalStudents}</p>
                <p className='static1'>Approved Payments: {paymentCounts.approved}</p>
                <p className='static1'>Rejected Payments: {paymentCounts.rejected}</p>
                <p className='static1'>Pending Payments: {paymentCounts.pending}</p>
                <p className='static1'>Online Payments: {paymentCounts.online}</p>
                <p className='static1'>Bank Payments: {paymentCounts.bank}</p>
                <p className='static1'>Cash Payments: {paymentCounts.cash}</p>
                <p className='static1'>Total Amount: {totalAmount.toFixed(2)}</p>
                </div>
            </div>
            </div>
        
    );
}

export default AdReport;
