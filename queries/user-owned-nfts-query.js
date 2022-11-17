import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client";

const USER_OWNED_NFTS_QUERY = () => gql`
  {
    nftMinteds(
      where: { minter: "0xd0a4b73c199a070F6Ce1EfC3d189A168518771eB" }
    ) {
      minter
      tokenId
    }
  }
`;
