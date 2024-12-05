import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Head from '../Header/Header';

function ReportMonth() {
    const [selectedMonth, setSelectedMonth] = useState("");

    useEffect(() => {
        // Get current date
        const currentDate = new Date();
        // Format date to 'YYYY-MM' for input type 'month'
        const formattedDate = currentDate.toISOString().slice(0, 7);
        setSelectedMonth(formattedDate);
    }, []); // Run only once when component mounts

    const handleMonthChange = (event) => {
        setSelectedMonth(event.target.value);
    };

    return (
        <div>
            <Head />
            <div className="mainadgen">
                <div className="containergr">
                    <h1 className="h1gr">Generate Report</h1>
                    <form className="paygr">
                        <div className="form-groupgr">
                            <label htmlFor="from" className="label1gr">
                                Select Month:
                            </label>
                            <input
                                type="month"
                                id="from"
                                name="from"
                                
                                value={selectedMonth}
                                onChange={handleMonthChange}
                                required
                            />
                        </div>
                        <Link to={`/lessonReport?month=${selectedMonth}`}>
                            <input type="submit" value="Generate" className="button7gr" />
                        </Link>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default ReportMonth;
