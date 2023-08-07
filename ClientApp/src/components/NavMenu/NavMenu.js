import React, { useState } from 'react';
import { Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import './NavMenu.scss';

export const NavMenu = ({ localToken, setShowLoginForm }) => {
  const [collapsed, setCollapsed] = useState(true);

  const toggleNavbar = () => {
    setCollapsed(!collapsed);
  };

  const toggleLogin = (navItem) => {
    if (navItem === 'login') {
      setShowLoginForm(true);
    }
    if (navItem === 'signup') {
      setShowLoginForm(false);
    }
  };

  function logoutUser(){
    localStorage.removeItem('mvp_forums_access_token');
    localStorage.removeItem('mvp_forums_active_id');
    window.location.reload();
  }

  const handleLogout = (event) => {
    event.preventDefault();
    logoutUser();
  }

  return (
    <header>
      <Navbar className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3" light>
        <Container>
          <NavbarBrand tag={Link} to="/home">mvp_forums</NavbarBrand>
          <NavbarToggler onClick={toggleNavbar} className="mr-2" />
          {localToken ? (
            <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={!collapsed} navbar>
              <ul className="navbar-nav flex-grow">
                <NavItem>
                  <NavLink tag={Link} className="text-dark" to="/home">Home</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={Link} className="text-dark" onClick={handleLogout} >LogOut</NavLink>
                </NavItem>
              </ul>
            </Collapse>
          ) : (
            <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={!collapsed} navbar>
              <ul className="navbar-nav flex-grow">
                <NavItem>
                  <NavLink
                    className="text-dark"
                    onClick={() => toggleLogin('login')}
                  >
                    Login
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    className="text-dark"
                    to="/fetch-data"
                    onClick={() => toggleLogin('signup')}
                  >
                    Sign Up
                  </NavLink>
                </NavItem>
              </ul>
            </Collapse>
          )}
        </Container>
      </Navbar>
    </header>
  );
};
