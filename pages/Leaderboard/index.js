import Board from "../../components/Board";
import styles from "../../styles/leaderboard.module.css";
import Navbar from "../../Components/nav.js";
import { useState, useEffect } from "react";
import axios from "axios";
import { Router } from "next/router";

function Leaderboard({ currentuser }) {
  const [players, setPlayers] = useState([]);
  useEffect(() => {
    if (!currentuser) Router.push("/auth");
  }, []);

  const loadPlayerData = async () => {
    const response = await axios.get("http://localhost:3001/api/players");
    setPlayers(response.data);
  };
  useEffect(() => {
    loadPlayerData();
  }, []);
  return (
    <div>
      <Navbar />
      <div className={styles.leaderboard} id={styles.Lboard}>
        <Board players={players}></Board>
      </div>
    </div>
  );
}

export default Leaderboard;
