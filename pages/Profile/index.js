import Profile from "../../Components/Profile";
import MyCard from "../../Components/MyCard.js";
import Navbar from "../../Components/nav.js";
import { useMoralis } from "react-moralis";
import { useEffect, useState } from "react";
import USER_OWNED_NFTS_QUERY from "../../queries/user-owned-nfts-query";
import { useQuery } from "@apollo/client";
import style from "../../styles/web3.module.css";
import swal from "sweetalert2";
import USER_BOUGHT_NFTS_QUERY from "../../queries/user-bought-nfts-query";
import Router from "next/router";
import CANCELLED_ITEMS_QUERY from "../../queries/cancelled-nfts-query";
import GET_ACTIVE_ITEMS_QUERY from "../../queries/active-items-query";
function Index({ currentuser }) {
  const {
    loading,
    error,
    data: userOwnedNfts,
  } = useQuery(USER_OWNED_NFTS_QUERY);

  const { loading: loading2, data: userBoughtNfts } = useQuery(
    USER_BOUGHT_NFTS_QUERY
  );

  const { loading: loading3, data: cancelledNfts } = useQuery(
    CANCELLED_ITEMS_QUERY
  );

  const { loading: loading4, data: activeNfts } = useQuery(
    GET_ACTIVE_ITEMS_QUERY
  );
  const { isWeb3Enabled, account, chainId } = useMoralis();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [funding_address, setfunding_address] = useState("");
  const [image, setImage] = useState("");
  const [totalNfts, setTotalNfts] = useState([]);
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
  useEffect(() => {
    let total = [];
    if (userOwnedNfts && userOwnedNfts.nftMinteds.length > 0) {
      for (let i = 0; i < userOwnedNfts.nftMinteds.length; i++) {
        const item = {
          minter: userOwnedNfts.nftMinteds[i].minter,
          tokenId: userOwnedNfts.nftMinteds[i].tokenId,
        };
        if (!total.includes(item) && item.minter === account) total.push(item);
      }
    }
    console.log("hello", total);
    if (userBoughtNfts && userBoughtNfts.boughtItems.length > 0) {
      for (let i = 0; i < userBoughtNfts.boughtItems.length; i++) {
        const item = {
          minter: userBoughtNfts.boughtItems[i].buyer,
          tokenId: userBoughtNfts.boughtItems[i].tokenId,
        };
        if (!total.includes(item) && item.minter === account) total.push(item);
      }
    }
    if (cancelledNfts && cancelledNfts.itemCancelleds.length > 0) {
      for (let i = 0; i < cancelledNfts.itemCancelleds.length; i++) {
        const item = {
          minter: cancelledNfts.itemCancelleds[i].seller,
          tokenId: cancelledNfts.itemCancelleds[i].tokenId,
        };
        if (!total.includes(item) && item.minter === account) total.push(item);
      }
    }
    console.log(total);
    // Remove already listed nfts
    if (activeNfts && activeNfts.activeItems.length > 0) {
      for (let i = 0; i < activeNfts.activeItems.length; i++) {
        const item = {
          minter: activeNfts.activeItems[i].seller,
          tokenId: activeNfts.activeItems[i].tokenId,
        };
        for (let j = 0; j < total.length; j++) {
          if (
            total[j].tokenId === item.tokenId &&
            total[j].minter === item.minter
          ) {
            total.splice(j, 1);
          }
        }
      }
    }
    setTotalNfts(total);
  }, [userBoughtNfts, userOwnedNfts, cancelledNfts, activeNfts]);
  return (
    <div>
      <button
        className="seelistednftsRight"
        onClick={() => Router.push("/marketplace/sell")}
      >
        See Your Listed NFTs
      </button>
      <Navbar currentuser={currentuser} />
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
            {totalNfts && totalNfts.length > 0 ? (
              <div
                className="marketplace-container myCard-container"
                style={{ marginRight: "25rem" }}
              >
                <div className="marketplace-heading ">
                  <h1 style={{ fontFamily: "gaming-font" }}>MY Cards</h1>
                  <span style={{ fontFamily: "gaming-font" }}>
                    Following are the cards you own
                  </span>
                </div>

                {totalNfts.map((nft) => {
                  // nft has 3 properties: tokenId, nftAddress, minter
                  return (
                    <>
                      <MyCard nft={nft} />
                    </>
                  );
                })}
              </div>
            ) : (
              <div
                className={style.web3NotEnabled}
                style={{ marginLeft: "200px" }}
              >
                There Are No NFTs That You Own
              </div>
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
