import React from 'react';
import styles from './pathology.css';
import ReportComponent from  "./pathology-report/ReportComponent";

const PathologySystem = () =>{
    return (
        <div className={`omrs-main-content ${styles.container}`}>
            <ReportComponent/>
        </div>
    )
}
export default PathologySystem;