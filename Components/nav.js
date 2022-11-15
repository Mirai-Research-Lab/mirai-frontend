import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { ConnectButton } from "@web3uikit/web3"
import { useMoralis } from 'react-moralis';
import { useEffect, useState } from 'react';
import Link  from 'next/link';
import axios from 'axios';

export default function navabr() {
  const [previousaccount,setpreviousaccount]=useState('');
  const { account } = useMoralis()
  useEffect(()=>{
    if(account && account!=previousaccount )
    { 
      const body={address:account}
      checkWalletAddress(body);
    }
  }, [account]);
//   const [userAddress, setAddress] = useState("0");
// useEffect(() => {
//         if (isAuthenticated) {
//             setAddress(user!.get("ethAddress").toLowerCase())
//             console.log(`user address:  ${userAddress}`)
//         }
//     }, [isAuthenticated, chainId])
const checkWalletAddress=async(body)=>{
  const check =await axios.post("http://localhost:3001/api/wallet/checkWalletAddress",
  body,
  {
    withCredentials: true,
  })
  if(check.status==201)
  {

  }
  else
  {
    if(check.data.includes("other"))
    {
      swal.fire({
        icon: "error",
        title: "Wallet Already Connected",
        text: "please connect to a new wallet which is not already in use",
      });
    }
    else
    {
      
    }
  }
  console.log(check.status);
}
  return (
    <Navbar className= "navbar" collapseOnSelect expand="lg" bg="dark" variant="dark">
    <Container className='navbar-container'>
      <div>
      <Navbar.Brand href="#home" className='navbar-brand'>MIRAI</Navbar.Brand>
      </div>
      <div>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="me-auto">
        <Link href="/home" className='nav-link'>Home</Link>
          <Link href="/marketplace/buy" className='nav-link'>MarketPlace</Link>
          <Link href="/leaderboard" className='nav-link'>Leaderboard</Link>
          <NavDropdown title="profile" id="navbarScrollingDropdown" >
              <NavDropdown.Item href="/profile">
                Go to profile
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action5">
                 LogOut
              </NavDropdown.Item>
            </NavDropdown>
          <Nav.Link href="/leaderboard" className='link'>  
        </Nav.Link>
        </Nav>
    <ConnectButton /> 
      </Navbar.Collapse>   
      </div>
    </Container>
  </Navbar>
  )
}
