import React, { Component } from 'react';
import { Container } from 'reactstrap';
import { NavMenu } from './NavMenu/NavMenu';
import Footer from './Footer/Footer';

export class Layout extends Component {
  static displayName = Layout.name;

  render () {
    return (
      <div id="layout">
        <NavMenu 
          tempTestAuth={this.props.tempTestAuth} 
          setShowLoginForm={this.props.setShowLoginForm}
        />
        <Container>
          {this.props.children}
        </Container>
        <Footer />
      </div>
    );
  }
}
