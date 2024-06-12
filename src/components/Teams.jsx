import axios from "axios";
import React, { useState, useEffect } from "react";

const Teams = () => {
  const [teams, setTeams] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [team, setTeam] = useState({ team_id: '', team_name: "" });
  useEffect(() => {
    handleGetTeams();
  }, []);
  const handleGetTeams = () => {
    axios.get("http://localhost:3000/teams").then(({ data }) => {
      setTeams(data);
    });
  };
  const handleDeleteTeam = ({ team_id }) => {
    axios.delete("http://localhost:3000/teams/" + team_id).then(() => {
      handleGetTeams();
    });
  };

  const handleEdit = (pl) => {
    setIsEdit(true);
    setTeam(pl)
  };

  const handleChange=(e)=>{
    const newTeam = {...team};
    newTeam[e.target.name] = e.target.value;
    setTeam(newTeam);
  }
  const handleUpdate=()=>{
    axios.put("http://localhost:3000/teams/" + team.team_id,team).then(() => {
      handleGetTeams();
      handleClear()
    });
  }

  const handleCreate=()=>{
    axios.post("http://localhost:3000/teams/",team).then(() => {
      handleGetTeams();
      handleClear()
    });
  }
  const handleClear=()=>{
    setTeam({ team_id: '', team_name: "" })
  }
  return (
    <div>
      <h2>Welcome to Teams </h2>
      <table border={1}>
        <thead>
          <tr>
            <th>Team ID</th>
            <th>Team Name</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {teams.map((pl, i) => (
            <tr key={i}>
              <td>{pl.team_id}</td>
              <td>{pl.team_name}</td>
              <td>
                <button onClick={()=>{handleEdit(pl)}}>Edit Team</button>
              </td>
              <td>
                <button
                  onClick={() => {
                    handleDeleteTeam(pl);
                  }}
                >
                  Delete Team
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <br />
      <br />
      <form>
        <label htmlFor="">Team Name :</label>
        <input type="text" name="team_name" value={team.team_name} onChange={(e)=>{handleChange(e)}}/> <br />
        <label htmlFor="">Team ID :</label>
        <input type="text" name="team_id" value={team.team_id} onChange={(e)=>{handleChange(e)}}/> <br />
        {isEdit ? <button onClick={handleUpdate}>Update Team</button> : <button onClick={handleCreate}>Create Team</button>}
      </form>
    </div>
  );
};

export default Teams;
