import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import logo from "../../assets/img/logo.png";
import { LinkContainer } from 'react-router-bootstrap';
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import { userLogout } from '../../api/userApi';

const Header = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user } = useSelector(state => state.user);

    const logMeOut = () => {
      sessionStorage.removeItem('accessJWT');
      userLogout();
      navigate('/');
    };

    const renderNavLinks = () => {
      if (!user?.role) return null;

      const commonLinks = (
        <>
          <LinkContainer to="/dashboard">
            <Nav.Link>Dashboard</Nav.Link>
          </LinkContainer>
        </>
      );

      switch (user.role) {
        case 'client':
          return (
            <>
              {commonLinks}
              <LinkContainer to="/tickets">
                <Nav.Link>My Tickets</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/add-ticket">
                <Nav.Link>New Ticket</Nav.Link>
              </LinkContainer>
            </>
          );

        case 'support':
          return (
            <>
              {commonLinks}
              <LinkContainer to="/tickets">
                <Nav.Link>All Tickets</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/assigned-tickets">
                <Nav.Link>Assigned to Me</Nav.Link>
              </LinkContainer>
            </>
          );

        case 'admin':
          return (
            <>
              {commonLinks}
              <LinkContainer to="/tickets">
                <Nav.Link>All Tickets</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/users">
                <Nav.Link>Users</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/staff">
                <Nav.Link>Support Staff</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/reports">
                <Nav.Link>Reports</Nav.Link>
              </LinkContainer>
            </>
          );

        default:
          return commonLinks;
      }
    };

    return (
      <Navbar collapseOnSelect expand="lg" sticky="top" className="navbar-dark">
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>
              <img src={logo} alt="ResolveHub" width="40" height="40" />
              <span style={{ marginLeft: '0.5rem', fontWeight: 'bold' }}>ResolveHub</span>
            </Navbar.Brand>
          </LinkContainer>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              {renderNavLinks()}
              
              {user?._id && (
                <>
                  <Nav.Link className="ms-3" style={{ borderLeft: '1px solid rgba(255,255,255,0.2)', paddingLeft: '1rem' }}>
                    <small>{user.name} ({user.role})</small>
                  </Nav.Link>
                  <Nav.Link onClick={logMeOut} className="text-danger">
                    Logout
                  </Nav.Link>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
};

export default Header;
