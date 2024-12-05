import React, { useState } from "react";
import "./adgenerate.css";
import { Link } from "react-router-dom";
import Head from '../Header/Header'

function AdGenerate() {
  const [selectedMonth, setSelectedMonth] = useState("");

  const handleMonthChange = (event) => {
    setSelectedMonth(event.target.value);
  };

  return (
    <div>
      <Head/>
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
              className="text1gr"
              value={selectedMonth}
              onChange={handleMonthChange}
              required
            />
          </div>
          <Link to={`/adreport?month=${selectedMonth}`}>
            <input type="submit" value="Generate" className="button7gr" />
          </Link>
        </form>
      </div>
    </div>
    </div>
  );
}

export default AdGenerate;
