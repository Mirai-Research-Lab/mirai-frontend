import MainPage from "../../Components/Main.js";
import Features from "../../Components/Option.js";
import Navbar from "../../Components/nav.js";
import { useEffect } from "react";
import Router from "next/router.js";
import axios from "axios";
import swal from "sweetalert2";
function Index({ currentuser }) {
  useEffect(() => {
    if (!currentuser) {
      swal.fire({
        icon: "error",
        title: "Cannot access page before signing in",
        text: "Redirecting to Auth page",
      });
      const myTimeout = setTimeout(() => {}, 3000);
    }
  });
  return (
    <div>
      <Navbar />
      <MainPage />
      <Features />
    </div>
  );
}

export default Index;
