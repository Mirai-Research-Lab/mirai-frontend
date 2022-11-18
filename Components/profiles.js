import React from "react";
import styles from "../styles/leaderboard.module.css";

export default function Profiles({ Leaderboard, players }) {
  return <div id={styles.profile}>{Item({ Leaderboard, players })}</div>;
}

function Item({ players }) {
  return (
    <div className={styles.profiles}>
      {players.map((player, index) => (
        <div className={styles.flex} key={index}>
          <div className={styles.item}>
            {/* <img src={value.img} alt="" /> */}

            <div className={styles.info}>
              <h3 className={styles.textdark}>{player.username}</h3>
              <span>Position : {index + 1} </span>
              <span>
                Address : {player.funding_address || "0x000000000000000000dEaD"}
              </span>
            </div>
          </div>
          <div className={styles.item}>
            <span>{player.highest_score}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
