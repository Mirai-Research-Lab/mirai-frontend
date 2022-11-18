import Router from "next/router";
import Image from "next/image";
import { useEffect, useState } from "react";
import { ethers } from "ethers";
import { useWeb3Contract } from "react-moralis";
import MarketplaceAbi from "../constants/frontEndAbiLocation/Marketplace.json";
import networkMapping from "../constants/networkMapping.json";
import IpfsNftAbi from "../constants/frontEndAbiLocation/IpfsNFT.json";
import style from "../styles/web3.module.css";
import ClipArt from "../public/clipart.png";
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
  const handleBuyEthers = async (tokenId, price) => {
    const { ethereum } = window;
    if (ethereum) {
      try {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const marketPlaceContract = new ethers.Contract(
          networkMapping[chainId]["Marketplace"].slice(-1)[0],
          MarketplaceAbi,
          signer
        );
        let listingTx = await marketPlaceContract.buyItem(
          networkMapping[chainId]["IpfsNFT"].slice(-1)[0],
          tokenId,
          {
            value: ethers.utils.parseUnits(price.toString(), "ether"),
            gasLimit: 500000,
          }
        );
        console.log(listingTx);
      } catch (err) {
        console.log(err);
      }
    }
  };
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
    return address.substring(0, 4) + "..." + address.substring(38);
  };
  return (
    <>
      <div className="marketplace-container ">
        <button
          className="seelistednfts"
          onClick={() => Router.push("/marketplace/sell")}
        >
          See Your Listed NFTs
        </button>
        <div className="marketplace-heading">
          <h1 style={{ fontFamily: "gaming-font" }}>MARKETPLACE</h1>
          <span style={{ fontFamily: "gaming-font" }}>Buy NFTs</span>
        </div>

        <div className="nft-cards">
          <div className="nft-card">
            {/* todo: activeNfts.map */}
            {nfts.length > 0 ? (
              nfts.map((value, index) => {
                return (
                  <>
                    <div key={index}>
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
                          <div style={{ fontFamily: "jetbrains" }}>
                            Price: {value.price} ETH
                          </div>
                          <div style={{ fontFamily: "jetbrains" }}>
                            Seller: {formatAddress(value.seller)}
                          </div>
                          <div style={{ fontFamily: "jetbrains" }}>
                            NFT Address: {formatAddress(nftAddress)}
                          </div>
                          <div style={{ textAlign: "center" }}>
                            <button
                              onClick={(e) =>
                                // handleBuy(e, value.tokenId, value.price)
                                handleBuyEthers(value.tokenId, value.price)
                              }
                              className="buyNftButton"
                            >
                              Buy NFT
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
