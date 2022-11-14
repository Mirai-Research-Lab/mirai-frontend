import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { ConnectButton } from "@web3uikit/web3"
import { useMoralis } from 'react-moralis';
import { useEffect, useState } from 'react';
import Link  from 'next/link';

export default function navabr() {
  const [previousaccount,setpreviousaccount]=useState('');
  const { account } = useMoralis()
  useEffect(()=>{
    if(account && account!=previousaccount )
    { alert(account);
     setpreviousaccount[account];
    }
  }, [account]);
//   const [userAddress, setAddress] = useState("0");
// useEffect(() => {
//         if (isAuthenticated) {
//             setAddress(user!.get("ethAddress").toLowerCase())
//             console.log(`user address:  ${userAddress}`)
//         }
//     }, [isAuthenticated, chainId])
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
        <Nav.Link href="/home" className='link'>Home</Nav.Link>
          <Link href="/marketplace/buy" >MarketPlace</Link>
          <Link href="/leaderboard" className='link'>Leaderboard</Link>
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
