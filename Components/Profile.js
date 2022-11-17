import Image from "next/image";
import { useState, useEffect } from "react";
import { useMoralis } from "react-moralis";
import pencil from "../public/pencil.png";
import Modal from "react-modal";
import axios from "axios";
import Router from "next/router";
import swal from "sweetalert2";

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
function Profile({ email, username, funding_address, img }) {
  const [item, setItem] = useState("");
  async function updatePP() {
    const formdata = new FormData();
    console.log(item);
    formdata.append("image", item);
    formdata.append("address", "");
    console.log(formdata.image);
    try{const res = await axios.post(
      "https://mirai-backend-kappa.vercel.app/api/player/updateuser",
      formdata,
      {
        withCredentials: true,
        headers: {
          cookies: document.cookie,
        },
      }
    );
    console.log(res);
    Router.reload();}
    catch(e)
    {
      swal.fire({
        icon: "error",
        text: "Please input a valid file",
      });
    }
  }
  const { account } = useMoralis();
  const isalreadyFunding = () => {
    if (account && funding_address != account)
      return (
        <div className="fashion-studio-border pt-2">
          <span className="fashion-studio">
            <button
              className="mint-nfts"
              onClick={async () => {
                const formdata = new FormData();
                formdata.append("address", account);
                await axios.post(
                  "https://mirai-backend-kappa.vercel.app/api/player/updateuser",
                  formdata,
                  {
                    withCredentials: true,
                  }
                );
                Router.reload();
              }}
            >
              Set connected wallet as Funding address
            </button>
          </span>
        </div>
      );
    else return " ";
  };
  const [modalIsOpen, setIsOpen] = useState(false);
  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }
  return (
    <div className="profile">
      <div className="container d-flex justify-content-center mt-5">
        <div className="card">
          <div className="top-container">
            <img
              src={img}
              className="img-fluid profile-image"
              width="300px"
              height="300px"
              alt="profile"
            />
          </div>
          <button className="pencil-img" onClick={openModal}>
            <Image
              src={pencil}
              className="pencilIcon"
              width="30px"
              height="30px"
              alt="edit"
            />
            <Modal isOpen={modalIsOpen} style={customStyles}>
              <h2>Update your profile pic</h2>
              <input
                type="file"
                accept="image/*,.pdf"
                onChange={(e) => setItem(e.target.files[0])}
              />
              <button onClick={updatePP}>Update</button>
              <button onClick={closeModal}>Close</button>
            </Modal>
          </button>
          <div className="ml-3 profile-name">
            <h5 className="name">{username}</h5>
            <p className="mail">{email}</p>
          </div>
          <div className="wishlist-border pt-2">
            <span className="wishlist"></span>
          </div>
          <div className="fashion-studio-border pt-2">
            <span className="fashion-studio">
              <button className="mint-nfts">Mint A NFT ( remaining)</button>
            </span>
          </div>
          <div className="fashion-studio-border pt-2">
            <span className="fashion-studio">
              <button className="mint-nfts">Withdraw Balance</button>
            </span>
          </div>
          {isalreadyFunding()}
        </div>
      </div>
    </div>
  );
}

export default Profile;
