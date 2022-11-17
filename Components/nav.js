import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { ConnectButton } from "@web3uikit/web3";
import { useMoralis } from "react-moralis";
import { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";
import Swal from "sweetalert2";
import Router from "next/router";
export default function Navabr() {
  const swal = Swal;
  const { account, isWeb3Enabled } = useMoralis();
  useEffect(() => {
    if (account) {
      const body = { address: account };
      checkWalletAddress(body);
    }
  },[account,isWeb3Enabled]);
  const checkWalletAddress = async (body) => {
    console.log("checking wallet address");
    try {
      const check = await axios.post(
        "https://mirai-backend-kappa.vercel.app/api/wallet/checkWalletAddress",
        body,
        {
          withCredentials: true,
        }
      );
      if (check.status == 201) {
        if (check.data.includes("exists")) {
          return;
        } else {
          const setEmail = await axios.put(
            "https://mirai-backend-kappa.vercel.app/api/player/updateAddress",
            body,
            {
              withCredentials: true,
            }
          );
          const setWallet = await axios.put(
            "https://mirai-backend-kappa.vercel.app/api/player/addWalletAddress",
            body,
            {
              withCredentials: true,
            }
          );
          console.log("setWallet.status is ", setWallet.status);
        }
      }
      console.log(check.status);
    } catch (e) {
      //('ma chud gayi')
      swal
        .fire({
          icon: "error",
          title: "Wallet Already Connected",
          text: "please connect to a new wallet which is not already in use",
        })
        .then(() => {
          localStorage.clear();
          Router.reload();
        });
    }
  };
  return (
    <Navbar
      className="navbar"
      collapseOnSelect
      expand="lg"
      bg="dark"
      variant="dark"
    >
      <Container className="navbar-container">
        <div>
          <Navbar.Brand href="#home" className="navbar-brand">
            MIRAI
          </Navbar.Brand>
        </div>
        <div>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Link href="/home" className="link">
                Home
              </Link>
              <Link href="/marketplace/buy">MarketPlace</Link>

              <Link href="/Leaderboard" className="link">
                Leaderboard
              </Link>
              <NavDropdown title="profile" id="navbarScrollingDropdown">
                <NavDropdown.Item
                  onClick={() => {
                    Router.push("/Profile");
                  }}
                >
                  Go to profile
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item
                  onClick={async () => {
                    console.log("cccc");
                    localStorage.clear();
                    sessionStorage.clear();
                    document.cookie = "jwt=undefined";
                    const res = await axios.post(
                      "https://mirai-backend-kappa.vercel.app/api/auth/signout",
                      {},
                      { withCredentials: true }
                    );
                    console.log(res);
                    Router.push("/Auth");
                  }}
                >
                  LogOut
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
            <ConnectButton />
          </Navbar.Collapse>
        </div>
      </Container>
    </Navbar>
  );
}
