import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';


export default function navabr() {
  return (
    <Navbar className= "navbar" collapseOnSelect expand="lg" bg="dark" variant="dark">
    <Container className='navbar-container'>
      <div>
      <Navbar.Brand href="#home" className='navbar-brand'>MIRAI <span>Plays</span></Navbar.Brand>
      </div>
      <div>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="me-auto">
        <Nav.Link href="#features">Home</Nav.Link>
          <Nav.Link href="#features">Features</Nav.Link>
          <Nav.Link href="#pricing">MarketPlace</Nav.Link>
          <Nav.Link href="#pricing">Leaderboard</Nav.Link>
        </Nav>
      </Navbar.Collapse>
      </div>
    </Container>
  </Navbar>
  )
}
