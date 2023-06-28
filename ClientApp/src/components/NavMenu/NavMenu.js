import React, { Component } from 'react';
import { Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import './NavMenu.css';

export class NavMenu extends Component {
  static displayName = NavMenu.name;

  constructor (props) {
    super(props);

    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.toggleLogin = this.toggleLogin.bind(this);
    this.state = {
      collapsed: true
    };
  }

  toggleNavbar () {
    this.setState({
      collapsed: !this.state.collapsed
    });
  }

  toggleLogin = (navItem) => {
    if(navItem === "login"){
      this.props.setShowLoginForm(true);
      console.log(true);
    }    
    if(navItem === "signup"){
      this.props.setShowLoginForm(false);
      console.log(false);
    }
  }

  render () {
    const { tempTestAuth } = this.props;
    return (
      <header>
        <Navbar className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3" light>
          <Container>
            <NavbarBrand tag={Link} to="/home">mvp_forums</NavbarBrand>
            <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
            {tempTestAuth ? 
              (
                <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={!this.state.collapsed} navbar>
                  <ul className="navbar-nav flex-grow">
                    <NavItem>
                      <NavLink tag={Link} className="text-dark" to="/home">Home</NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink tag={Link} className="text-dark" to="/fetch-data" disabled><strong>LogOut</strong></NavLink>
                    </NavItem>
                  </ul>
                </Collapse>
              ) : 
              (
                <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={!this.state.collapsed} navbar>
                <ul className="navbar-nav flex-grow">
                  <NavItem>
                    <NavLink 
                      className="text-dark"
                      onClick={() => this.toggleLogin('login')}
                    >
                      Login
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink 
                      className="text-dark" 
                      to="/fetch-data"
                      onClick={() => this.toggleLogin('signup')}
                    >Sign Up
                  </NavLink>
                  </NavItem>
                </ul>
                </Collapse>
              )
            }

          </Container>
        </Navbar>
      </header>
    );
  }
}
