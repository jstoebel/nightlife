import React, {Component} from 'react';
import {Grid, Row} from 'react-bootstrap'
import MapContainer from '../containers/MapContainer'
import ResultsContainer from '../containers/ResultsContainer'
import SearchBarContainer from '../containers/SearchBarContainer'

class HomePage extends Component {
  render() {
    // const bars = data.bars
    return (
      <div>
        <SearchBarContainer/>
        <Grid>
          <Row>
            <MapContainer/>
            <ResultsContainer/>
          </Row>
        </Grid>
        
        <div>
        Created by Jacob Stoebel | <a href="https://github.com/jstoebel/nightlife" target="_blank">github.com/jstoebel/nightlife</a>

        </div>
      </div>
    );
  }
}

export default HomePage;
