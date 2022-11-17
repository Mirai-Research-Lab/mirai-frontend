import { gql } from "@apollo/client";

const USER_OWNED_NFTS_QUERY = (address) => gql`
  {
    nftMinteds(where: { owner: address }) {
      minter
      tokenId
    }
  }
`;

export default USER_OWNED_NFTS_QUERY;
