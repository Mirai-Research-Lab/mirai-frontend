import { gql } from "@apollo/client";

const CANCELLED_ITEMS_QUERY = gql`
  {
    itemCancelleds {
      id
      seller
      tokenId
    }
  }
`;

export default CANCELLED_ITEMS_QUERY;
