import React from 'react';
import * as L from 'leaflet';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';
import styles from './HospitalMap.module.css';


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
  componentDidMount() {
    /**
     * Issue: #12
     * Title: Detect user's location and use it as a search parameter
     */
    if('geolocation' in navigator){ /*Check if browser supports Geolocation API */
      navigator.geolocation.getCurrentPosition((position) => {
        console.log(position.coords)
        /**
         * Update state with latest Latitude and longitudes
         */
        this.setState({
          lat:position.coords.latitude,
          lng:position.coords.longitude
        })
      },(err)=>console.error(`Error:: ${err.code} - ${err.message}`/*Error if user denies permission to access location */));
    }
    else{
      console.error('Geolocation not supported by the browser.'); /*Error when browser doesn't support Geolocation API */
    }
  }
  render() {
    const position: L.LatLng = L.latLng(this.state.lat, this.state.lng);
    return (
      <Map center={position} zoom={this.state.zoom} className={styles.map}>
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