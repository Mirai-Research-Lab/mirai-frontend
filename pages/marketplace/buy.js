import Marketplace from "../../Components/Marketp.js";
import Navbar from "../../Components/nav.js";
import GET_ACTIVE_ITEMS_QUERY from "../../queries/active-items-query.js";
import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { useMoralis } from "react-moralis";
import Router from "next/router.js";
import swal from "sweetalert2";

import style from "../../styles/web3.module.css";

function Index({ currentuser }) {
  const { loading, error, data: addNfts } = useQuery(GET_ACTIVE_ITEMS_QUERY);
  const { isWeb3Enabled } = useMoralis();
  useEffect(() => {
    if (!currentuser) {
      swal.fire({
        icon: "error",
        title: "Cannot access page before signing in",
        text: "Redirecting to Auth page",
      });
      Router.push("/Auth");
    }
  }, [currentuser]);

  return (
    <>
      <Navbar currentuser={currentuser}/>
      {isWeb3Enabled ? (
        !loading ? (
          <div>
            <Marketplace activeNfts={addNfts.activeItems} />
          </div>
        ) : (
          <div className={style.web3NotEnabled}>
            . . . . Loading The NFTs Please Wait . . . . .
          </div>
        )
      ) : (
        <div className={style.web3NotEnabled}>
          Please Enable Connect Your Wallet
        </div>
      )}
    </>
  );
}

export default Index;
