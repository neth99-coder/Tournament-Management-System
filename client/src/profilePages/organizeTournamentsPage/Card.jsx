import React from "react";
//import DetailsBox from "./DetailsBox";
import styles from "./Card.module.css";

function Note(props) {

 

  return (
    // <div className="col-lg-3 col-md-4 col-ms-6">
      <div className={`${styles["note"]} bg-light`} >
        <h1>{props.title}</h1>
       
      
      </div>
    // </div>
  );
}

export default Note;
