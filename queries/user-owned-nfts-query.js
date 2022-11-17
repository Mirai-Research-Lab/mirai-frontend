import { gql } from "@apollo/client";

const USER_OWNED_NFTS_QUERY = gql`
  {
    nftMinteds {
      id
      minter
      tokenId
    }
  }
`;

export default USER_OWNED_NFTS_QUERY;
