import {React, useState, useEffect } from 'react';
import Table from './Table';
import Axios from 'axios';

const Requests = () => {

    const [requests,setRequests] = useState([]);

    useEffect(()=>{

       
        Axios.get('http://localhost:3001/api/admin/requests').then((res)=>{
            //console.log(res.data);
           setRequests(res.data.result);
        });
        
      },[]);


    return (
        <div>
            <Table requests={requests}></Table>
        </div>
    );
};

export default Requests;