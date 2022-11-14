import React from 'react'
import styles from "../styles/leaderboard.module.css"


export default function profiles({ Leaderboard }) {
  return (
        <div id={styles.profile}>
            {Item(Leaderboard)}
        </div>
  )
}

function Item(data){
    return (

        <div className={styles.profiles}>
            {
                data.map((value, index) => (
                    <div className={styles.flex} key={index}>
                        <div className={styles.item}>
                            <img src={value.img} alt="" />
            
                            <div className={styles.info}>
                                <h3 className={styles.textdark}>{value.name}</h3>
                                <span>Position : {index+1}</span>    
                                <span>Address : {value.location}</span>
                            </div>                
                        </div>
                        <div className={styles.item}>
                            <span>{value.score}</span>
                        </div>
                    </div>
                )
                )
            }
        </div>

        
    )
}