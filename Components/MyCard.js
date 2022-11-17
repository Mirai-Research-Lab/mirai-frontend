import { useWeb3Contract, useMoralis } from "react-moralis";
import React, { useEffect } from "react";
import Image from "next/image";
import Modal from "react-modal";
import Router from "next/router";
import { ethers } from "ethers";
import networkMapping from "../constants/networkMapping.json";
import IpfsNFT from "../constants/frontEndAbiLocation/IpfsNFT.json";
import Marketplace from "../constants/frontEndAbiLocation/Marketplace.json";
import axios from "axios";

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

export default function CardDetails({ nft }) {
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [price, setPrice] = React.useState(0);
  const [nftUri, setNftUri] = React.useState({});
  const { web3, account, chainId } = useMoralis();
  const formattedChainId = parseInt(Number(chainId.toString()));
  const [formattedImageAddress, setFormattedImageAddress] = React.useState("");

  const { runContractFunction } = useWeb3Contract();
  const { runContractFunction: approve } = useWeb3Contract();
  const { runContractFunction: listItem } = useWeb3Contract();

  // console.log(nft);

  const processURIs = async () => {
    const options = {
      abi: IpfsNFT,
      contractAddress: networkMapping[formattedChainId]["IpfsNFT"].slice(-1)[0],
      functionName: "tokenURI",
      params: {
        tokenId: nft.tokenId,
      },
    };
    let tokenUri = await runContractFunction({ params: options });

    // console.log("hello", tokenUri);
    setNftUri(tokenUri);
    const formattedTokenUri = tokenUri.replace(
      "ipfs://",
      "https://ipfs.io/ipfs/"
    );
    const response = await axios.get(formattedTokenUri);
    // console.log(response.data);
    const formattedImageUri = response.data.image.replace(
      "ipfs://",
      "https://ipfs.io/ipfs/"
    );
    setFormattedImageAddress(formattedImageUri);

    console.log("helllo", formattedImageUri);
  };
  useEffect(() => {
    if (nft) processURIs();
  }, [nft]);

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

  // console.log("dfdsaf", formattedImageUri);

  const handlebuy = (e) => {
    approve({
      abi: IpfsNFT,
      contractAddress: networkMapping[formattedChainId]["IpfsNFT"].slice(-1)[0],
      functionName: "approve",
      params: {
        nftAddress:
          networkMapping[formattedChainId]["Marketplace"].slice(-1)[0],
        tokenId: nft.tokenId,
      },
      onSuccess: (result) => {
        // console.log("approve result: ", result);
        listItem({
          abi: Marketplace,
          contractAddress:
            networkMapping[formattedChainId]["Marketplace"].slice(-1)[0],
          functionName: "listItem",
          params: {
            nftAddress:
              networkMapping[formattedChainId]["Marketplace"].slice(-1)[0],
            tokenId: nft.tokenId,
            price: price,
          },
          onSuccess: (result) => {
            // console.log("listItem result: ", result);
          },
          onError: (error) => {
            // console.log("listItem error", error);
          },
        });
      },
      onError: (error) => {
        // console.log("approve error", error);
      },
    });

    closeModaleth();
  };

  return (
    <>
      {/* <div className="nft-cards my-cards-div"> */}
      {formattedImageAddress != "" ? (
        <div className="nft-card" onClick={(e) => openModal()}>
          <Image
            src={formattedImageAddress}
            className="nft-image"
            alt=""
            width={350}
            height={350}
          />
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
      ) : (
        <>Loading</>
      )}

      {/* </div> */}
    </>
  );
}
