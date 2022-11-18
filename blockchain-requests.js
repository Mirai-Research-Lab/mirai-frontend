<<<<<<< HEAD
import { useWeb3Contract, useMoralis } from "react-moralis";
import GameContract from "./constants/frontEndAbiLocation/GameContract.json";
import IpfsNFT from "./constants/frontEndAbiLocation/IpfsNFT.json";
import Marketplace from "./constants/frontEndAbiLocation/Marketplace.json";
import networkMapping from "./constants/networkMapping.json";

export const useGameContract = () => {
  const { web3, account } = useMoralis();
  const price = "10000000000000000";

  const { runContractFunction: staticMint } = useWeb3Contract({
    abi: IpfsNFT,
    contractAddress:
      networkMapping[web3.currentProvider.networkVersion]["IpfsNFT"],
    functionName: "staticMint",
    params: {
      tokenId: tokenId,
    },
  });

  const tokenId = staticMint();

  const { runContractFunction: approve } = useWeb3Contract({
    abi: IpfsNFT,
    contractAddress:
      networkMapping[web3.currentProvider.networkVersion]["IpfsNFT"],
    functionName: "approve",
    params: {
      nftAddress:
        networkMapping[web3.currentProvider.networkVersion]["Marketplace"],
      tokenId: tokenId,
    },
  });

  const { runContractFunction: listItem } = useWeb3Contract({
    abi: Marketplace,
    contractAddress:
      networkMapping[web3.currentProvider.networkVersion]["Marketplace"],
    functionName: "listItem",
    params: {
      nftAddress:
        networkMapping[web3.currentProvider.networkVersion]["Marketplace"],
      tokenId: tokenId,
      price: price, // todo: make this dynamic
    },
  });

  const { runContractFunction: fundContract } = useWeb3Contract({
    abi: GameContract,
    contractAddress:
      networkMapping[web3.currentProvider.networkVersion]["GameContract"],
    functionName: "fundContract",
    params: {},
  });

  const { runContractFunction: buyItem } = useWeb3Contract({
    abi: Marketplace,
    contractAddress:
      networkMapping[web3.currentProvider.networkVersion]["Marketplace"],
    functionName: "buyItem",
    params: {
      nftAddress:
        networkMapping[web3.currentProvider.networkVersion]["IpfsNFT"],
      tokenId: tokenId,
    },
  });

  const { runContractFunction: cancelItem } = useWeb3Contract({
    abi: Marketplace,
    contractAddress:
      networkMapping[web3.currentProvider.networkVersion]["Marketplace"],
    functionName: "cancelItem",
    params: {
      nftAddress:
        networkMapping[web3.currentProvider.networkVersion]["IpfsNFT"],
      tokenId: tokenId,
    },
  });

  const { runContractFunction: updateItem } = useWeb3Contract({
    abi: Marketplace,
    contractAddress:
      networkMapping[web3.currentProvider.networkVersion]["Marketplace"],
    functionName: "updateItem",
    params: {
      nftAddress:
        networkMapping[web3.currentProvider.networkVersion]["IpfsNFT"],
      tokenId: tokenId,
      updatedPrice: price,
    },
  });

  const { runContractFunction: withdrawAmount } = useWeb3Contract({
    abi: Marketplace,
    contractAddress:
      networkMapping[web3.currentProvider.networkVersion]["Marketplace"],
    functionName: "withdrawAmount",
    params: {},
  });

  const { runContractFunction: getAmountOwned } = useWeb3Contract({
    abi: Marketplace,
    contractAddress:
      networkMapping[web3.currentProvider.networkVersion]["Marketplace"],
    functionName: "getAmountOwned",
    params: {},
  });

  const { runContractFunction: getTokenUris } = useWeb3Contract({
    abi: IpfsNFT,
    contractAddress:
      networkMapping[web3.currentProvider.networkVersion]["IpfsNFT"],
    functionName: "getTokenUris",
    params: {
      index: tokenId,
    },
  });
};
=======
import { useWeb3Contract, useMoralis } from "react-moralis";
import GameContract from "./constants/frontEndAbiLocation/GameContract.json";
import IpfsNFT from "./constants/frontEndAbiLocation/IpfsNFT.json";
import Marketplace from "./constants/frontEndAbiLocation/Marketplace.json";
import networkMapping from "./constants/networkMapping.json";

export const useGameContract = () => {
  const { web3, account } = useMoralis();
  const price = "10000000000000000";

  const { runContractFunction: fundContract } = useWeb3Contract({
    abi: GameContract,
    contractAddress:
      networkMapping[web3.currentProvider.networkVersion]["GameContract"],
    functionName: "fundContract",
    params: {},
  });

  const { runContractFunction: cancelItem } = useWeb3Contract({
    abi: Marketplace,
    contractAddress:
      networkMapping[web3.currentProvider.networkVersion]["Marketplace"],
    functionName: "cancelItem",
    params: {
      nftAddress:
        networkMapping[web3.currentProvider.networkVersion]["IpfsNFT"],
      tokenId: tokenId,
    },
  });

  const { runContractFunction: updateItem } = useWeb3Contract({
    abi: Marketplace,
    contractAddress:
      networkMapping[web3.currentProvider.networkVersion]["Marketplace"],
    functionName: "updateItem",
    params: {
      nftAddress:
        networkMapping[web3.currentProvider.networkVersion]["IpfsNFT"],
      tokenId: tokenId,
      updatedPrice: price,
    },
  });

  const { runContractFunction: getAmountOwned } = useWeb3Contract({
    abi: Marketplace,
    contractAddress:
      networkMapping[web3.currentProvider.networkVersion]["Marketplace"],
    functionName: "getAmountOwned",
    params: {},
  });

  const { runContractFunction: getTokenUris } = useWeb3Contract({
    abi: IpfsNFT,
    contractAddress:
      networkMapping[web3.currentProvider.networkVersion]["IpfsNFT"],
    functionName: "getTokenUris",
    params: {
      index: tokenId,
    },
  });
};
>>>>>>> a45894cc3638507b374a4cddebc0bd3b99b9aee9
