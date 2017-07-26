import React, {Component} from 'react';
import {Grid, Row} from 'react-bootstrap'
import MapContainer from '../containers/MapContainer'
import ResultsContainer from '../containers/ResultsContainer'
import data from '../../sampleData.json'

class HomePage extends Component {
  render() {
    const bars = data.bars    
    return (
      <Grid>
        <Row>
          <MapContainer bars={bars}/>
          <ResultsContainer bars={bars}/>
        </Row>
      </Grid>
    );
  }
}

export default HomePage;
