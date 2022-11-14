import Profile from '../../Components/Profile';
import MyCards from '../../Components/MyCard.js'
import Navbar from '../../Components/nav.js';
import axios from "axios";
import {useEffect, useState} from "react";

function index({currentuser}) {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [nfts, setNfts] = useState([]);

  console.log(currentuser)
  useEffect(()=>{
    setEmail(currentuser.email);
    setUsername(currentuser.username);
  }, [])
  return (
    <div>
        <Navbar/>
        <Profile email={email} username={username}/>
        <MyCards/>
    </div>
  )
}

export default index  