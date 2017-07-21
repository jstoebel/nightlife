import React, {Component} from 'react';
import { render } from 'react-dom';
import { Map, Marker, Popup, TileLayer, Icon } from 'react-leaflet';
import {Button} from 'react-bootstrap'
import GL from 'geolib'

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
    this._getCorners = this._getCorners.bind(this);
    this.render = this.render.bind(this);
    this.state = {
      corners: this._getCorners(this.props.bars)
    }
  }

  componentWillReceiveProps(nextProps) {

    // only recompute if new props were recieved
    if (this.props !== nextProps) {
      this.setState({
        corners: this._getCorners(this.props.bars)
      })
    }
  } 

  _getCorners(bars) {
    // return bounding corners for map to render
    // points: array of points to compute
    const points = bars.map((bar, idx) => {
      return bar.coordinates
    })

    const bounds = GL.getBounds(points)
    return ([
            [bounds.maxLat, bounds.maxLng],
            [bounds.minLat, bounds.minLng,]
          ])

  }

  _eachBar(bar, idx) {
    const coords = [
      bar.coordinates.latitude,
      bar.coordinates.longitude
    ]
    return (
      <Marker position={coords} key={idx} >
        <Popup>
          <div>
            <h3>{bar.name}</h3>
            <Button bsStyle="primary" bsSize="large" block>{"I'll be there!"}</Button>
            
          </div>
        </Popup>
      </Marker>
    )
  } 

  render() {
      const containerStyle = {
        height: '80vh',
        width: '100vw',
        margin: '0 auto',
      }
      return (
        <div style={containerStyle}>
          <Map bounds={this.state.corners}>
            <TileLayer
              url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            />
            {this.props.bars.map(this._eachBar)}
          </Map>          
        </div>
      )
  }
}

const STYLES = {

}
