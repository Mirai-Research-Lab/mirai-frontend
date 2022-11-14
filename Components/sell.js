import React from 'react'
import Image from "next/image";
import nft from "../public/nft.jpg"
import { sell } from "./database";

function Sell({person}) {
  return (
    <>
      <div className="marketplace-container ">
        <div className="marketplace-heading">
          <h1>MARKETPLACE</h1>
          <span>Buy NFTs</span>
        </div>

        <div className="nft-cards">
        <div className="nft-card">
            {
              sell.map((value, index) => {
                return (
                  <div>
                  <Image src={nft} alt="nft" className="nft-image" />
                  <div className="nft-card-info">
              <div className="nft-card-info-heading">
                <h1>Card Name : {person.name}</h1>
                <span>Card Description : {value.desc}</span>
              </div>
            </div>
                    </div> 
                )
              }
              )
            }
          </div>
        </div>
      </div>
    </>
  )
}

export default Sell