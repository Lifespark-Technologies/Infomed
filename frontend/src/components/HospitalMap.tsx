import React from 'react';
import * as L from 'leaflet';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';


type State = {
  lat: number,
  lng: number,
  zoom: number,
}

class HospitalMap extends React.Component {

  state: State = {
    lat: 51.505,
    lng: -0.09,
    zoom: 13,
  }

  render() {
    const position: L.LatLng = L.latLng(this.state.lat, this.state.lng);
    return (
      <Map center={position} zoom={this.state.zoom}>
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </Map>
    );
  }
}


export default HospitalMap;