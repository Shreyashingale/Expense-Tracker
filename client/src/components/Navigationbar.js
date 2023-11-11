import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';


const Navigationbar = () => {
  return (
    <Navbar style={{ backgroundColor: '#303142' }} variant="dark" expand="lg">
      <Container>
        <Navbar.Brand style={{ color: 'white', fontWeight: 'bold', fontFamily: 'Georgia' }}>
          Expense Tracker
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse className="justify-content-end">
          <Nav>
            <Nav.Link  as = {Link} to= {"/login"} style={{ color: 'white'  }} >
              Login
            </Nav.Link>
            <Nav.Link as = {Link} to= {"/register"} style={{ color: 'white'  }}>
              Register
            </Nav.Link>
            <Nav.Link as = {Link} to= {"/dashboard"} style={{ color: 'white'  }}  >
              Dashboard
            </Nav.Link>
            <Nav.Link as = {Link} to= {"/account"} style={{ color: 'white' }} >
              Account
            </Nav.Link>
            <Nav.Link as = {Link} to= {"/transactions"} style={{ color: 'white' }} >
              Transactions
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Navigationbar;