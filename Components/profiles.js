import React from "react";
import styles from "../styles/leaderboard.module.css";
import Image from "next/image";
export default function Profiles({ players }) {
  return <div id={styles.profile}>{Item({ players })}</div>;
}

function Item({ players }) {
  return (
    <div className={styles.profiles}>
      {players.map((player, index) => (
        <div className={styles.flex} key={index}>
          <div className={styles.item}>
            {/* <img src={value.img} alt="" /> */}
            <Image src={player.image} alt="profile" width={90} height={90} />
            <div style={{ fontFamily: "jetbrains" }} className={styles.info}>
              <h3
                style={{ fontFamily: "jetbrains" }}
                className={styles.textdark}
              >
                {player.username}
              </h3>
              <span style={{ fontFamily: "jetbrains" }}>
                Position : {index + 4}{" "}
              </span>
              <span style={{ fontFamily: "jetbrains" }}>
                Address : {player.funding_address || "0x000000000000000000dEaD"}
              </span>
            </div>
          </div>
          <div className={styles.item}>
            <span>{player.highest_score.toFixed(3)||0}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
