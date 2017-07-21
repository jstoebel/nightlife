import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <div>
        <p>Header here</p>
        <ul>
          <li>
            <Link to={'register'}>Register </Link>
          </li>
          <li>
            <Link to={'login'}>Login </Link>
          </li>
        </ul>
        <div>
          {this.props.children}
        </div>

        <p>Footer here</p>
      </div>
    );
  }
}

export default App;
