import Image from "next/image";
import { useState, useEffect } from "react";
<<<<<<< HEAD
import { useMoralis } from "react-moralis";
=======
import { useMoralis, useWeb3Contract } from "react-moralis";
>>>>>>> a45894cc3638507b374a4cddebc0bd3b99b9aee9
import pencil from "../public/pencil.png";
import Modal from "react-modal";
import axios from "axios";
import Router from "next/router";
<<<<<<< HEAD

=======
import swal from "sweetalert2";

import Marketplace from "../constants/frontEndAbiLocation/Marketplace.json";
import IpfsNFT from "../constants/frontEndAbiLocation/IpfsNFT.json";
import networkMapping from "../constants/networkMapping.json";

>>>>>>> a45894cc3638507b374a4cddebc0bd3b99b9aee9
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
<<<<<<< HEAD
function Profile({ email, username, funding_address, img }) {
  const { account } = useMoralis();
=======
function Profile({ email, username, funding_address, img, currentuser }) {
  const { web3, account } = useMoralis();
  const chainId = "5";

  const { runContractFunction: withdrawAmount } = useWeb3Contract({
    abi: Marketplace,
    contractAddress: networkMapping[chainId]["Marketplace"].slice(-1)[0],
    functionName: "withdrawAmount",
    params: {},
  });

  const { runContractFunction: staticMint } = useWeb3Contract({
    abi: IpfsNFT,
    contractAddress: networkMapping[chainId]["IpfsNFT"].slice(-1)[0],
    functionName: "staticMint",
    params: {},
  });

  const withdraw = async () => {
    withdrawAmount({
      onSuccess: (txHash) => {
        console.log(txHash);
      },
      onError: (error) => {
        console.log(error);
      },
    });
  };

  const mintnfts = async () => {
    if (currentuser.mintCount > 0) {
      const tokenId = staticMint({
        onSuccess: async (result) => {
          console.log(result);
          await axios.post(
            "https://mirai-backend-kappa.vercel.app/api/player/decrementmintcount",
            {
              withCredentials: true,
              body: {
                username: currentuser.username,
              },
              headers: {
                cookies: document.cookie,
              },
            }
          );
        },
        onError: (error) => {
          console.log(error);
        },
      });
    }
  };
  const [item, setItem] = useState("");
  async function updatePP() {
    const formdata = new FormData();
    console.log(item);
    formdata.append("image", item);
    formdata.append("address", "");
    console.log(formdata.image);
    try {
      const res = await axios.post(
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
      Router.reload();
    } catch (e) {
      swal.fire({
        icon: "error",
        text: "Please input a valid file",
      });
    }
  }
>>>>>>> a45894cc3638507b374a4cddebc0bd3b99b9aee9
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
<<<<<<< HEAD
=======
                    headers: {
            cookies: document.cookie,
          },
>>>>>>> a45894cc3638507b374a4cddebc0bd3b99b9aee9
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
<<<<<<< HEAD
            <Image
              src={
                img ||
                "https://res.cloudinary.com/dw5syikwo/image/upload/v1668621035/gl8my8lcye8cptjwqn6j.jpg"
              }
=======
            <img
              src={img}
>>>>>>> a45894cc3638507b374a4cddebc0bd3b99b9aee9
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
<<<<<<< HEAD
              <input type="file" accept="image/*,.pdf" />
              <button>Update</button>
=======
              <input
                type="file"
                accept="image/*,.pdf"
                onChange={(e) => setItem(e.target.files[0])}
              />
              <button onClick={updatePP}>Update</button>
>>>>>>> a45894cc3638507b374a4cddebc0bd3b99b9aee9
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
<<<<<<< HEAD
              <button className="mint-nfts">Mint A NFT ( remaining)</button>
=======
              <button
                className="mint-nfts"
                onClick={mintnfts}
                disabled={currentuser.mintCount <= 0}
              >
                Mint A NFT ( {currentuser.mintCount} remaining )
              </button>
>>>>>>> a45894cc3638507b374a4cddebc0bd3b99b9aee9
            </span>
          </div>
          <div className="fashion-studio-border pt-2">
            <span className="fashion-studio">
<<<<<<< HEAD
              <button className="mint-nfts">Withdraw Balance</button>
=======
              <button className="mint-nfts" onClick={withdraw}>
                Withdraw Balance
              </button>
>>>>>>> a45894cc3638507b374a4cddebc0bd3b99b9aee9
            </span>
          </div>
          {isalreadyFunding()}
        </div>
      </div>
    </div>
  );
}

export default Profile;
