import Auth from "../../Components/Auth.js";
import Navbar from "../../Components/nav.js";
import { useEffect } from "react";
import Router from "next/router";
export default function Nav() {
  useEffect(() => {
    if (
      document.cookie &&
      document.cookie != "jwt=undefined" &&
      document.cookie != ""
    ) {
      Router.push("/home");
    }
  });
  return (
    <div>
      <Auth></Auth>
    </div>
  );
}
