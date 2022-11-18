import React from "react";
import styles from "../styles/contact.module.css";
import email from "../assets/email.png";
import phone from "../assets/phone-call.png";
import Image from "next/image";

// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
function contact() {
  
  return (
    <div className={styles.contact}>
      <div className={styles.contactbox}>
        <div className={styles.contactheading}>CONTACT US</div>
        <div className={styles.inputgroup}>
          <div className={styles.inputfield}>
            Any Suggestions or Need Help?
            <p></p>
            You can get in touch with us by any of the below mentioned means, we
            are 24*7 available for you!
            <p></p>
            <div className={styles.contactdetails}>
              <div className={styles.contactimg}>
                <Image src={phone} height="20" width="20" margin="50" />
              </div>{" "}
              +91-87xxxxxxx <br></br>
              <div className={styles.contactimg}>
                <Image src={email} height="20" width="20" padding="5" />
              </div>{" "}
              <a href="mailto:devionhackers@gmail.com"  className={styles.contactemail}>devionhackers@gmail.com</a>
            </div>
          </div>
        </div>

        
        <div className={styles.blob5}></div>
      </div>
      {/* <ToastContainer /> */}
    </div>
  );
}

export default contact;
