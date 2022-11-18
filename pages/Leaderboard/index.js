import Board from "../../Components/Board";
import styles from "../../styles/leaderboard.module.css";
import Navbar from "../../Components/nav.js";
import { useState, useEffect } from "react";
import axios from "axios";
import Router from "next/router.js";
import swal from "sweetalert2";
import style from "../../styles/web3.module.css";
function Leaderboard({ currentuser }) {
  const [players, setPlayers] = useState([]);
  useEffect(() => {
    if (!currentuser) {
      swal.fire({
        icon: "error",
        title: "Cannot access page before signing in",
        text: "Redirecting to Auth page",
      });
      Router.push("/Auth");
    }
  }, [currentuser]);

  const loadPlayerData = async () => {
    const response = await axios.get(
      "https://mirai-backend-kappa.vercel.app/api/players"
    );
    setPlayers(response.data);
  
  };
  useEffect(() => {
    loadPlayerData();
  }, []);
  return (
    <div>
      <Navbar currentuser={currentuser}/>
      <div className={styles.leaderboard} id={styles.Lboard}>
        {players.length?<Board players={players}></Board>:(
          <div className={style.web3NotEnabled}>
            Loading The Leaderboard Please Wait . . . . .
          </div>
        )}
      </div>
    </div>
  );
}

export default Leaderboard;
