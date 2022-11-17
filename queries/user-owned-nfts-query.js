import { gql } from "@apollo/client";

const USER_OWNED_NFTS_QUERY = gql`
  {
    userOwnedNfts(
      where : {owner: ``}
    ) {
      tokenId
      nftAddress
      id
    }
  }
`;

export default USER_OWNED_NFTS_QUERY;
