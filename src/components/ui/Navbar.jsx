import React, {Component} from 'react';
import { render } from 'react-dom';
import {Navbar, NavItem} from 'react-bootstrap'

export default class rsvpButton extends Component {
    constructor(props) {
        super(props)
        this.render = this.render.bind(this);
    }

    render() {
        return (
            <Navbar>
              <Navbar.Header>
                <Navbar.Brand>
                  <a href="#">React-Bootstrap</a>
                </Navbar.Brand>
              </Navbar.Header>
              <Nav>
                <NavItem eventKey={1} href="#">Link</NavItem>
                <NavItem eventKey={2} href="#">Link</NavItem>
              </Nav>
              <Nav pullRight>
                <NavItem eventKey={1} href="#">Link Right</NavItem>
              </Nav>
            </Navbar>
        )
    }
}