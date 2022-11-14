import Marketplace from "../../Components/Marketp.js";
import Navbar from "../../Components/nav.js";
import GET_ACTIVE_ITEMS_QUERY from "../../queries/active-items-query.js";
import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";

function index() {
  const { loading, error, data: addNfts } = useQuery(GET_ACTIVE_ITEMS_QUERY);
  console.log(addNfts);
  return (
    <div>
      <Navbar />
      <Marketplace activeNfts={addNfts} />
    </div>
  );
}

export default index;
