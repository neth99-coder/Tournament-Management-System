import { React, useEffect, useState } from "react";
import "./styles/tournament-card.css"
import { useNavigate } from "react-router-dom";



export default function TournamentCard(props) {
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const navigate = useNavigate();
    const data = props;

    useEffect(() => {
        const sql_datetime = props.data.DATE;
        setDate(sql_datetime.split(" ")[0]);
        setTime(sql_datetime.split(" ")[1]);


    }, []);
    return (
        <div className="card" onClick={() => { navigate("/tournamentPage", { state: { NAME: props.data.NAME, TOURNAMENT_ID: props.data.TOURNAMENT_ID, ORGANIZER: props.data.ORGANIZER, GAME: props.data.GAME, DATE: date, TIME: time, REG_CLOSE: props.data.REG_CLOSE } }); }}>

            <div>{props.data.NAME}</div>
            <div>{props.data.ORGANIZER}</div>
            <div>{props.data.GAME}</div>
            <div>{date}</div>
            <div>{time}</div>
            <div type="button reg-now" className="btn btn-light btn-sm">
                REGISTER NOW
            </div>

        </div>
    );
}
