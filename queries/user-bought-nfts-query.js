import { gql } from "@apollo/client";

const USER_BOUGHT_NFTS_QUERY = gql`
  {
    boughtItems {
      id
      tokenId
      buyer
    }
  }
`;

export default USER_BOUGHT_NFTS_QUERY;
