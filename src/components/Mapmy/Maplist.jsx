import React from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '400px',
};

const center = {
  lat: 33.6844,   
  lng: 73.0479,   
};

function GoogleMapList() {
  return (
    <LoadScript googleMapsApiKey="AIzaSyCFhww0vdLH6xXMprz5wpylzCBI8km0A_U">
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={12}>
        
      </GoogleMap>
    </LoadScript>
  );
}

export default GoogleMapList;
