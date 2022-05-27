import {React,useEffect,useState} from 'react';
import Card from './Card';
import Header from './Header';
import {Link} from "react-router-dom";
// import TournamentModal from "./TournamentModal";
import Axios from 'axios';



const OrganizeTournaments = (props) => {

    const [tournaments,setTournaments] = useState([]);

  
    useEffect(()=>{


        Axios.get('http://localhost:3001/api/organizer/tournaments/1').then((res)=>{
           // console.log(res2);
           setTournaments(res.data.result);
        });
        
      },[]);

      if(tournaments.length === 0){return <div className="alert alert-dark" role="alert" style={{marginTop: 30}}> No Organized Tournaments Yet !!</div>}
      else{
        return (
            <div>
                <Header />
                    <div className="row">
                        {tournaments?.map((cur,index) =>{
                        return <div className="col-lg-3 col-md-4 col-ms-6"> 
                        <Link to={`../tournament/${cur.ORGANIZER_ID}`} state={{obj:cur}}>
                            <Card key={index} id={index} title={cur.NAME}/>
                            </Link> 
                        </div>})}
                    </div>
                    
            </div>
    
        );
      }
    
};

export default OrganizeTournaments;