import React, { Component } from 'react';
import { Container } from 'reactstrap';
import { NavMenu } from './NavMenu/NavMenu';
import Footer from './Footer/Footer';

export class Layout extends Component {

  render () {
    return (
      <div id="layout">
        <NavMenu 
          localToken={this.props.localToken} 
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
