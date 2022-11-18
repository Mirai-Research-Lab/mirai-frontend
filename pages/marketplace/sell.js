import Sell from "../../Components/sell.js";
import { useMoralis } from "react-moralis";
import Navbar from "../../Components/nav.js";
import styles from "../../styles/web3.module.css";
import GET_ACTIVE_ITEMS_QUERY from "../../queries/active-items-query.js";
import { useQuery } from "@apollo/client";
import { useEffect } from "react";
import style from "../../styles/web3.module.css";
function Index({ currentuser }) {
  const { loading, error, data: addNfts } = useQuery(GET_ACTIVE_ITEMS_QUERY);
  const { isWeb3Enabled } = useMoralis();
  console.log(addNfts);
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
        !loading ? (
          <div>
            <Sell activeNfts={addNfts.activeItems} />
          </div>
        ) : (
          <div className={style.web3NotEnabled}>
            . . . . No NFTs Available for Sale . . . .
          </div>
        )
      ) : (
        <div className={styles.web3NotEnabled}>
          Please Enable Connect Your Wallet
        </div>
      )}
    </>
  );
}

export default Index;
