import Marketplace from "../../Components/Marketp.js";
import Navbar from "../../Components/nav.js";
import GET_ACTIVE_ITEMS_QUERY from "../../queries/active-items-query.js";
import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";

function index() {
  const [activeNfts, setActiveNfts] = useState([]);

  useEffect(() => {
    const { data } = useQuery(GET_ACTIVE_ITEMS_QUERY);
    setActiveNfts(data);
  }, []);

  return (
    <div>
      <Navbar />
      <Marketplace activeNfts={activeNfts} />
    </div>
  );
}

export default index;
