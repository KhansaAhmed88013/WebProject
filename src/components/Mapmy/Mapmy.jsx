import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const containerStyle = {
  width: '70%',
  height: '300px',
};

const defaultCenter = {
  lat: 33.6844,
  lng: 73.0479,
};

function GoogleMapComponent({ onLocationSelect }) {
  const [marker, setMarker] = useState(defaultCenter);
  const [mapCenter, setMapCenter] = useState(defaultCenter);

  // Detect location or fallback to default
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setMarker(userLocation);
          setMapCenter(userLocation);
          onLocationSelect(userLocation);
        },
        () => {
          // Fallback if user denies
          setMarker(defaultCenter);
          setMapCenter(defaultCenter);
          onLocationSelect(defaultCenter);
        }
      );
    } else {
      // No geolocation support
      setMarker(defaultCenter);
      setMapCenter(defaultCenter);
      onLocationSelect(defaultCenter);
    }
  }, []);

  const handleMarkerDragEnd = (event) => {
    const newPosition = {
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
    };
    setMarker(newPosition);
    onLocationSelect(newPosition);
  };

  const handleMapClick = (event) => {
    const newPosition = {
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
    };
    setMarker(newPosition);
    onLocationSelect(newPosition);
  };

  return (
    <LoadScript googleMapsApiKey="AIzaSyCLx7vxenau9U68bE2a9ss3gZ8wEWqDThk">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={mapCenter}
        zoom={12}
        onClick={handleMapClick}
      >
        {marker && (
          <Marker
            position={marker}
            draggable={true}
            onDragEnd={handleMarkerDragEnd}
          />
        )}
      </GoogleMap>
    </LoadScript>
  );
}

export default GoogleMapComponent;
