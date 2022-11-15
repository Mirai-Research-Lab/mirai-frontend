import Image from "next/image";
import nft from "../public/nft.jpg";
import { useState, useEffect } from "react";

function Profile({ email, username }) {
  return (
    <div className="profile">
      <div class="container d-flex justify-content-center mt-5">
        <div class="card">
          <div class="top-container">
            <Image
              src={nft}
              class="img-fluid profile-image"
              width="70"
            />

            <div class="ml-3 profile-name">
              <h5 class="name">{username}</h5>
              <p class="mail">{email}</p>
            </div>
          </div>

          <div class="middle-container d-flex justify-content-between align-items-center mt-3 p-2">
            <div class="dollar-div px-3">
              <div class="round-div">
                <i class="fa fa-dollar dollar"></i>
              </div>
            </div>
            <div class="d-flex flex-column text-right mr-2">
              <span class="current-balance">Current Balance</span>
              <span class="amount">
                <span class="dollar-sign">$</span>1476
              </span>
            </div>
          </div>
          <div class="wishlist-border pt-2">
            <span class="wishlist"></span>
          </div>
          <div class="fashion-studio-border pt-2">
            <span class="fashion-studio">
              <button className="mint-nfts">Mint A NFT</button>
            </span>
          </div>
          <div class="fashion-studio-border pt-2">
            <span class="fashion-studio">
              <button className="mint-nfts">Withdraw Balance</button>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
