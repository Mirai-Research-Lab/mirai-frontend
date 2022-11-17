import styles from "../styles/leaderboard.module.css";
function abc(index, player) {
  if (index == 0) {
    return (
      <div className={styles.topthreedetails}>
        {/* <img src={value.img} alt="" /> */}
        <h3 className={styles.textdark}>{player.username || "PlayerNotSet"}</h3>
        <h5>1st position</h5>
        <span>Highest score : {player.high_score || 999}</span>
      </div>
    );
  }
  if (index == 1) {
    return (
      <div className={styles.topthreedetails}>
        {/* <img src={value.img} alt="" /> */}
        <h3 className={styles.textdark}>{player.username || "PlayerNotSet"}</h3>
        <h5>2nd position</h5>
        <span>Highest score : {player.high_score || 99999}</span>
      </div>
    );
  }
  if (index == 2) {
    return (
      <div className={styles.topthreedetails}>
        {/* <img src={value.img} alt="" /> */}
        <h3 className={styles.textdark}>{player.username || "PlayerNotSet"}</h3>
        <h5>3rd position</h5>
        <span>Highest score : {player.high_score || 99999}</span>
      </div>
    );
  }
}

function topthree({ players }) {
  return (
    <span className={styles.topthreesection}>
      {players.map((player, index) => (
        <>{abc(index, player)}</>
      ))}
    </span>
  );
}

function Top3({ Leaderboard, players }) {
  return (
    <div className={styles.Top3}>{topthree({ Leaderboard, players })}</div>
  );
}

export default Top3;
