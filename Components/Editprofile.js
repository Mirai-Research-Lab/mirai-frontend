import styles from '../styles/editprofile.module.css'

function Editprofile() {
  return (
    <div className={styles.editprofile}>
    Edit your details...
    <div className={styles.editCard}>
        <div className={styles.editprofile}>
        <input id="imageUpload" type="file" 
       name="profile_photo" placeholder="Photo" required="" capture/>
        </div>
        {/* <div className={}>

        </div> */}
    </div>
    </div>
  )
}

export default Editprofile