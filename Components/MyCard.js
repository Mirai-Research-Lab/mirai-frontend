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
  const { web3, account, chainId } = useMoralis();
  const formattedChainId = parseInt(Number(chainId.toString()));
  const [formattedImageAddress, setFormattedImageAddress] = React.useState("");

  const { runContractFunction } = useWeb3Contract();
  const { runContractFunction: approve } = useWeb3Contract();
  const { runContractFunction: listItem } = useWeb3Contract();
  const nftAddress = networkMapping[formattedChainId]["IpfsNFT"].slice(-1)[0];
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
    if (nft && nft.minter == account) {
      processURIs();
    }
  }, [nft]);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(!modalIsOpen);
  }
  function closeModaleth() {
    setIsOpen(false);
    Router.reload();
  }

  // console.log("dfdsaf", formattedImageUri);
  // const handleBuy = async (result) => {
  //   console.log(result);
  //   const options = {
  //     abi: Marketplace,
  //     contractAddress:
  //       networkMapping[formattedChainId]["Marketplace"].slice(-1)[0],
  //     functionName: "listItem",
  //     params: {
  //       nftAddress:
  //         networkMapping[formattedChainId]["Marketplace"].slice(-1)[0],
  //       tokenId: nft.tokenId,
  //       price: ethers.utils.parseUnits(price.toString(), "ether"),
  //     },
  //   };

  //   await listItem({
  //     gasLimit: 3e7,
  //     params: options,
  //     onSuccess: (result) => {
  //       console.log(result);
  //       closeModaleth();
  //     },
  //     onError: (result) => {
  //       console.log(result);
  //       // closeModaleth();
  //     },
  //   });
  // };

  const handleBuyEthers = async (result) => {
    console.log(result);
    console.log("hello");
    const { ethereum } = window;
    if (ethereum) {
      try {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const marketPlaceContract = new ethers.Contract(
          networkMapping[formattedChainId]["Marketplace"].slice(-1)[0],
          Marketplace,
          signer
        );
        let listingTx = await marketPlaceContract.listItem(
          networkMapping[formattedChainId]["IpfsNFT"].slice(-1)[0],
          nft.tokenId,
          ethers.utils.parseUnits(price.toString(), "ether"),
          {
            gasLimit: 3e7,
          }
        );
        console.log(listingTx);
      } catch (err) {
        console.log(err);
      }
    }
  };

  const handleApprove = async () => {
    console.log(price);
    if (price > 0) {
      console.log("hello");
      const options = {
        abi: IpfsNFT,
        contractAddress:
          networkMapping[formattedChainId]["IpfsNFT"].slice(-1)[0],
        functionName: "approve",
        params: {
          to: networkMapping[formattedChainId]["Marketplace"].slice(-1)[0],
          tokenId: nft.tokenId,
        },
      };
      await approve({
        gasLimit: 3e7,
        params: options,
        onSuccess: (result) => handleBuyEthers(result),
        onError: (error) => {
          console.log("approve error", error);
        },
      });
    }
  };
  const formatAddress = (address) => {
    return address.substring(0, 4) + "..." + address.substring(38);
  };
  return (
    <>
      <Modal isOpen={modalIsOpen} style={customStyles}>
        <h2>List at Eth</h2>
        <input
          placeholder="Eth Amount"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        ></input>
        <button onClick={(e) => handleApprove()}>List</button>
        <button onClick={closeModal}>Close</button>
      </Modal>
      {/* <div className="nft-cards my-cards-div"> */}
      {nft.minter == account ? (
        formattedImageAddress != "" ? (
          <div className="nft-card">
            <Image
              src={formattedImageAddress}
              className="nft-image"
              alt=""
              width={350}
              height={350}
            />
            <div className="nft-card-info">
              <div className="nft-card-info-heading">
                <div style={{ fontFamily: "jetbrains" }}>
                  Token Id: {nft.tokenId}
                </div>
                <div style={{ fontFamily: "jetbrains" }}>
                  NFT Address: {formatAddress(nftAddress)}
                </div>
                <div>
                  <button className="buyNftButton" onClick={openModal}>
                    Sell
                  </button>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(nftAddress);
                    }}
                    className="clipartButton"
                  >
                    Copy NFT Address
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <>Loading</>
        )
      ) : (
        <div></div>
      )}

      {/* </div> */}
    </>
  );
}
