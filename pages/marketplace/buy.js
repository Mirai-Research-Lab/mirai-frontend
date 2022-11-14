import Marketplace from "../../Components/Marketp.js";
import Navbar from "../../Components/nav.js";
import GET_ACTIVE_ITEMS_QUERY from "../../queries/active-items-query.js";
import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";

import Router from "next/router.js";
import swal from "sweetalert2";
function index({ currentuser }) {
  const { loading, error, data: addNfts } = useQuery(GET_ACTIVE_ITEMS_QUERY);
  console.log(addNfts);
  const [activeNfts, setActiveNfts] = useState([]);
  useEffect(() => {
    if (!currentuser) {
      swal.fire({
        icon: "error",
        title: "Cannot access page before signing in",
        text: "Redirecting to Auth page",
      });
      Router.push("/auth");
    }
    const { data } = useQuery(GET_ACTIVE_ITEMS_QUERY);
    setActiveNfts(data);
  }, []);
  return (
    <div>
      <Navbar />
      <Marketplace activeNfts={addNfts} />
    </div>
  );
}

export default index;
