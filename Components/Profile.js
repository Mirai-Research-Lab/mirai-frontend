import Image from "next/image";
import nft from "../public/nft.jpg";
import { useState, useEffect } from "react";
import { useMoralis } from "react-moralis";
import pencil from '../public/pencil.png'
import Modal from "react-modal";
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
function Profile({ email, username, funding_address }) {
  const { account } = useMoralis();
  const isalreadyFunding= ()=>{
  if(account && funding_address!=account)
  return(
    <div class="fashion-studio-border pt-2">
            <span class="fashion-studio">
              <button className="mint-nfts">Set connected wallet as Funding address</button>
            </span>
          </div>
  )
  else
  return " ";
  }
  const [modalIsOpen, setIsOpen] = useState(false);
  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }
  return (
    <div className="profile">
      <div class="container d-flex justify-content-center mt-5">
        <div class="card">
          <div class="top-container">
            <Image
              src={nft}
              class="img-fluid profile-image"
              width="300px"
              height="300px"
            />
          </div>
          <button className="pencil-img" onClick={openModal}>
           <Image src={pencil} className="pencilIcon" width="30px" height="30px" />
           <Modal isOpen={modalIsOpen} style={customStyles}>
                    <h2>Update your profile pic</h2>
                    <input type="file" accept="image/*,.pdf" />
                    <button>Update</button>   
                    <button onClick={closeModal}>Close</button>
                  </Modal>
          </button>
            <div class="ml-3 profile-name">
              <h5 class="name">{username}</h5>
              <p class="mail">{email}</p>
            </div>
          <div class="wishlist-border pt-2">
            <span class="wishlist"></span>
          </div>
          <div class="fashion-studio-border pt-2">
            <span class="fashion-studio">
              <button className="mint-nfts">Mint A NFT ( remaining)</button>
            </span>
          </div>
          <div class="fashion-studio-border pt-2">
            <span class="fashion-studio">
              <button className="mint-nfts">Withdraw Balance</button>
            </span>
          </div>
          {
            isalreadyFunding()
          }
        </div>
      </div>
    </div>
  );
}

export default Profile;
