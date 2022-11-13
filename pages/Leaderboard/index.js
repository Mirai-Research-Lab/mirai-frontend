import Board from "../../components/Board"
import styles from "../../styles/leaderboard.module.css"
import Navbar from '../../Components/nav.js';

function Leaderboard() {
  return (
    <div>
          <Navbar/>
    <div className={styles.leaderboard} id={styles.Lboard}>
          <Board></Board></div>
    </div>
  )
}

export default Leaderboard