import { useEffect } from "react";
import { useMoralis } from "react-moralis";
import Router from "next/router";
// import "../styles/leaderboard.css";

export default function Home({ currentuser }) {
  useEffect(() => {
    if (!currentuser) {
      Router.push("/Auth");
    } else Router.push("/home");
  }, [currentuser]);

  return <></>;
}
