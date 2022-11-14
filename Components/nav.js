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
import Web3 from "web3";
export default function navabr() {
  const swal=Swal;
  const { account } = useMoralis();
  useEffect(() => {
    if (account) {
      const body = { address: account };
      checkWalletAddress(body);
    }
  }, [account]);
  const checkWalletAddress = async (body) => {
    console.log("checking wallet address");
    try {
      const check = await axios.post(
        "http://localhost:3001/api/wallet/checkWalletAddress",
        body,
        {
          withCredentials: true,
        }
      );
      if (check.status == 201) {
        console.log("adding new wallet to email address");
          const setEmail = await axios.put(
            "http://localhost:3001/api/player/updateAddress",
            body,
            {
              withCredentials: true,
            }
          );
        const setWallet = await axios.put(
          "http://localhost:3001/api/player/addWalletAddress",
          body,
          {
            withCredentials: true,
          }
        );
        console.log("setWallet.status is ", setWallet.status);
      }
      console.log(check.status);
    } catch (e) {
      swal.fire({
        icon: "error",
        title: "Wallet Already Connected",
        text: "please connect to a new wallet which is not already in use",
      });
      console.log(e);
      window.web3 = await new window.Moralis.Web3.enable({ provider: "walletconnect" });
      await window.web3.eth.currentProvider.disconnect();
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
              <Nav.Link href="/home" className="link">
                Home
              </Nav.Link>
              <Link href="/marketplace/buy">MarketPlace</Link>
              <Link href="/leaderboard" className="link">
                Leaderboard
              </Link>
              <NavDropdown title="profile" id="navbarScrollingDropdown">
                <NavDropdown.Item href="/profile">
                  Go to profile
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action5">LogOut</NavDropdown.Item>
              </NavDropdown>
              <Nav.Link href="/leaderboard" className="link"></Nav.Link>
            </Nav>
            <ConnectButton />
          </Navbar.Collapse>
        </div>
      </Container>
    </Navbar>
  );
}
