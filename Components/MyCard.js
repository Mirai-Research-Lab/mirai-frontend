import React from "react";
import Image from "next/image";
import nft from "../public/nft.jpg";
import nft2 from "../public/nft2.jpg";
import nft3 from "../public/nft3.jpg";
import nft4 from "../public/nft4.webp";
import Modal from "react-modal";
import Sell from "./Sell.js";
import Router from "next/router";

// import styles from "../styles/auth.module.css"

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
// Modal.setAppElement('#yourAppElement');

export default function CardDetails() {
  const [modalIsOpen, setIsOpen] = React.useState(false);
  let person = {
    name: "Anshu Bokachoda",
    imageId: "1bX5QH6",
  };
  function openModal() {
    setIsOpen(true);
  }

  // function afterOpenModal() {
  //   // references are now sync'd and can be accessed.
  //   subtitle.style.color = '#f00';
  // }

  function closeModal() {
    setIsOpen(false);
  }
  function closeModaleth() {
    setIsOpen(false);
    <Sell person={person} />;
    Router.push("/marketplace/sell");
  }

  return (
    <>
      <div className="marketplace-container myCard-container">
        <div className="marketplace-heading ">
          <h1>MY Cards</h1>
          <span>Following are the cards you own </span>
        </div>

        {/* <div className="nft-cards my-cards-div"> */}
          <div className="nft-card">
            <Image src={nft} className="nft-image" />
            <div className="nft-card-info">
              <div className="nft-card-info-heading">
                <h1>Card Name</h1>
                <span>Card Description</span>
                <div>
                  <button onClick={openModal}>Sell</button>
                  <Modal isOpen={modalIsOpen} style={customStyles}>
                    <h2>List at Eth</h2>
                    <input placeholder="Eth Amount"></input>
                    <button onClick={closeModaleth}>List</button>
                    <button onClick={closeModal}>Close</button>
                  </Modal>
                </div>
              </div>
            </div>
          </div>
        </div>
      {/* </div> */}
    </>
  );
}
