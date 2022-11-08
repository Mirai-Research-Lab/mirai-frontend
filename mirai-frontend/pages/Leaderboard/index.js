import Board from "../../components/Board"
import styles from "../../styles/leaderboard.module.css"



function Leaderboard() {
  return (
    <div className={styles.leaderboard} id={styles.Lboard}><Board></Board></div>
  )
}

export default Leaderboard