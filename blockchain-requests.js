import { useWeb3Contract, useMoralis } from "react-moralis";
import GameContract from "./constants/frontEndAbiLocation/GameContract.json";
import IpfsNFT from "./constants/frontEndAbiLocation/IpfsNFT.json";
import Marketplace from "./constants/frontEndAbiLocation/Marketplace.json";
import networkMapping from "./constants/networkMapping.json";

export const useGameContract = () => {
  const { web3, account } = useMoralis();
  const price = "10000000000000000";

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
