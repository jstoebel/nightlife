import React, {Component} from 'react';
import { render } from 'react-dom';
import { Map, Marker, Popup, TileLayer, Icon } from 'react-leaflet';
import 'leaflet/dist/leaflet.css'

import L from 'leaflet';

// import icon from 'leaflet/dist/images/marker-icon.png';
// import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: 'images/marker-icon.png',
    shadowUrl: 'images/marker-shadow.png.png'
});

L.Marker.prototype.options.icon = DefaultIcon;



export default class ResultsMap extends Component {

  constructor(props) {
    super(props);
  }

  // _eachBar(bar, idx) {
  //   return (
  //     <Col xs="12" md="4">
  //       <Well style={STYLES.well} >
  //         <img style={STYLES.image} src={bar.image_url} alt=""/>
  //         <h5>{bar.name}</h5>
  //         <Button bsStyle="primary" bsSize="large" block>
  //           RSVP
  //         </Button>
  //       </Well>
  //     </Col>
  //   )
  // } 

  render() {
      const position = [51.505, -0.09];
      const containerStyle = {
        height: '400px',
        width: '80%',
        margin: '0 auto',
      }
      return (
        <div style={containerStyle}>
          <Map center={position} zoom={13}>
            <TileLayer
              url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            />
            <Marker position={position}>
              <Popup>
                <span>A pretty CSS3 popup.<br/>Easily customizable.</span>
              </Popup>
            </Marker>
          </Map>          
        </div>
      )
  }
}

const STYLES = {

}
