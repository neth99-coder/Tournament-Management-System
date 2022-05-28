import React from 'react';
import { useLocation } from 'react-router-dom';
import styles from "./OrganizedTournament.module.css";

const OrganizedTournament = (props) => {

    let location = useLocation();
    let {obj} = location.state;

    // const startDateTime = new Date(obj.START_DATETIME);
    // const endDateTime = new Date(obj.END_DATETIME);
    // const registerCloseDateTime = new Date(obj.REGISTERCLOSE_DATETIME);

    const startDate = obj.START_DATETIME.split(" ")[0];
    const startTime = obj.START_DATETIME.split(" ")[1];
    const endDate = obj.END_DATETIME.split(" ")[0];
    const endTime = obj.END_DATETIME.split(" ")[1];
    const registerCloseDate = obj.REGISTERCLOSE_DATETIME.split(" ")[0];
    const registerCloseTime = obj.REGISTERCLOSE_DATETIME.split(" ")[1];
    
 
    return (
        <div className="container rounded bg-white mt-5 mb-5">
            <h1>{obj.NAME} </h1>
            <dl className={`${styles['div']} row`}>
                <dt className="col-sm-3 "> Event Start Date </dt>
                <dd className="col-sm-9 bg-light">{": "+startDate}</dd>

                <dt className="col-sm-3"> Event Start Time</dt>
                <dd className="col-sm-9 bg-light">{": "+startTime}</dd>

                <dt className="col-sm-3"> Event End Date </dt>
                <dd className="col-sm-9 bg-light">{": "+endDate}</dd>

                <dt className="col-sm-3"> Event End Time </dt>
                <dd className="col-sm-9 bg-light">{": "+endTime}</dd>

                <dt className="col-sm-3"> Event Register Closing Date </dt>
                <dd className="col-sm-9 bg-light">{": "+registerCloseDate}</dd>

                <dt className="col-sm-3"> Event Register Closing Time </dt>
                <dd className="col-sm-9 bg-light">{": "+registerCloseTime}</dd>

            </dl>
          
            
        </div>
    );
};

export default OrganizedTournament;