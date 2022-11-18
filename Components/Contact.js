import React from 'react'
import styles from "../styles/contact.module.css"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function contact() {
    const notify = () => 
    // console.log("clicked");
    toast('✅Message Sent', {
        position: "bottom-left",
        autoClose:  5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme:"dark"
        }); 
    return (
        <div className={styles.contact}>
            <div className={styles.contactbox}>
                <div className={styles.contactheading}>CONTACT US</div>
                <form className={styles.inputgroup}>
                    <input
                        type="name"
                        className={styles.inputfield}
                        placeholder="Name"
                        required
                    />
                    <input
                        type="email"
                        className={styles.inputfield}
                        placeholder="your Email Id"
                        required
                    />
                    <textarea
                        className={styles.inputfield}
                        placeholder="your message"
                        required
                    />
                    <button
                        type="button"
                        onClick={notify} className={styles.submitbtn_1}
                    >
                        Send
                    </button>
                </form>
                <div className={styles.blob5}></div>
            </div>
            <ToastContainer />
        </div>
    )
}

export default contact