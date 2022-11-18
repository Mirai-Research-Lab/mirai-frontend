import { useEffect, useState } from "react";
import { ethers } from "ethers";
import Image from "next/image";
import nft from "../public/nft.jpg";
import { sell } from "./database";
import MarketplaceAbi from "../constants/frontEndAbiLocation/Marketplace.json";
import networkMapping from "../constants/networkMapping.json";
import IpfsNftAbi from "../constants/frontEndAbiLocation/IpfsNFT.json";

import { useMoralis, useWeb3Contract } from "react-moralis";
function Sell({ activeNfts }) {
  const [ownersNfts, setOwnersNfts] = useState([]);
  const chainId = "5";
  const { account } = useMoralis();
  const { data, error, runContractFunction, isFetching, isLoading } =
    useWeb3Contract();
  const nftAddress = networkMapping[chainId]["IpfsNFT"][5];
  const setNftsInArray = async (imageUris) => {
    const nftsTemp = [];
    for (let i = 0; i < imageUris.length; i++) {
      const nft = {
        tokenId: activeNfts[i].tokenId,
        imageUri: imageUris[i],
        price: ethers.utils.formatEther(activeNfts[i].price.toString()),
        seller: activeNfts[i].seller,
      };
      nftsTemp.push(nft);
    }
    let nftsOwned = nftsTemp.filter((nft) => nft.seller === account);
    console.log(nftsOwned);
    setOwnersNfts(nftsOwned);
  };
  const setImageUris = async (tokenUris) => {
    const imageUris = await Promise.all(
      tokenUris.map(async (tokenUri) => {
        const response = await fetch(tokenUri);
        const data = await response.json();
        const imageUri = data.image;
        const formattedImageUri = imageUri.replace(
          "ipfs://",
          "https://ipfs.io/ipfs/"
        );
        return formattedImageUri;
      })
    );
    setNftsInArray(imageUris);
  };

  const setTokenUris = async () => {
    let tokenUris = [];
    for (let i = 0; i < activeNfts.length; i++) {
      const options = {
        abi: IpfsNftAbi,
        contractAddress: networkMapping[chainId]["IpfsNFT"][5],
        functionName: "tokenURI",
        params: {
          tokenId: activeNfts[i].tokenId,
        },
      };
      let tokenUri = await runContractFunction({ params: options });
      console.log(tokenUri.toString());
      let formattedTokenUri = tokenUri
        .toString()
        .replace("ipfs://", "https://ipfs.io/ipfs/");
      console.log(formattedTokenUri);
      tokenUris.push(formattedTokenUri.toString());
    }
    setImageUris(tokenUris);
  };
  useEffect(() => {
    setTokenUris();
  }, [activeNfts]);
  const handleBuy = async (e, tokenId, price) => {
    console.log("buying");
    const options = {
      abi: MarketplaceAbi,
      contractAddress: networkMapping[chainId]["Marketplace"][1],
      functionName: "buyItem",
      params: {
        nftAddress: networkMapping[chainId]["IpfsNFT"][5],
        tokenId: tokenId,
      },
      msgValue: ethers.utils.parseEther(price),
    };
    const response = await runContractFunction({
      params: options,
    });
  };

  const cancelItem = async (e) => {
    const options = {
      abi: MarketplaceAbi,
      contractAddress: networkMapping[chainId]["Marketplace"].slice(-1)[0],
      functionName: "cancelItem",
      params: {
        nftAddress: networkMapping[chainId]["IpfsNFT"].slice(-1)[0],
        tokenId: tokenId,
      },
    };

    await runContractFunction({
      params: options,

      onSuccess: (success) => {
        alert("OK");
        console.log(success);
      },

      onError: (err) => {
        alert("Error");
        console.log(err);
      },
    });
  };

  const updateItem = async () => {
    const options = {
      abi: MarketplaceAbi,
      contractAddress: networkMapping[chainId]["Marketplace"].slice(-1)[0],
      functionName: "updateItem",
      params: {
        nftAddress: networkMapping[chainId]["IpfsNFT"].slice(-1)[0],
        tokenId: tokenId,
        updatedPrice: price,
      },
    };

    await runContractFunction({
      params: options,

      onSuccess: () => {
        alert("OK");
      },

      onError: (err) => {
        alert("Error");
        console.log(err);
      },
    });
  };

  // useEffect(() => {
  //   console.log("I am all nfts", nfts);
  //   const filterNfts = nfts.filter((nft) => nft.seller === account);
  //   setOwnersNfts(filterNfts);
  //   console.log("hello", filterNfts);
  // }, [account]);
  const formatAddress = (address) => {
    return address.substring(0, 6) + "..." + address.substring(38);
  };

  return (
    <>
      <div className="marketplace-container ">
        <div className="marketplace-heading">
          <h1 style={{ fontFamily: "gaming-font" }}>YOUR LISTED NFTS</h1>
          <span style={{ fontFamily: "gaming-font" }}>Update NFTs</span>
        </div>
        {ownersNfts && ownersNfts.length > 0 ? (
          <div className="nft-cards">
            <div className="nft-card">
              {ownersNfts.map((value, index) => {
                return (
                  <>
                    <div key={index}>
                      <Image
                        src={value.imageUri}
                        alt="nft"
                        className="nft-image"
                        width={350}
                        height={350}
                      />
                      <div className="nft-card-info">
                        <div className="nft-card-info-heading">
                          <div style={{ fontFamily: "jetbrains" }}>
                            Current Listed Price : {value.price}
                          </div>
                          <div style={{ fontFamily: "jetbrains" }}>
                            Card Token Id: {value.tokenId}
                          </div>
                          <div style={{ fontFamily: "jetbrains" }}>
                            NFT Address: {formatAddress(nftAddress)}
                          </div>

                          <div style={{ textAlign: "center" }}>
                            <button
                              onClick={(e) => cancelItem(e)}
                              className="buyNftButton"
                              style={{ marginRight: "20px" }}
                            >
                              Update Listing
                            </button>
                            <button
                              onClick={(e) => cancelItem(e)}
                              className="buyNftButton"
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                );
              })}
            </div>
          </div>
        ) : (
          <div className="web3NotEnabled">
            . . . . . No NFTs Listed for Sale . . . . . .
          </div>
        )}
      </div>
    </>
  );
}

export default Sell;
