import Profile from "../../Components/Profile";
import MyCards from "../../Components/MyCard.js";
import Navbar from "../../Components/nav.js";
import { useMoralis } from "react-moralis";
import { useEffect, useState } from "react";
import style from "../../styles/web3.module.css";
import swal from "sweetalert2";
import Router from "next/router";
import Moralis from "moralis";

function Index({ currentuser }) {
  const { isWeb3Enabled, account, chainId } = useMoralis();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [funding_address, setfunding_address] = useState("");
  const [image, setImage] = useState("");

  useEffect(() => {
    if (!currentuser) {
      swal.fire({
        icon: "error",
        title: "Cannot access page before signing in",
        text: "Redirecting to Auth page",
      });
    }
    setEmail(currentuser.email);
    setUsername(currentuser.username);
    setfunding_address(currentuser.funding_address);
    setImage(currentuser.image);
  }, [currentuser]);
  return (
    <div>
      <Navbar />
      <div className="profile-flex">
        <Profile
          email={email}
          username={username}
          funding_address={funding_address}
          img={image}
        />
        {isWeb3Enabled ? (
          <MyCards />
        ) : (
          <div className={style.web3NotEnabled}>
            Please Connect Your Wallet To See The NFTs You Own
          </div>
        )}
      </div>
    </div>
  );
}

export default Index;
