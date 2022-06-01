import {React,useState,useEffect} from "react";
import styles from "./Header.module.css";
import { BsPlusLg } from 'react-icons/bs';
import { Form, Modal} from 'react-bootstrap';
import Axios from 'axios';
import authService from "../../services/auth.service";

function Header() {

   const [show, setShow] = useState(false);
   const handleClose = () => setShow(false);
   const handleShow = () => setShow(true);

  const [name,setName] = useState('');
  const [startDate,setStartDate] = useState('');
  const [startTime,setStartTime] = useState('');
  const [endDate,setEndDate] = useState('');
  const [endTime,setEndTime] = useState('');
  const [closingDate,setClosingDate] = useState('');
  const [options, setOptions] = useState([]);
  const [gameType,setGameType] = useState();
  const [gameId, setGameId] = useState('');
  const [closingTime,setClosingTime] = useState('');
  const [organizerId,setOrganizerId] = useState('') ;    //TODO: REMOVE HARD CODE 
  //const navigate = useNavigate();
  
  const [validated, setValidated] = useState(false);
  

  useEffect(()=>{

    setOrganizerId(authService.getUserID());
    Axios.get('http://localhost:3001/api/organizer/games-type').then((res)=>{
      // console.log(res.data);
      setOptions(res.data.result);
    });

    
  },[]);

  function handleChange(e){

    const value = e.target.value;
    const type = e.target.name;

    if(type === 't-name'){
      setName(value);
    }else if(type === 'd-start'){
       setStartDate(value);
    }else if(type === 't-start'){
      setStartTime(value);
    }else if(type === 'd-end'){
      setEndDate(value);
    }else if(type === 't-end'){
      setEndTime(value);
    }else if(type === 'd-closing'){
      setClosingDate(value);
    }else if(type === 't-closing'){
      setClosingTime(value);
    }

  } 


  function handleSelect(e){


    const value = e.target.value;
    setGameType(value);
    const temp = options.filter(option =>{
      return option.NAME === value
    });
    setGameId(temp[0].GAME_ID);
  }

  const handleAccept = (e)=>{
    
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.stopPropagation();
    }
    setValidated(true);
    
    if(name !=='' && gameId!=='' && startDate!=='' && startTime !=='' && endDate!=='' && endTime!=='' && closingDate!=='' && closingTime!==''){
      
      const data = {
        organizerId : organizerId,
        name : name,
        gameId: gameId,
        startDateTime: startDate+" "+startTime,
        endDateTime:endDate+" "+endTime,
        closingDateTime:closingDate+" "+closingTime
  
      };
      Axios.post("http://localhost:3001/api/organizer/submit-new-tournament-form", data);
    }


    if(name !=='' && gameId!=='' && startDate!=='' && startTime !=='' && endDate!=='' && endTime!=='' && closingDate!=='' && closingTime!==''){
      setClosingDate(''); setClosingTime(''); setEndDate('');setEndTime('');setGameId('');setGameType('');setName('');setOptions([]);setStartDate('');setStartTime('');
      window.location.reload(false);
    }

  }
  return (
    
    <header >

  <div className="row">
        {/* <h1 className="col">TOURNAMENTS</h1> */}
        <div className="col">
          <button onClick={handleShow} className="btn-dark"><BsPlusLg/></button>
        </div>
        <Modal show={show} onHide={handleClose}>

        <Modal.Header closeButton>
          <Modal.Title>Create New Tournament</Modal.Title>
        </Modal.Header>

        <Form noValidate validated={validated} onSubmit={handleAccept}>
          <Modal.Body>
          <div className="form-group row">
                <label for="t-name" className="col-sm-2 col-form-label">Event Name</label>
                <div className="col-sm-10">
                 <Form.Control type="text" className="form-control" name="t-name" placeholder="Name" required value={name} onChange={handleChange}/>
                </div>
            </div>

            <div className="form-group row">
                <label for="g-type" className="col-sm-2 col-form-label">Event Type</label>
                <div className="col-sm-10">
                <Form.Select onChange={handleSelect} value={gameType} required>
                <option selected disabled hidden value=''>Select</option>
                  {options.map((cur)=>{
                    return <option>{cur.NAME}</option>
                  })}
                </Form.Select>
                </div>
            </div>

            <div className="form-group row">
                <label for="d-start" className="col-sm-2 col-form-label">Start Date</label>
                <div className="col-sm-10">
                    <Form.Control type="date" className="form-control" name="d-start" required value={startDate} onChange={handleChange} />
                    
                </div>
             </div>
             <div className="form-group row">
                <label for="t-start" className="col-sm-2 col-form-label">Start Time</label>
                <div className="col-sm-10">
                    <Form.Control type="time" className="form-control" name="t-start" required value={startTime} onChange={handleChange}/>
                </div>
             </div>
             <div className="form-group row">
                <label for="d-end" className="col-sm-2 col-form-label">End Date</label>
                <div className="col-sm-10">
                    <Form.Control type="date" className="form-control" name="d-end" required value={endDate} onChange={handleChange}/>
                </div>
             </div>
             <div className="form-group row">
                <label for="t-end" className="col-sm-2 col-form-label">End Time</label>
                <div className="col-sm-10">
                    <Form.Control type="time" className="form-control" name="t-end" required value={endTime} onChange={handleChange}/>
                </div>
             </div>
             <div className="form-group row">
                <label for="d-closing" className="col-sm-2 col-form-label">Closing Date</label>
                <div className="col-sm-10">
                    <Form.Control type="date" className="form-control" name="d-closing" required value={closingDate} onChange={handleChange}/>
                    
                </div>
             </div>

              <div className="form-group row">
                <label for="t-closing" className="col-sm-2 col-form-label">Closing Time</label>
                <div className="col-sm-10">
                    <Form.Control type="time" className="form-control" name="t-closing" required value={closingTime} onChange={handleChange}/>
                </div>
              </div>
          </Modal.Body>

          <Modal.Footer>
          <button type="button" onClick={handleClose} className={styles["footer-btn"]}>Close</button>
          <button  type="submit" className={styles["footer-btn"]}>Create</button>
          </Modal.Footer>
        </Form>
        </Modal>

    
  </div>
  
</header>


  );
}

export default Header;
