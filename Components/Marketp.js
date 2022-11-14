import Router from "next/router";
import Image from "next/image";
import nft from "../public/nft.jpg";
import nft2 from "../public/nft2.jpg";
import nft3 from "../public/nft3.jpg";
import nft4 from "../public/nft4.webp";
import { marketplace } from "./database";

export default function Marketplace({ activeNfts }) {
  <button className="Sellsection" o>
    Sell
  </button>;

  const handlesell = () => {
    Router.push("/marketplace/sell");
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
            {marketplace.map((value, index) => {
              return (
                <div>
                  <Image src={nft} alt="nft" className="nft-image" />
                  <div className="nft-card-info">
                    <div className="nft-card-info-heading">
                      <h1>Card Name</h1>
                      <span>Card Description</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
