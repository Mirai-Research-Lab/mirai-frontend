import Head from 'next/head'
import Image from 'next/image'
import { useMoralis } from "react-moralis";
// import "../styles/leaderboard.css";

const supportedChains = ["31337", "5"];

export default function Home() {

  const { isWeb3Enabled, chainId } = useMoralis();

  return (
    <div >
      Hey this is my index page
    </div>
  )
}
