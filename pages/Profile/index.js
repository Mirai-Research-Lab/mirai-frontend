import Profile from "../../Components/Profile";
import MyCard from "../../Components/MyCard.js";
import Navbar from "../../Components/nav.js";
import { useMoralis } from "react-moralis";
import { useEffect, useState } from "react";
import USER_OWNED_NFTS_QUERY from "../../queries/user-owned-nfts-query";
import { useQuery } from "@apollo/client";
import style from "../../styles/web3.module.css";
import swal from "sweetalert2";
import Router from "next/router";
import Moralis from "moralis";

function Index({ currentuser }) {
  const {
    loading,
    error,
    data: userOwnedNfts,
  } = useQuery(USER_OWNED_NFTS_QUERY(`${currentuser.funding_address}`));

  const { isWeb3Enabled, account, chainId } = useMoralis();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [funding_address, setfunding_address] = useState("");
  const [image, setImage] = useState("");

  console.log(userOwnedNfts);

  useEffect(() => {
    if (!currentuser) {
      swal.fire({
        icon: "error",
        title: "Cannot access page before signing in",
        text: "Redirecting to Auth page",
      });
      Router.push("/Auth");
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
          currentuser={currentuser}
        />
        {isWeb3Enabled ? (
          <>
            {userOwnedNfts ? (
              <div className="marketplace-container myCard-container">
                <div className="marketplace-heading ">
                  <h1>MY Cards</h1>
                  <span>Following are the cards you own </span>
                </div>

                {userOwnedNfts.userOwnedNfts.map((nft) => {
                  // nft has 3 properties: tokenId, nftAddress, id
                  return (
                    <>
                      <MyCard nft={nft} />
                    </>
                  );
                })}
              </div>
            ) : (
              <div>Loading...</div>
            )}
          </>
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
