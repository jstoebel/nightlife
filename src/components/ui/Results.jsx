import React, {Component} from 'react';
import { render } from 'react-dom';
import {Table, Col, Button} from 'react-bootstrap'
import RSVPButton from '../containers/RSVPButtonContainer'

export default class ResultsList extends Component {
  constructor(props) {
    super(props)
    this.render = this.render.bind(this);
  }

  _eachBar(bar, idx) {
    return (
      <tr key={idx}>
        <td>
          <h4>{bar.name}</h4>
          <div>
            {bar.location.display_address.join(', ')}
          </div>
          <RSVPButton bar={bar} />
        </td>        
      </tr>
    )
  }

  render() {
    const scrollStyle = {
      overflow: 'scroll',
      maxHeight: '80vh',
    }
    return (
        <Col sm={12} md={6}>
          <div style={scrollStyle}>
            <Table striped bordered condensed hover>
              <tbody>
                {this.props.bars.map(this._eachBar)}
              </tbody>
            </Table>
          </div>
        </Col>
        
    )
  }
}


