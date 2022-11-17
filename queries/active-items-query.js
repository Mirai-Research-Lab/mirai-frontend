import { gql } from "@apollo/client";

const GET_ACTIVE_ITEMS_QUERY = gql`
  {
    activeItems(
      where: { buyer: "0x0000000000000000000000000000000000000000" }
    ) {
      seller
      tokenId
      nftAddress
      price
      id
      buyer
    }
  }
`;

export default GET_ACTIVE_ITEMS_QUERY;
