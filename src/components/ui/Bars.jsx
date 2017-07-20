import React, {Component} from 'react';
import {Grid, Row, Col, Well, Button, Image, Thumbnail} from 'react-bootstrap';

class Bars extends Component {

  constructor(props) {
    super(props);
  }

  _eachBar(bar, idx) {
    return (
      <Col xs="12" md="4">
        <Well style={STYLES.well} >
          <img style={STYLES.image} src={bar.image_url} alt=""/>
          <h5>{bar.name}</h5>
          <Button bsStyle="primary" bsSize="large" block>
            RSVP
          </Button>
        </Well>
      </Col>
    )
  } 

  render() {
    return (
      <Grid>
        <Row className="display-flex" style={STYLES.row}>
          {this.props.bars.map(this._eachBar)}    
        </Row>
      </Grid>

    );
  }
}

export default Bars;

const STYLES = {
  // row: {
  //   display: 'flex',
  //   flexWrap: 'wrap',
  // },
  image: {
    maxHeight: '190px',
    minHeight: '190px',
    width: '100%'
  }
}
