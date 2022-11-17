import { useWeb3Contract, useMoralis } from "react-moralis";
import React from "react";
import Image from "next/image";
import Modal from "react-modal";
import Router from "next/router";

import networkMapping from "../constants/networkMapping.json";
import IpfsNFT from "../constants/frontEndAbiLocation/IpfsNFT.json";
import Marketplace from "../constants/frontEndAbiLocation/Marketplace.json";
import nft from "../public/nft.jpg";

// import styles from "../styles/auth.module.css"

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

export default function CardDetails({ tokenId }) {
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [price, setPrice] = React.useState(0);
  const { web3, account } = useMoralis();
  const chainId = "5";

  const { runContractFunction: approve } = useWeb3Contract({
    abi: IpfsNFT,
    contractAddress: networkMapping[chainId]["IpfsNFT"].slice(-1)[0],
    functionName: "approve",
    params: {
      nftAddress: networkMapping[chainId]["Marketplace"].slice(-1)[0],
      tokenId: tokenId,
    },
  });

  const { runContractFunction: listItem } = useWeb3Contract({
    abi: Marketplace,
    contractAddress: networkMapping[chainId]["Marketplace"].slice(-1)[0],
    functionName: "listItem",
    params: {
      nftAddress: networkMapping[chainId]["Marketplace"].slice(-1)[0],
      tokenId: tokenId,
      price: price,
    },
  });

  let person = {
    name: "Anshu Bokachoda",
    imageId: "1bX5QH6",
  };
  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }
  function closeModaleth() {
    setIsOpen(false);
    Router.reload();
  }

  const handlebuy = (e) => {
    e.preventDefault();

    approve({
      onSuccess: (result) => {
        console.log("approve result: ", result);
        listItem({
          onSuccess: (result) => {
            console.log("listItem result: ", result);
          },
          onError: (error) => {
            console.log("listItem error", error);
          },
        });
      },
      onError: (error) => {
        console.log("approve error", error);
      },
    });

    closeModaleth();
  };

  return (
    <>
      <div className="marketplace-container myCard-container">
        <div className="marketplace-heading ">
          <h1>MY Cards</h1>
          <span>Following are the cards you own </span>
        </div>

        {/* <div className="nft-cards my-cards-div"> */}
        <div className="nft-card" onClick={(e) => openModal()}>
          <Image src={nft} className="nft-image" alt="" />
          <div className="nft-card-info">
            <div className="nft-card-info-heading">
              <h1>Card Name</h1>
              <span>Card Description</span>
              <div>
                <button onClick={openModal}>Sell</button>
                <Modal isOpen={modalIsOpen} style={customStyles}>
                  <h2>List at Eth</h2>
                  <input
                    placeholder="Eth Amount"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                  ></input>
                  <button onClick={(e) => handlebuy()}>List</button>
                  <button onClick={closeModal}>Close</button>
                </Modal>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* </div> */}
    </>
  );
}
