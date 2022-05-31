import React from "react";
import InfoCard from "./InfoCard";

const Table = (props) => {
  function handleClick(e) {
    const btnId = e.target.id;
    const [id] = btnId.split(" ")[1];
    const hidden = document.getElementById(id).hidden;
    document.getElementById(id).hidden = !hidden;
  }

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
              <td>{cur.request_id}</td>
              <td>
                {cur.team_name}
                <br />
                <div hidden id={cur.request_id}>
                  <InfoCard request={cur} />
                </div>
              </td>

              <td>
                <button
                  type="button"
                  className="btn btn-success"
                  onClick={handleClick}
                  id={"btn " + cur.request_id}
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
};

export default Table;
