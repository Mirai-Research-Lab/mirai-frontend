import Marketplace from "../../Components/Marketp.js";
import Navbar from "../../Components/nav.js";
import GET_ACTIVE_ITEMS_QUERY from "../../queries/active-items-query.js";
import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { useMoralis } from "react-moralis";
import Router from "next/router.js";
import swal from "sweetalert2";
<<<<<<< HEAD
import style from "../../styles/web3.module.css";

function Index({ currentuser }) {
  const { loading, error, data: addNfts } = useQuery(GET_ACTIVE_ITEMS_QUERY);
  const { isWeb3Enabled } = useMoralis();
  console.log(addNfts);
=======

import style from "../../styles/web3.module.css";

function Index({ currentuser }) {
  const { loading, error, data: addNfts } = useQuery(GET_ACTIVE_ITEMS_QUERY);
  const { isWeb3Enabled } = useMoralis();
>>>>>>> a45894cc3638507b374a4cddebc0bd3b99b9aee9

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
      <Navbar />
      {isWeb3Enabled ? (
        <div>
          <Marketplace activeNfts={addNfts} />
        </div>
      ) : (
        <div className={style.web3NotEnabled}>
          Please Enable Connect Your Wallet
        </div>
      )}
    </>
  );
}

export default Index;
