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
<<<<<<< HEAD
import Image from "next/image";
import logo from '../public/logo.jpg'
export default function Navabr() {
  const swal = Swal;
  const { account } = useMoralis();
=======
export default function Navabr() {
  const swal = Swal;
  const { account, isWeb3Enabled } = useMoralis();
>>>>>>> a45894cc3638507b374a4cddebc0bd3b99b9aee9
  useEffect(() => {
    if (account) {
     const body = { address: account.toLowerCase() };
      checkWalletAddress(body);
    }
  });
  const checkWalletAddress = async (body) => {
    console.log("checking wallet address");
    try {
      const check = await axios.post(
        "https://mirai-backend-kappa.vercel.app/api/wallet/checkWalletAddress",
        body,
        {
          withCredentials: true,
          headers: {
            cookies: document.cookie,
          },
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
              headers: {
                cookies: document.cookie,
              },
            }
          );
          const setWallet = await axios.put(
            "https://mirai-backend-kappa.vercel.app/api/player/addWalletAddress",
            body,
            {
              withCredentials: true,
<<<<<<< HEAD
=======
              headers: {
                cookies: document.cookie,
              },
>>>>>>> a45894cc3638507b374a4cddebc0bd3b99b9aee9
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
            <Container className="navbarimg-container">
<Image className="logoimg" src={logo} height="80" width="80" /></Container>
      <Container className="navbar-container">
        {/* <div>
          <Navbar.Brand href="#home" className="navbar-brand">

            MIRAI
          </Navbar.Brand>
        </div> */}
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
              <Link href="/contact" className="link">
                Contact-us
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
<<<<<<< HEAD
                      { withCredentials: true }
=======
                      {
                        withCredentials: true,
                        headers: {
                          cookies: document.cookie,
                        },
                      }
>>>>>>> a45894cc3638507b374a4cddebc0bd3b99b9aee9
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
