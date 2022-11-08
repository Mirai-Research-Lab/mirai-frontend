import React, { useState } from 'react';
import styles from "../styles/auth.module.css"

function Auth() {
    const [loginn,isLoginn]=useState(styles.login);
    const [registerr,isregister]=useState(styles.register);
    const[btn,isbtn]=useState(styles.btn);
    // var loginn;
    // var registerr;
    // var btn;

    const register = () => {
        // loginn.style.left = "-400px";
        // registerr.style.left = "50px";
        // btn.style.left = "110px";
        isLoginn(styles.logintoregisterlogin);
        isregister(styles.loginregisterregister);
        isbtn(styles.loginregisterbtn);
      };
    const login = () => {
        //   loginn.style.left = "50px";
        //   registerr.style.left = "450px";
        //   btn.style.left = "0";
        isLoginn(styles.registerloginlogin);
        isregister(styles.registerloginregister);
        isbtn(styles.registerloginbtn);
      };
      
    return (
        <div className={styles.auth}>
            <div className={styles.authbox}>
                <div className={styles.heading}>
                    <div className={styles.formboxdiv}>
                        <div className={styles.formbox}>
                            <div className={styles.buttonbox}>
                                <div id={btn}></div>
                                <button type="button" className={styles.togglebtn} onClick={login}>
                                    Log In
                                </button>
                                <button type="button" className={styles.togglebtn} onClick={register}>
                                    Register
                                </button>
                            </div>
                            <form id={loginn} className={styles.inputgroup}>
                                <input
                                    type="email"
                                    className={styles.inputfield}
                                    placeholder="Email Id"
                                    id={styles.loginemail}
                                    required
                                />
                                <input
                                    type="password"
                                    className={styles.inputfield}
                                    placeholder="Enter Password"
                                    id={styles.loginpass}
                                    required
                                />
                                <div><br /></div>
                                <button
                                    type="button"
                                    className={styles.submitbtnloginbtn}
                                    id={styles.loginbtn}
                                >
                                    Log In
                                </button>
                            </form>
                            <form id={registerr} className={styles.inputgroup}>
                                <input
                                    type="text"
                                    className={styles.inputfield}
                                    placeholder="First name"
                                    name="fname"
                                    id={styles.registerfname}
                                    required
                                />
                                <input
                                    type="text"
                                    className={styles.inputfield}
                                    placeholder="Last name"
                                    name="lname"
                                    id={styles.registerlname}
                                    required
                                />
                                <input
                                    type="email"
                                    className={styles.inputfield}
                                    placeholder="Email Id"
                                    name="email"
                                    id={styles.registeremail}
                                    required
                                />
                                <textarea
                                    name="about"
                                    cols="35"
                                    rows="4"
                                    placeholder="Write about your interests..."
                                    id={styles.registerdesc}
                                ></textarea>
                                <p className={styles.filechoose}>Choose your profile pic</p>
                                <input type="file" name="item" id={styles.registerimg} />
                                <input
                                    className={styles.inputfield}
                                    placeholder="Enter Password"
                                    name="password"
                                    id={styles.registerpass}
                                    required
                                />
                                <button type="button" className={styles.submitbtn_1} >
                                    Register
                                </button>
                            </form>
                        </div>
                    </div></div></div>

        </div>
    )
}

export default Auth