import Axios from "axios";
import React, { useState } from "react";
import { Modal, Form } from "react-bootstrap";
import authService from "../../services/auth.service";
import styles from "../requestsPage/InfoCard";
//import {useNavigate} from 'react-router-dom';

const InfoCard = (props) => {
  const [ID, setID] = useState();

  const [showA, setShowA] = useState(false);
  const handleCloseA = () => setShowA(false);
  const handleShowA = () => setShowA(true);

  const [showR, setShowR] = useState(false);
  const handleCloseR = () => setShowR(false);
  const handleShowR = () => setShowR(true);

  const handleAccept = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.stopPropagation();
    }

    const data = {
      request_id: props.request.request_id,
      team_name: props.request.team_name,
      player_id: props.request.player_id,
      player_tournament_id: props.request.player_tournament_id,
    };

    Axios.post("http://localhost:3001/api/organizer/accept-teamrequest", data, {
      headers: { "x-auth-token": authService.getUserToken() },
    });

    setID(null);
    window.location.reload(false);
  };

  function handleReject(e) {
    e.preventDefault();
    const data = {
      request_id: props.request.request_id,
    };

    Axios.post("http://localhost:3001/api/organizer/reject-teamrequest", data, {
      headers: { "x-auth-token": authService.getUserToken() },
    });

    setID(null);
    window.location.reload(false);
  }

  return (
    <div className="card w-100 text-white bg-dark">
      <div className="card-body">
        <h5 className="card-title"> Tournament Name </h5>{" "}
        <p className="card-text"> {props.request.tournament_name} </p>{" "}
        <h5 className="card-title"> Team Name </h5>{" "}
        <p className="card-text"> {props.request.team_name} </p>{" "}
        <h5 className="card-title"> Player Name </h5>{" "}
        <p className="card-text"> {props.request.name} </p>{" "}
        {/* <h5 className="card-title">Proof Link</h5>
                    <a className="card-text" href={props.request.PROOF}>
                      {props.request.PROOF}
                    </a> */}{" "}
        <button
          type="button"
          className={`${styles["btn-accept"]} btn btn-success`}
          onClick={handleShowA}
        >
          Accept{" "}
        </button>{" "}
        <button
          type="button"
          className={`${styles["btn-reject"]} btn btn-danger`}
          onClick={handleShowR}
        >
          Reject{" "}
        </button>{" "}
      </div>
      <Modal show={showA} onHide={handleCloseA}>
        <Modal.Header closeButton>
          <Modal.Title>
            Request Acceptance - {props.request.team_name}{" "}
          </Modal.Title>{" "}
        </Modal.Header>
        <Form onSubmit={handleAccept}>
          <Modal.Body>
            <div className="mb-3">
              <label for="recipient-name" className="col-form-label">
                Are you sure you want to accept this request ?
              </label>{" "}
              <input
                type="text"
                className="form-control"
                name="req-id-r"
                value={ID}
                hidden
                readOnly
              />
            </div>{" "}
          </Modal.Body>
          <Modal.Footer>
            <button
              type="button"
              className="btn btn-dark"
              onClick={handleCloseA}
            >
              Close{" "}
            </button>{" "}
            <button type="submit" className="btn btn-dark" name="accept">
              Accept{" "}
            </button>{" "}
          </Modal.Footer>{" "}
        </Form>{" "}
      </Modal>
      <Modal show={showR} onHide={handleCloseR}>
        <Modal.Header closeButton>
          <Modal.Title>
            Request Rejection - {props.request.team_name}{" "}
          </Modal.Title>{" "}
        </Modal.Header>
        <form>
          <Modal.Body>
            <div className="mb-3">
              <label for="recipient-name" className="col-form-label">
                Are you sure you want to reject this request ?
              </label>{" "}
              <input
                type="text"
                className="form-control"
                name="req-id-r"
                value={ID}
                hidden
                readOnly
              />
            </div>{" "}
          </Modal.Body>
          <Modal.Footer>
            <button
              type="button"
              className="btn btn-dark"
              onClick={handleCloseR}
            >
              No{" "}
            </button>{" "}
            <button
              type="submit"
              className="btn btn-dark"
              name="reject"
              onClick={handleReject}
            >
              Yes{" "}
            </button>{" "}
          </Modal.Footer>{" "}
        </form>{" "}
      </Modal>{" "}
    </div>
  );
};

export default InfoCard;
