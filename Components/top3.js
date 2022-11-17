import styles from "../styles/leaderboard.module.css";
function abc(index, player) {
  return (
    <div className={styles.topthreedetails}>
      <img src={player.image} alt="profile" />
      <h3
        className={styles.textdark}
        style={{ fontFamily: "jetbrains", marginTop: "20px" }}
      >
        {player.username || "PlayerNotSet"}
      </h3>
      <h5 style={{ fontFamily: "jetbrains" }}>position {index + 1}</h5>
      <span style={{ fontFamily: "jetbrains" }}>
        Highest score : {player.high_score || 999}
      </span>
    </div>
  );
}

function topthree({ players }) {
  return (
    <span className={styles.topthreesection}>
      {players.slice(0, 3).map((player, index) => (
        <div key={index} style={{ marginLeft: "30px" }}>
          {abc(index, player)}
        </div>
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
