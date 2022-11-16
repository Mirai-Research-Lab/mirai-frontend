import Sell from "../../Components/Sell.js";
import { useMoralis } from "react-moralis";
import Navbar from "../../Components/nav.js";
import styles from "../../styles/web3.module.css";

function Index() {
  let person = {
    name: "Lin Lanying",
    imageId: "1bX5QH6",
  };

  const { isWeb3Enabled } = useMoralis();

  return (
    <>
      <Navbar />
      {isWeb3Enabled ? (
        <div>
          <Sell person={person} />
        </div>
      ) : (
        <div className={styles.web3NotEnabled}>
          Please Enable Connect Your Wallet
        </div>
      )}
    </>
  );
}

export default Index;
