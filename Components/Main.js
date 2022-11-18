import Image from "next/image";
// import backwall from "../public/backwall.jpg";
import backwall from "../public/backwall.png";
import Modal from "react-modal";
import { useState } from "react";
import GameContract from "../constants/frontEndAbiLocation/GameContract.json";
import networkMapping from "../constants/networkMapping.json";
import { AccordionButton } from "react-bootstrap";
import { useMoralis, useWeb3Contract } from "react-moralis";
import { ethers } from "ethers";
import Router from "next/router";
const customStyles = {
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.4)",
  },
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    borderRadius: "10%",
    transform: "translate(-50%, -50%)",
  },
};
function Main() {
  const { account } = useMoralis();
  const chainId = "5";
  const [modalIsOpen, setIsOpen] = useState(false);
  const [price, setPrice] = useState(0);
  const { runContractFunction } = useWeb3Contract();
  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(!modalIsOpen);
  }
  const handleDontaionEthers = async () => {
    if (price <= 0) return;
    const { ethereum } = window;
    if (ethereum) {
      try {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const gameContract = new ethers.Contract(
          networkMapping[chainId]["GameContract"].slice(-1)[0],
          GameContract,
          signer
        );
        let listingTx = await gameContract.fundContract({
          value: ethers.utils.parseUnits(price.toString(), "ether"),
          gasLimit: 500000,
        });
        console.log(listingTx);
        setPrice(0);
        closeModal();
        Router.reload();
      } catch (err) {
        console.log(err);
      }
    }
  };
  const handleDonation = async () => {
    const decimals = 18;
    const options = {
      abi: GameContract,
      contractAddress: networkMapping[chainId]["IpfsNFT"][5],
      functionName: "fundContract",
      params: {},
      gasLimit: "300000000",
      msgValue: ethers.utils.parseUnits(price.toString(), "ether"),
    };
    await runContractFunction({
      params: options,
      onSuccess: (result) => {
        alert("OK");
        console.log(result);
      },

      onError: (err) => {
        alert("Error");
        console.log(err);
      },
    });
  };
  return (
    <div className="img_container">
      <Modal isOpen={modalIsOpen} style={customStyles}>
        <h2>Donate At ETH</h2>
        <input
          placeholder="Eth Amount"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        ></input>
        <button onClick={(e) => handleDontaionEthers()}>Donate</button>
        <button onClick={closeModal}>Close</button>
      </Modal>
      <Image className="homeImg" src={backwall} alt={"Home"} />
      <div className="home_desc">
        <div className="home-desc-main">
          If you <span>WANT</span> it,
          <br />
          Let's <span>SHOOT</span>!
        </div>
        <div className="play-btn" >
          <a href="https://azulul.itch.io/mirai-shooter" target="_blank">
            <span data-attr="Play">Play</span>
            <span data-attr="Now">Now</span>
          </a>
        </div>
      </div>
      <button className="buy" onClick={() => openModal()}>
        Buy us a coffee
      </button>
    </div>
  );
}

export default Main;
