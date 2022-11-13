import styles from "../styles/leaderboard.module.css"
function abc(index, value) {
    if (index == 0) {
        return (
            <div className={styles.topthreedetails}>
                <img src={value.img} alt="" />
                <h3 className={styles.textdark}>{value.name}</h3>
                <h5>1st position</h5>
                <span>Highest score : {value.score}</span>

            </div >
            
        )
    }
    if (index == 1) {
        return (
            <div className={styles.topthreedetails}>
                <img src={value.img} alt="" />
                <h3 className={styles.textdark}>{value.name}</h3>
                <h5>2nd position</h5>
                <span>Highest score : {value.score}</span>


            </div >
        )
    }
    if (index == 2) {
        return (
            <div className={styles.topthreedetails}>
                <img src={value.img} alt="" />
                <h3 className={styles.textdark}>{value.name}</h3>
                <h5>3rd position</h5>
                <span>Highest score : {value.score}</span>


            </div >
        )
    }

}


function topthree(data) {
    return (

        <span className={styles.topthreesection}>
            {
                data.map((value, index) => (
                    <>
                        {abc(index, value)}
                    </>
                )
                )
            }
        </span>


    )
}




function top3({ Leaderboard }) {
    return (
        <div className={styles.top3}>
            {topthree(Leaderboard)}
        </div>
    )
}



export default top3