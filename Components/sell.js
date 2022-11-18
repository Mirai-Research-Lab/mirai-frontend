import { useEffect, useState } from "react";
import { ethers } from "ethers";
import Image from "next/image";
import MarketplaceAbi from "../constants/frontEndAbiLocation/Marketplace.json";
import networkMapping from "../constants/networkMapping.json";
import IpfsNftAbi from "../constants/frontEndAbiLocation/IpfsNFT.json";
import Modal from "react-modal";
import swal from "sweetalert2";
import { useMoralis, useWeb3Contract } from "react-moralis";
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
function Sell({ activeNfts }) {
  const [isOpen, setisOpen] = useState(false);
  const [ownersNfts, setOwnersNfts] = useState([]);
  const [price, setPrice] = useState(0);
  const [tid, settId] = useState("");
  const chainId = "5";
  const { account } = useMoralis();
  const { data, error, runContractFunction, isFetching, isLoading } =
    useWeb3Contract();
  const nftAddress = networkMapping[chainId]["IpfsNFT"][5];
  const setNftsInArray = async (imageUris) => {
    const nftsTemp = [];
    for (let i = 0; i < imageUris.length; i++) {
      const nft = {
        tokenId: activeNfts[i].tokenId,
        imageUri: imageUris[i],
        price: ethers.utils.formatEther(activeNfts[i].price.toString()),
        seller: activeNfts[i].seller,
      };
      nftsTemp.push(nft);
    }

    let nftsOwned = nftsTemp.filter((nft) => nft.seller === account);
    console.log(nftsOwned);
    setOwnersNfts(nftsOwned);
  };
  function openModal(tide) {
    setisOpen(true);
    settId(tide);
    console.log(isOpen);
  }

  function closeModal() {
    console.log("closing modal");
    setisOpen(!isOpen);
  }
  const setImageUris = async (tokenUris) => {
    const imageUris = await Promise.all(
      tokenUris.map(async (tokenUri) => {
        const response = await fetch(tokenUri);
        const data = await response.json();
        const imageUri = data.image;
        const formattedImageUri = imageUri.replace(
          "ipfs://",
          "https://ipfs.io/ipfs/"
        );
        return formattedImageUri;
      })
    );
    setNftsInArray(imageUris);
  };

  const setTokenUris = async () => {
    let tokenUris = [];
    for (let i = 0; i < activeNfts.length; i++) {
      const options = {
        abi: IpfsNftAbi,
        contractAddress: networkMapping[chainId]["IpfsNFT"][5],
        functionName: "tokenURI",
        params: {
          tokenId: activeNfts[i].tokenId,
        },
      };
      let tokenUri = await runContractFunction({ params: options });
      console.log(tokenUri.toString());
      let formattedTokenUri = tokenUri
        .toString()
        .replace("ipfs://", "https://ipfs.io/ipfs/");
      console.log(formattedTokenUri);
      tokenUris.push(formattedTokenUri.toString());
    }
    setImageUris(tokenUris);
  };
  useEffect(() => {
    setTokenUris();
  }, [activeNfts]);
  const handleBuy = async (tokenId, price) => {
    console.log("buying");
    const options = {
      abi: MarketplaceAbi,
      contractAddress: networkMapping[chainId]["Marketplace"][1],
      functionName: "buyItem",
      params: {
        nftAddress: networkMapping[chainId]["IpfsNFT"][5],
        tokenId: tokenId,
      },
      msgValue: ethers.utils.parseEther(price),
    };
    const response = await runContractFunction({
      params: options,
    });
  };

  const cancelItem = async (tid) => {
    const options = {
      abi: MarketplaceAbi,
      contractAddress: networkMapping[chainId]["Marketplace"].slice(-1)[0],
      functionName: "cancelItem",
      params: {
        nftAddress: networkMapping[chainId]["IpfsNFT"].slice(-1)[0],
        tokenId: tid,
      },
    };

    await runContractFunction({
      params: options,

      onSuccess: (success) => {
        console.log(success);
      },

      onError: (err) => {
        console.log(err);
      },
    });
  };

  const updateItem = async () => {
    if (price <= 0) {
      swal.fire({
        icon: "error",
        title: "Listing Price cannot be 0",
        text: "Please enter appropriate amount",
      });
      return;
    }
    const options = {
      abi: MarketplaceAbi,
      contractAddress: networkMapping[chainId]["Marketplace"].slice(-1)[0],
      functionName: "updateItem",
      params: {
        nftAddress: networkMapping[chainId]["IpfsNFT"].slice(-1)[0],
        tokenId: tid,
        updatedPrice: price,
      },
    };

    await runContractFunction({
      params: options,

      onSuccess: () => {
        alert("OK");
      },

      onError: (err) => {
        alert("Error");
        console.log(err);
      },
    });
  };

  const formatAddress = (address) => {
    return address.substring(0, 6) + "..." + address.substring(38);
  };

  return (
    <>
      <Modal isOpen={isOpen} style={customStyles}>
        <h2>Update Listing Eth Price</h2>
        <input
          placeholder="Eth Amount"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        ></input>
        <button onClick={(e) => updateItem()}>List</button>
        <button onClick={closeModal}>Close</button>
      </Modal>
      <div className="marketplace-container ">
        <div className="marketplace-heading">
          <h1 style={{ fontFamily: "gaming-font" }}>YOUR LISTED NFTS</h1>
          <span style={{ fontFamily: "gaming-font" }}>Update NFTs</span>
        </div>
        {ownersNfts && ownersNfts.length > 0 ? (
          <div className="nft-cards">
            <div className="nft-card">
              {ownersNfts.map((value, index) => {
                return (
                  <>
                    <div key={index}>
                      <Image
                        src={value.imageUri}
                        alt="nft"
                        className="nft-image"
                        width={350}
                        height={350}
                      />
                      <div className="nft-card-info">
                        <div className="nft-card-info-heading">
                          <div style={{ fontFamily: "jetbrains" }}>
                            Current Listed Price : {value.price}
                          </div>
                          <div style={{ fontFamily: "jetbrains" }}>
                            Card Token Id: {value.tokenId}
                          </div>
                          <div style={{ fontFamily: "jetbrains" }}>
                            NFT Address: {formatAddress(nftAddress)}
                          </div>
                          <div style={{ textAlign: "center" }}>
                            <button
                              onClick={(e) => openModal(value.tokenId)}
                              className="buyNftButton"
                              style={{ marginRight: "20px" }}
                            >
                              Update Listing
                            </button>
                            <button
                              onClick={(e) => cancelItem(value.tokenId)}
                              className="buyNftButton"
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                );
              })}
            </div>
          </div>
        ) : (
          <div className="web3NotEnabled">
            . . . . . No NFTs Listed for Sale . . . . . .
          </div>
        )}
      </div>
    </>
  );
}

export default Sell;
