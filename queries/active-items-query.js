import { useQuery, gql } from "@apollo/client";

const GET_ACTIVE_ITEMS_QUERY = gql`
	{
		activeItems(first: 5, where: {buyer:0x0000...}){
			id,
			buyer,
			seller,
			nftAddress,
			price,
			tokenId	
		}
	}
`;

export default GET_ACTIVE_ITEMS_QUERY;
