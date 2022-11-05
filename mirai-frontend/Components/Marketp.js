import Image from "next/image";
import nft from "../public/nft.jpg"
import nft2 from "../public/nft2.jpg"

export default function Marketplace() {
  return (
    <>
    <div className="marketplace-container">
      <div className="marketplace-heading">
                <h1>MARKETPLACE</h1> 
                <span>Buy and sell NFTs</span>
      </div>

      <div className="nft-cards">
        <div className="nft-card">
          <Image src={nft} className="nft-image"/>
          <div className="nft-card-info">
            <div className="nft-card-info-heading">
              <h1>Card Name</h1>
              <span>Card Description</span>
              </div>
              </div>
        </div>
        <div className="nft-card">
          <Image src={nft} className="nft-image"/>
          <div className="nft-card-info">
            <div className="nft-card-info-heading">
              <h1>Card Name</h1>
              <span>Card Description</span>
              </div>
              </div>
        </div>
        <div className="nft-card">
          <Image src={nft2} className="nft-image"/>
          <div className="nft-card-info">
            <div className="nft-card-info-heading">
              <h1>Card Name</h1>
              <span>Card Description</span>
              </div>
              </div>
        </div>
        <div className="nft-card">
          <Image src={nft2} className="nft-image"/>
          <div className="nft-card-info">
            <div className="nft-card-info-heading">
              <h1>Card Name</h1>
              <span>Card Description</span>
              </div>
              </div>
        </div>
      </div>
    </div>
    </>
  )
  }