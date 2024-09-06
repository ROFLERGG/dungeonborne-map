import { MapContainer, ImageOverlay, Marker } from 'react-leaflet';
import L from 'leaflet';

const MapComponent = ({ activeMap }) => {
  if (typeof window === 'undefined') {
    return null;
  }
};
