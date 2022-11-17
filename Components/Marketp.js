import Router from "next/router";
import Image from "next/image";
import nft from "../public/nft.jpg";
import { marketplace } from "./database";

import { useWeb3Contract } from "react-moralis";
import MarketplaceAbi from "../constants/frontEndAbiLocation/Marketplace.json";
import networkMapping from "../constants/networkMapping.json";

export default function Marketplace({ activeNfts }) {
  const chainId = "5";
  const { runContractFunction: buyItem } = useWeb3Contract({
    abi: MarketplaceAbi,
    contractAddress: networkMapping[chainId]["Marketplace"],
    functionName: "buyItem",
    params: {
      nftAddress: networkMapping[chainId]["IpfsNFT"],
    },
  });
  const handlesell = () => {
    Router.push("/marketplace/sell");
  };

  const handleBuy = (e, tokenId) => {
    buyItem({
      params: {
        tokenId: tokenId,
      },

      onSuccess: (e) => {
        console.log("success");
      },

      onError: (e) => {
        console.log("error");
      },
    });
  };

  return (
    <>
      <button className="Sellsection" onClick={handlesell}>
        Sell
      </button>
      <div className="marketplace-container ">
        <div className="marketplace-heading">
          <h1>MARKETPLACE</h1>
          <span>Buy NFTs</span>
        </div>

        <div className="nft-cards">
          <div className="nft-card">
            {/* todo: activeNfts.map */}
            {marketplace.map((value, index) => {
              return (
                <>
                  key = {index};
                  <div onClick={(e) => handleBuy(e, value.tokenId)}>
                    <Image src={nft} alt="nft" className="nft-image" />
                    <div className="nft-card-info">
                      <div className="nft-card-info-heading">
                        <h1>Card Name</h1>
                        <span>Card Description</span>
                      </div>
                    </div>
                  </div>
                </>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
