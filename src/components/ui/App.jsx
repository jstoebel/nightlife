import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {Navbar, NavItem, Nav} from 'react-bootstrap'
import ErrorMessage from '../containers/ErrorMessageContainer'
import axios from 'axios'

class App extends Component {

  constructor(props) {
    super(props);
    this.render = this.render.bind(this);
    this.props.onFetchBars()
  }

  eachAlert(error, idx) {
    return(
      <ErrorMessage
        message={error}
        idx={idx}
        key={idx}
      />
      
    )
  }

  render() {
    return (
      <div>
        <Navbar>
          <Navbar.Header>
            <Navbar.Brand>
              <a href="/">Nightlife App</a>
            </Navbar.Brand>
          </Navbar.Header>
          <Nav pullRight>
            <NavItem eventKey={1} href={'/login'}>
              {"Login"}
            </NavItem>
            <NavItem href={'/register'}>
              {"Register"}
            </NavItem>
          </Nav>
        </Navbar>
        <div>
          {this.props.errors.map(this.eachAlert)}
        </div>
        <div>
          {this.props.children}
        </div>

      </div>
    );
  }
}

export default App;
