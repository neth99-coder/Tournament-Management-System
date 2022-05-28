const { json } = require("express");
const db = require("../db/db");

function getTournaments() {
  return new Promise((resolve, reject) => {
    var sql = "select TOURNAMENT.TOURNAMENT_ID,TOURNAMENT.NAME,ORGANIZER.name as ORGANIZER,GAME.name as GAME,DATE_FORMAT(TOURNAMENT.START_DATETIME,'%d-%m-%y %H:%i') as DATE,DATE_FORMAT(TOURNAMENT.REGISTERCLOSE_DATETIME,'%d-%m-%y') as REG_CLOSE from TOURNAMENT,ORGANIZER,GAME where TOURNAMENT.GAME_ID=GAME.GAME_ID and TOURNAMENT.ORGANIZER_ID=ORGANIZER.ORGANIZER_ID;";
    db.query(sql, (err, result) => {
      if (err) {
        return reject(err);
      } else {
        return resolve(result);
      }
    });
  });
}
   
function addNewTeamRequest(data) {



  return new Promise((resolve, reject) => {
    let playerId = data.playerID;
    let tournamentId = data.tournamentID;
    let team = data.teamName;
    

    const sql = `insert into PLAYER_TOURNAMENT values(null,${playerId},${tournamentId});`;
    const sql2 = `select PLAYER_TOURNAMENT_ID from PLAYER_TOURNAMENT where PLAYER_ID=${playerId} and TOURNAMENT_ID=${tournamentId};`

    db.query(sql, (err, result) => {
      if (err) {
        return reject(err);
      } else {
        
        db.query(sql2, (err2, result2) => {
          if (err2) {
            console.log(err2);
            return reject(err2);
          } else {
            
            const p_t_id = result2[0].PLAYER_TOURNAMENT_ID;
            
            const sql3 = `insert into TEAM_REQUEST(PLAYER_TOURNAMENT_ID,TEAM_NAME) values(${p_t_id},"${team}");`;
            db.query(sql3, (err3, result3) => {
              if (err3) {
                return reject(err3);
              } else {
                resolve(result3)
              }
            });

          }
        });
      }
    });
  });
}


module.exports = { getTournaments, addNewTeamRequest };
