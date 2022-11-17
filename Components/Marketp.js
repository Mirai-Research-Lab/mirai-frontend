import Router from "next/router";
import Image from "next/image";
import { useEffect, useState } from "react";
import { ethers } from "ethers";
import { useWeb3Contract } from "react-moralis";
import MarketplaceAbi from "../constants/frontEndAbiLocation/Marketplace.json";
import networkMapping from "../constants/networkMapping.json";
import IpfsNftAbi from "../constants/frontEndAbiLocation/IpfsNFT.json";
import style from "../styles/web3.module.css";
export default function Marketplace({ activeNfts }) {
  const [nfts, setNfts] = useState([]);
  const chainId = "5";
  const { data, error, runContractFunction, isFetching, isLoading } =
    useWeb3Contract();
  const nftAddress = networkMapping[chainId]["IpfsNFT"][5];
  const setNftsInArray = async (imageUris) => {
    const nfts = [];
    for (let i = 0; i < imageUris.length; i++) {
      const nft = {
        tokenId: activeNfts[i].tokenId,
        imageUri: imageUris[i],
        price: ethers.utils.formatEther(activeNfts[i].price.toString()),
        seller: activeNfts[i].seller,
      };
      console.log(nfts);
      nfts.push(nft);
    }
    console.log(nfts);
    setNfts(nfts);
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

  const formatAddress = (address) => {
    return address.substring(0, 6) + "..." + address.substring(38);
  };
  return (
    <>
      <div className="marketplace-container ">
        <button
          className="seelistednfts"
          onClick={() => Router.push("/Marketplace/sell")}
        >
          See Your Listed NFTs
        </button>
        <div className="marketplace-heading">
          <h1>MARKETPLACE</h1>
          <span>Buy NFTs</span>
        </div>

        <div className="nft-cards">
          <div className="nft-card">
            {/* todo: activeNfts.map */}
            {nfts.length > 0 ? (
              nfts.map((value, index) => {
                return (
                  <>
                    <div
                      onClick={(e) => handleBuy(e, value.tokenId, value.price)}
                      key={index}
                    >
                      <div className="nft-image">
                        <Image
                          src={value.imageUri}
                          alt="nft"
                          width={350}
                          height={350}
                        />
                      </div>
                      <div className="nft-card-info">
                        <div className="nft-card-info-heading">
                          <h1>Price: {value.price} ETH</h1>
                          <span>Seller:{formatAddress(value.seller)}</span>
                          <span>NFT Address: {formatAddress(nftAddress)}</span>
                        </div>
                      </div>
                    </div>
                  </>
                );
              })
            ) : (
              <div className={style.web3NotEnabled}>
                . . . . No NFTs Available for Sale . . . .
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
