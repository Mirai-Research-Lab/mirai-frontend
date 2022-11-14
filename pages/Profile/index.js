import Profile from "../../Components/Profile";
import MyCards from "../../Components/MyCard.js";
import Navbar from "../../Components/nav.js";
import axios from "axios";
import { useEffect, useState } from "react";
import swal from "sweetalert2";
import Router from "next/router";
function index({ currentuser }) {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [nfts, setNfts] = useState([]);

  console.log(currentuser);
  useEffect(() => {
    if (!currentuser) {
      swal.fire({
        icon: "error",
        title: "Cannot access page before signing in",
        text: "Redirecting to Auth page",
      });
      Router.push("/auth");
    }
    setEmail(currentuser.email);
    setUsername(currentuser.username);
  }, []);
  return (
    <div>
      <Navbar />
      <Profile email={email} username={username} />
      <MyCards />
    </div>
  );
}

export default index;
