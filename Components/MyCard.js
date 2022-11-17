import { useWeb3Contract, useMoralis } from "react-moralis";
import React, { useEffect } from "react";
import Image from "next/image";
import Modal from "react-modal";
import Router from "next/router";

import networkMapping from "../constants/networkMapping.json";
import IpfsNFT from "../constants/frontEndAbiLocation/IpfsNFT.json";
import Marketplace from "../constants/frontEndAbiLocation/Marketplace.json";

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

export default function CardDetails({ tokenId, nft }) {
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [price, setPrice] = React.useState(0);
  const [nftUri, setNftUri] = React.useState({});
  const { web3, account } = useMoralis();
  const chainId = "5";
  const [formattedImageAddress, setFormattedImageAddress] = React.useState("");

  const { runContractFunction: getTokenUri } = useWeb3Contract({
    abi: IpfsNFT,
    contractAddress:
      networkMapping[web3.currentProvider.networkVersion]["IpfsNFT"],
    functionName: "tokenId",
    params: {
      tokenId: nft.tokenId,
    },
  });

  useEffect(() => {
    if (nft) {
      const tokenURI = getTokenUri({
        onSuccess: (result) => {
          setNftUri(result);
        },
      });

      setNftUri(tokenURI);

      setFormattedImageAddress(
        tokenURI.image.replace("ipfs://", "https://ipfs.io/ipfs")
      );
    }
  }, [nft, getTokenUri]);

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
      {/* <div className="nft-cards my-cards-div"> */}
      <div className="nft-card" onClick={(e) => openModal()}>
        <Image src={formattedImageAddress} className="nft-image" alt="" />
        <div className="nft-card-info">
          <div className="nft-card-info-heading">
            <h1>nftUri.name</h1>
            <span>nftUri.description</span>
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

      {/* </div> */}
    </>
  );
}
