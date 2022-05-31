import {React,useState} from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Nav, Navbar, Form, Modal } from "react-bootstrap";
import "./styles/navbarstyle.css";
import Axios from 'axios';
import { Outlet } from "react-router-dom";
export default function HomeNavbar() {

  const [name,setName] = useState('');
  const [email,setEmail] = useState('');
  const [proof,setProof] = useState('');

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  // const navigate = useNavigate();
  const [validated, setValidated] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  function handleChange(e){

    const value = e.target.value;
    const type = e.target.name;

    if(type === 'org-name'){
      setName(value);
    }else if(type === 'org-email'){
       setEmail(value);
    }else if(type==='org-proof'){
      setProof(value);
    } 

}

  const handleSubmit = (e)=>{

    e.preventDefault();
    const form = e.currentTarget;
  if (form.checkValidity() === false) {
    e.stopPropagation();
  }
  setValidated(true);

    if(name !== '' && email !== '' && proof!== ''){

      Axios.get("http://localhost:3001/api/organizer/email-exist/"+ email)
      .then((res)=>{
        //console.log(res.data.result);
        if(res.data.result.length === 0){
           Axios.post("http://localhost:3001/api/organizer/submit-new-organizer-form",{
            name : name,
            email: email,
            proof:proof
          
          }).then((res)=>{
            if(res.data.success){
              alert('request sent');
              window.location.reload(false);
            }else{
              alert('cannot send request');

            }
          })
          
        }else{
          setShowAlert(true);
        }
      })
    

      
    }
    
      if(name !== '' && email !== '' && proof!== '' ){

    setName('');
    setEmail('');
    setProof('');
    handleClose()
    document.querySelector(".signup-options-overlay").style.display='none';
    document.querySelector(".signup-options").style.display='none';
     // window.location.reload(false);
   
   
     }

  }


  return (
    <div className="NavDiv">

      {showAlert && <div className="alert alert-warning" role="alert">The Email Already Exists !!</div> }
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Brand style={{ paddingLeft: 30 }}>
          <Nav.Link href="/"> IJ Games</Nav.Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav.Link
            to="/"
            className="navbar-brand"
            style={{ paddingLeft: 30 }}
          />
          <Nav className="ms-auto gap-0">
            <Nav.Link
              onClick={() => {
                document.querySelector(
                  ".signup-options-overlay"
                ).style.display = "block";
                document.querySelector(".signup-options").style.display =
                  "flex";
              }}
            >
              SIGN UP
            </Nav.Link>
          </Nav>
          <Nav className="ms">
            <Nav.Link href="login">LOGIN</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      <div>
        <div
          className="signup-options-overlay"
          style={{
            top: "0",
            bottom: "0",
            right: "0",
            left: "0",
            position: "absolute",
            backgroundColor: "black",
            opacity: "0.7",
            display: "none",
            zIndex: "3",
          }}
          onClick={() => {
            document.querySelector(".signup-options-overlay").style.display =
              "none";
            document.querySelector(".signup-options").style.display = "none";
          }}
        ></div>
        <Form
          className="signup-options"
          style={{
            top: "0",
            bottom: "0",
            right: "0",
            left: "0",
            width: "300px",
            margin: "auto",
            marginTop: "200px",
            position: "absolute",
            color: "white",
            border: "white solid 1px",
            padding: "30px",
            paddingTop: "40px",
            height: "200px",
            backgroundColor: "black",
            borderRadius: "10px",
            opacity: "0.9",
            // display: "flex",
            display: "none",
            flexDirection: "column",
            justifyContent: "space-around",
            zIndex: "3",
          }}
        >
          <button type="button" onClick={()=>{window.location.href="signUp"}} className="btn btn-outline-light">
            AS PLAYER
          </button>
          <button type="button" className="btn btn-outline-light" onClick={handleShow}>
            AS ORGANIZER
          </button>

          <Modal show={show} onHide={handleClose}       size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered>
        <Modal.Header closeButton>
          <Modal.Title>Registration Form - Organizer</Modal.Title>
        </Modal.Header>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Modal.Body>
        
            
            <div className="form-group row">
                <label for="org-name" className="col-sm-2 col-form-label">Name</label>
                <div className="col-sm-10">
                 <Form.Control type="text" className="input form-control" name="org-name" placeholder="Name" required value={name} onChange={handleChange}  />
                </div>
            </div>

            <div className="form-group row">
                <label for="org-email" className="col-sm-2 col-form-label">Email</label>
                <div className="col-sm-10">
                 <Form.Control type="email" className="input form-control" name="org-email" placeholder="Email" required value={email} onChange={handleChange}/>
                </div>
            </div>

            <div className="form-group row">
                <label for="org-proof" className="col-sm-2 col-form-label">Proof</label>
                <div className="col-sm-10">
                 <Form.Control type="text" className="input form-control" name="org-proof" placeholder="Organizational Proof" required value={proof} onChange={handleChange} title="Provide a link to your oragization's official website or facebook page or any other proof of existance"  />
                </div>
            </div>
              
        </Modal.Body>
        <Modal.Footer>
        <button type="button" onClick={handleClose} className="footer-btn">Close</button>
          <button  type="submit" onClick={handleSubmit} className="footer-btn">Register</button>
        </Modal.Footer>
        </Form>  
      </Modal>



        </Form>
      </div>
      <Outlet />
    </div>
  );
}
