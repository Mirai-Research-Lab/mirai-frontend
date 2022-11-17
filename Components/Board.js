import React, { useEffect, useState } from "react";
import Profiles from "./profiles";
import { Leaderboard } from "./database";
import styles from "../styles/leaderboard.module.css";
import TOP3 from "./top3.js";

export default function Board({ players }) {
  var date;
  const getDay=()=>{
    const day = new Date();
    var dd = day.getDate();
    var mm = day.getMonth() + 1;
    var yyyy = day.getFullYear();
    if (dd < 10) {
      dd = "0" + dd;
    }
    if (mm < 10) {
      mm = "0" + mm;
    }
    date = dd + "/" + mm + "/" + yyyy;
    return (<>{date}</>)
  }
  const [period, setPeriod] = useState(0);
  const handleClick = (e) => {
    setPeriod(e.target.dataset.id);
  };

  return (
    <div className={styles.board}>
      <h1 className={styles.leaderboard}>Leaderboard {getDay()}</h1>
      <TOP3 players={players} />
      <Profiles players={players.slice(3)}></Profiles>
      <div className={styles.blob5}></div>
    </div>
  );
}
