import { useEffect } from "react";
import { useMoralis } from "react-moralis";
import Router from "next/router";
// import "../styles/leaderboard.css";

export default function Home() {
  useEffect(() => {
    Router.push("/Auth");
  }, []);

  return <></>;
}
