import React from "react";
import InfoCard from "./InfoCard";

const Table = (props) => {
 
  function handleClick(e) {
    const btnId = e.target.id;
    const id = btnId.split(" ")[1];
    console.log(id)
    const hidden = document.getElementById(id).hidden;
        document.getElementById(id).hidden = !hidden;
  }
  if (props.requests.length === 0) {
    return (
      <div className="alert alert-dark" role="alert" style={{ marginTop: 30 }}>
        {" "}
        No Team Requests
      </div>
    );
  } else {
    return (
      <table className="table table-dark table-striped table-hover">
        <thead>
          <tr>
            <th className="w-25">REQUEST ID</th>
            <th className="w-75">TEAM NAME</th>
            <th className="w-25"></th>
          </tr>
        </thead>

        <tbody>
          {props.requests.map((cur) => {
            return (
              <tr className="data-table-row">
                <td>{cur.REQUEST_ID}</td>
                <td>
                  {cur.TEAM_NAME}
                  <br />
                  <div hidden id={cur.REQUEST_ID}>
                    <InfoCard request={cur} />
                  </div>
                </td>

                <td>
                  <button
                    type="button"
                    className="btn btn-success"
                    onClick={handleClick}
                    id={"btn " + cur.REQUEST_ID}
                  >
                    View
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }
};

export default Table;
