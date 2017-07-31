import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {Navbar, NavItem, Nav} from 'react-bootstrap'
import ErrorMessage from '../containers/ErrorMessageContainer'
import axios from 'axios'
import FontAwesome from 'react-fontawesome'

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

  renderLoginLogout() {
    if (this.props.auth.authenticated) {
      return (
        <NavItem eventKey={1} href={'/logout'}>
          {"Logout"}
        </NavItem>
      )

    } else {
      return (
        <NavItem eventKey={1} href={'/login'}>
          {"Login"}
        </NavItem>
      )
    }
  }

  render() {
    
    if (this.props.fetching) {
      const style = {fontSize: "150pt"}
      return (
        <div className='text-center'>
          <FontAwesome
            name='refresh'  
            spin
            style={style}
          />
        </div>

      );
    } else {

      return (
        <div>
          <Navbar>
            <Navbar.Header>
              <Navbar.Brand>
                <a href="/">Nightlife App</a>
              </Navbar.Brand>
            </Navbar.Header>
            <Nav pullRight>
              {this.renderLoginLogout()}
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
}

export default App;
