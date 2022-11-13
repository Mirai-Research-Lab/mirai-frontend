import Image from "next/image";
import nft from "../public/nft.jpg"
import nft2 from "../public/nft2.jpg"
import nft3 from "../public/nft3.jpg"
import nft4 from "../public/nft4.webp"

export default function CardDetails() {
  return (
    <>
    <div className="marketplace-container myCard-container">
      <div className="marketplace-heading ">
                <h1>MY Cards</h1> 
                <span>Following are the cards you own </span>
      </div>

      <div className="nft-cards my-cards-div">
        <div className="nft-card">
          <Image src={nft} className="nft-image"/>
          <div className="nft-card-info">
            <div className="nft-card-info-heading">
              <h1>Card Name</h1>
              <span>Card Description</span>
              <div>
              <button>
                Sell
              </button>
              </div>
              </div>
              </div>
        </div>
        <div className="nft-card">
          <Image src={nft3} className="nft-image"/>
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
          <Image src={nft4} className="nft-image"/>
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
          <Image src={nft3} className="nft-image"/>
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