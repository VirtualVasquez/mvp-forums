import React, { Component } from 'react';
import { Container } from 'reactstrap';
import { NavMenu } from './NavMenu/NavMenu';

export class Layout extends Component {
  static displayName = Layout.name;

  render () {
    return (
      <div>
        <NavMenu 
          tempTestAuth={this.props.tempTestAuth} 
          setShowLoginForm={this.props.setShowLoginForm}
        />
        <Container>
          {this.props.children}
        </Container>
      </div>
    );
  }
}
