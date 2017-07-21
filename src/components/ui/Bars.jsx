import React, {Component} from 'react';
import {Grid, Row, Col, Well, Button, Image, Thumbnail} from 'react-bootstrap';

class Bars extends Component {

  constructor(props) {
    super(props);
  }

  _eachBar(bar, idx) {

    const circle = {
        // float:'left',
        // position: 'relative',
        width: '25%',
        maxWidth: '25%',
        paddingBottom : '25%', /* = width for a 1:1 aspect ratio */
        // overflow:'hidden',
        border: '1px solid black',
        borderRadius: '100%',
        backgroundImage: `url('${bar.image_url}')`,
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed',
        backgroundPosition: 'center', 

    }
    return (
      <Col xs="12" md="4">
        <Well>
          <div style={circle}>
          </div>
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



}
