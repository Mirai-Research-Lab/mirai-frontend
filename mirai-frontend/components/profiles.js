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

        <>
            {
                data.map((value, index) => (
                    <div className={styles.flex} key={index}>
                        <div className={styles.item}>
                            <img src={value.img} alt="" />
            
                            <div className={styles.info}>
                                <h3 className='name text-dark'>{value.name}</h3>    
                                <span>{value.location}</span>
                            </div>                
                        </div>
                        <div className={styles.item}>
                            <span>{value.score}</span>
                        </div>
                    </div>
                    )
                )
            }
        </>

        
    )
}