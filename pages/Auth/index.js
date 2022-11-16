import Auth from "../../Components/Auth.js";
import Navbar from "../../Components/nav.js";
import { useEffect } from "react";
import Router from "next/router";
export default function Nav() {
  useEffect(() => {
    if (localStorage.getItem("jwt") != null) {
      Router.push("/home");
    }
  });
  return (
    <div>
      <Auth></Auth>
    </div>
  );
}
