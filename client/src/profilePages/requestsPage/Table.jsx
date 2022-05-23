import React from 'react';
import styles from "./Table.module.css";
import InfoCard from './InfoCard';

const Table = (props) => {


    function handleClick(e){
        const btnId = e.target.id;
        const [btn,id] = btnId.split(" ");
        const hidden = document.getElementById(id).hidden;
        document.getElementById(id).hidden = !hidden;

        

    }

    return (
        <table className="table table-dark table-striped table-hover">
            <thead>
            <tr>
           <th className="w-25"></th>
           <th className="w-75"></th>
           <th className="w-25"></th>
            </tr>
            </thead>

        <tbody>
        
            {props.requests.map((cur)=>{
                return (
                <tr className='data-table-row'>
                <td>{cur.REQUEST_ID}</td>
                <td>
                    {cur.NAME}
                    <br />
                    <div hidden id={cur.REQUEST_ID}>
                        <InfoCard request={cur}/>
                        
                    </div>
                    

                   
                </td>
    
                <td><button type="button" className="btn btn-success" onClick={handleClick} id={'btn '+cur.REQUEST_ID}>View</button></td>
            </tr>)
                })}

        </tbody>

        </table>

    );
};

export default Table;