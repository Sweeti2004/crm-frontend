import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import logo from "../../assets/img/logo.png";
import { LinkContainer } from 'react-router-bootstrap';
import { useNavigate } from 'react-router-dom'
import { userLogout } from '../../api/userApi';
const Header = () => {
    const navigate = useNavigate();

  const logMeOut = () => {
    // Clear session/local storage or auth token here
    //localStorage.clear();
    sessionStorage.removeItem('accessJWT')
//localStorage.removeItem("crmSite")
    // Redirect to login or home page
    userLogout()
    navigate('/');
  };

  return (
    <Navbar collapseOnSelect bg="info" variant="dark" expand="md">
      <LinkContainer to="/">
        <Navbar.Brand>
          <img src={logo} alt="logo" width="50px" />
        </Navbar.Brand>
      </LinkContainer>

      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ms-auto">
          <LinkContainer to="/dashboard">
            <Nav.Link>Dashboard</Nav.Link>
          </LinkContainer>

          <LinkContainer to="/tickets">
            <Nav.Link>Tickets</Nav.Link>
          </LinkContainer>

          <Nav.Link onClick={logMeOut}>Logout</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
