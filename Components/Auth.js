import React, { useState, useEffect } from "react";
import styles from "../styles/auth.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useRouter } from "next/router";
import axios from "axios";
import swal from "sweetalert2";
import { TriangleDown } from "@web3uikit/icons";
function Auth() {
  const daysToExpire = 7;
  useEffect(() => {
    const keyDownHandler = (e) => console.log(`You pressed ${e.code}.`);
    document.addEventListener("keydown", function (e) {
      if (e.keyCode == 9) e.preventDefault();
    });

    // clean up
    return () => {
      document.removeEventListener("keydown", keyDownHandler);
    };
  }, []);

  const router = useRouter();
  const validateEmail = (email) => {
    const re =
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  };

  // function to validate password
  const validatePassword = (str) => {
    var re = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{4,}$/;
    return re.test(str);
  };
  const [loginn, isLoginn] = useState(styles.login);
  const [registerr, isregister] = useState(styles.register);
  const [btn, isbtn] = useState(styles.btn);
  // var loginn;
  // var registerr;-----
  // var btn;
  // const navigate = useNavigate();

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
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repassword, setRePassword] = useState("");

  const handleClickSignUp = async (e) => {
    console.log("clicked");
    e.preventDefault();
    console.log(e);
    const credentials = {
      username: username,
      email: email,
      password: password,
    };
    if (!username || !email || !password || !repassword)
      swal.fire({
        icon: "error",
        title: "Empty Field(s).",
        text: "Please fill all fields!",
      });
    else if (!validateEmail(email)) {
      swal.fire({
        icon: "error",
        title: "Invalid Email...",
        text: "Please enter a valid email!",
      });
    } else if (!validatePassword(password)) {
      swal.fire({
        icon: "error",
        title: "Invalid Password...",
        text: "Password should be longer than 4 characters and must contain atleast 1 Uppercase,1 Lowercase, 1 Number and 1 special character",
      });
    } else if (password !== repassword) {
      swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Password and Confirm Password do not match!",
      });
    } else {
      try {
        const res = await axios.post(
          "https://mirai-backend-kappa.vercel.app/api/auth/signup",
          credentials,
          {
            withCredentials: true,
          }
        );
        const jwtToken = "jwt=" + res.data;
        var date = new Date();
        date.setTime(date.getTime() + 7 * 24 * 60 * 60 * 1000);
        document.cookie =
          jwtToken + ";expires=" + date.toUTCString() + ";path=/";
        router.push("/home");
      } catch (err) {
        swal.fire({
          icon: "error",
          title: "Email already in use",
          text: "Please enter a unique email id..",
        });
        console.log(err);
      }
    }
  };
  const handleClickLogIn = async (e) => {
    console.log("clicked");
    e.preventDefault();
    const credentials = {
      email: email,
      password: password,
    };
    if (!email || !password) {
      swal.fire({
        icon: "error",
        title: "Empty Field(s).",
        text: "Please fill all fields!",
      });
    } else if (!validateEmail(email)) {
      swal.fire({
        icon: "error",
        title: "Invalid Credentials...",
        text: "Please enter valid details!",
      });
    } else
      try {
        const res = await axios.post(
          "https://mirai-backend-kappa.vercel.app/api/auth/signin",
          credentials,
          {
            withCredentials: true,
          }
        );
        if (res.status === 200) {
          console.log(res.data);
          const jwtToken = "jwt=" + res.data;
          var date = new Date();
          date.setTime(date.getTime() + 7 * 24 * 60 * 60 * 1000);
          document.cookie =
            jwtToken + ";expires=" + date.toUTCString() + ";path=/";
          router.push("/home");
        } else {
          const message = res.data;
          console.log(message);
          swal.fire({
            icon: "error",
            title: message.message,
            text: "Please enter valid details!",
          });
          //   console.log(res);
        }
      } catch (err) {
        swal.fire({
          icon: "error",
          title: "Invalid Credentials",
          text: "Please enter valid details!",
        });
        console.log(err);
      }
  };
  return (
    <div className={styles.auth}>
      <div className={styles.authbox}>
        <div className={styles.heading}>
          <div className={styles.formboxdiv}>
            <div className={styles.formbox}>
              <div className={styles.buttonbox}>
                <div id={btn}></div>
                <button
                  type="button"
                  className={styles.togglebtn}
                  onClick={login}
                >
                  Sign In
                </button>
                <button
                  type="button"
                  className={styles.togglebtn}
                  onClick={register}
                >
                  Sign Up
                </button>
              </div>
              <form id={loginn} className={styles.inputgroup}>
                <input
                  type="email"
                  className={styles.inputfield}
                  placeholder=" Email Id"
                  id={styles.loginemail}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <input
                  type="password"
                  className={styles.inputfield}
                  placeholder=" Enter Password"
                  id={styles.loginpass}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <div>
                  <br />
                </div>
                <button
                  type="button"
                  className={styles.submitbtnloginbtn}
                  id={styles.loginbtn}
                  onClick={handleClickLogIn}
                >
                  Log In
                </button>
              </form>
              <form id={registerr} className={styles.inputgroup}>
                <input
                  type="text"
                  className={styles.inputfield}
                  placeholder=" Username"
                  name="lname"
                  id={styles.registerlname}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
                <input
                  type="email"
                  className={styles.inputfield}
                  placeholder=" Email Id"
                  name="email"
                  id={styles.registeremail}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                {/* <textarea
                                    name="about"
                                    cols="35"
                                    rows="4"
                                    placeholder="Write about your interests..."
                                    id={styles.registerdesc}
                                ></textarea> */}

                {/* <p className={styles.filechoose}>Choose your profile pic</p> */}
                {/* <input type="file" name="item" id={styles.registerimg} /> */}
                <input
                  className={styles.inputfield}
                  placeholder=" Enter Password"
                  name="password"
                  id={styles.registerpass}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <input
                  className={styles.inputfield}
                  placeholder="Confirm Password"
                  name="password"
                  id={styles.registerpass}
                  onChange={(e) => setRePassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  onClick={handleClickSignUp}
                  className={styles.submitbtn_1}
                >
                  Register
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Auth;
