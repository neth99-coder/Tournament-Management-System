import Axios from 'axios';
import React, { useState } from 'react';
import { Modal, Form } from 'react-bootstrap';
import authService from '../../services/auth.service';
import styles from "./InfoCard.module.css";
//import {useNavigate} from 'react-router-dom';

const InfoCard = (props) => {


  const [password, setPassword] = useState('');
  const [ID, setID] = useState();
  // const [email,setEmail] = useState('');
  //  const navigate = useNavigate();
  const [showA, setShowA] = useState(false);
  const handleCloseA = () => setShowA(false);
  const handleShowA = () => setShowA(true);

  const [showR, setShowR] = useState(false);
  const handleCloseR = () => setShowR(false);
  const handleShowR = () => setShowR(true);

  const [validated, setValidated] = useState(false);

  function handleChange(e) {
    const value = e.target.value;
    setPassword(value);
  }

  const handleAccept = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.stopPropagation();
    }
    setValidated(true);

    // setID(props.request.REQUEST_ID);
    // setEmail(props.request.EMAIL);
    if (password !== '') {

      const data = {
        reqId: props.request.REQUEST_ID,
        orgName: props.request.NAME,
        password: password,
        email: props.request.EMAIL
      };

      Axios.post("https://tournament-management-system-1.herokuapp.com/api/admin/submit-org-accept-form", data,
        {
          headers: { "x-auth-token": authService.getUserToken() },
        });


    }

    // if (password !== '') {
    //   setPassword('');
    //   setID(null);
    //   window.location.reload(false);
    // }

  }

  function handleReject(e) {
    e.preventDefault()
    // setID(props.request.REQUEST_ID);
    //setEmail(props.request.EMAIL);
    const data = {
      reqId: props.request.REQUEST_ID,
      email: props.request.EMAIL

    };

    Axios.post("https://tournament-management-system-1.herokuapp.com/api/admin/submit-org-reject-form", data, {
      headers: { "x-auth-token": authService.getUserToken() },
    });

    setID(null);
    window.location.reload(false);
  }

  return (
    <div className="card w-100 text-white bg-dark">
      <div className="card-body">
        <h5 className="card-title">Email</h5>
        <p className="card-text">{props.request.EMAIL}</p>
        <h5 className="card-title">Proof Link</h5>
        <a className="card-text" href={props.request.PROOF}>{props.request.PROOF}</a>
        <button type="button" className={`${styles['btn-accept']} btn btn-success`} onClick={handleShowA}>Accept</button>
        <button type="button" className={`${styles['btn-reject']} btn btn-danger`} onClick={handleShowR}>Reject</button>
      </div>

      <Modal show={showA} onHide={handleCloseA}>
        <Modal.Header closeButton>
          <Modal.Title>Request Acceptance - {props.request.NAME}</Modal.Title>
        </Modal.Header>

        <Form noValidate validated={validated} onSubmit={handleAccept}>
          <Modal.Body>
            <label for="org-temp-pass" className="col-form-label">Give organization a temporary password</label>
            <Form.Control type="password" className="form-control" name="org-temp-pass" value={password} onChange={handleChange} required />
            <Form.Control type="text" name='req-id-a' value={ID} hidden readOnly />
          </Modal.Body>

          <Modal.Footer>
            <button type="button" className="btn btn-dark" onClick={handleCloseA}>Close</button>
            <button type="submit" className="btn btn-dark" name="accept">Accept</button>
          </Modal.Footer>
        </Form>
      </Modal>

      <Modal show={showR} onHide={handleCloseR}>
        <Modal.Header closeButton>
          <Modal.Title>Request Rejection - {props.request.NAME}</Modal.Title>
        </Modal.Header>

        <form>
          <Modal.Body>
            <div className="mb-3">
              <label for="recipient-name" className="col-form-label">Are you sure you want to reject this request?</label>
              <input type="text" className="form-control" name="req-id-r" value={ID} hidden readOnly />
            </div>
          </Modal.Body>

          <Modal.Footer>
            <button type="button" className="btn btn-dark" onClick={handleCloseR}>No</button>
            <button type="submit" className="btn btn-dark" name="reject" onClick={handleReject}>Yes</button>
          </Modal.Footer>
        </form>
      </Modal>
    </div>
  );
};

export default InfoCard;