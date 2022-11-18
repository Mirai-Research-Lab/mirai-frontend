import React, { useState } from "react";
import Profiles from "./profiles";
import { Leaderboard } from "./database";
import styles from "../styles/leaderboard.module.css";
import TOP3 from "./top3.js";

export default function Board({ players }) {
  const [period, setPeriod] = useState(0);

  const handleClick = (e) => {
    setPeriod(e.target.dataset.id);
  };

  return (
    <div className={styles.board}>
      <h1 className={styles.leaderboard}>Leaderboard</h1><container className={styles.top3container}>
      <TOP3 Leaderboard={between(Leaderboard, period)} players={players} /></container>
      <Profiles
        Leaderboard={between(Leaderboard, period)}
        players={players}
      ></Profiles>
      <div className={styles.blob5}></div>
    </div>
  );
}

function between(data, between) {
  const today = new Date();
  const previous = new Date(today);
  previous.setDate(previous.getDate() - (between + 1));

  let filter = data.filter((val) => {
    let userDate = new Date(val.dt);
    if (between == 0) return val;
    return previous <= userDate && today >= userDate;
  });

  // sort with asending order
  return filter.sort((a, b) => {
    if (a.score === b.score) {
      return b.score - a.score;
    } else {
      return b.score - a.score;
    }
  });
}
