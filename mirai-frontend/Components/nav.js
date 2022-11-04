import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';


export default function navabr() {
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
        <Nav.Link href="#home" className='link'>Home</Nav.Link>
          <Nav.Link href="#marketplace" className='link'>MarketPlace</Nav.Link>
          <Nav.Link href="#leaderboard" className='link'>Leaderboard</Nav.Link>
          <NavDropdown title="Profile" id="navbarScrollingDropdown">
              <NavDropdown.Item href="#action4">
                Go to profile
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action5">
                 LogOut
              </NavDropdown.Item>
            </NavDropdown>
        </Nav>
      </Navbar.Collapse>
      </div>
    </Container>
  </Navbar>
  )
}
