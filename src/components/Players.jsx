import React, { useEffect } from 'react'
import { useState } from 'react'

const Players = () => {
  const [players,setPlayers] =useState([])
  useEffect(()=>{
    fetch("http://localhost:3000/players").then(res=>{
      return res.json()
    }).then(data=>{
      setPlayers(data);
    })
  },[])
  return (
    <div>
      <h2>Welcomet to Players ...</h2>

        <table border={1}>
          <thead>
            <th>Player ID</th>
            <th>Player Name</th>
            <th>Team ID</th>
            <th>Edit</th>
            <th>Delete</th>
          </thead>
          <tbody>
            {players.map((pl)=> <tr>
              <td>{pl.player_id}</td>
              <td>{pl.player_name}</td>
              <td>{pl.team_id}</td>
              <td>
                <button>Edit Player</button>
              </td>
              <td>
                <button>Delete Player</button>
              </td>
            </tr> )}
          </tbody>
        </table>
    </div>
  )
}

export default Players
