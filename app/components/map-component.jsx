import { MapContainer, ImageOverlay, Marker } from 'react-leaflet';
import L from 'leaflet';

const MapComponent = ({ activeMap }) => {
  if (typeof window === 'undefined') {
    return null;
  }

  const bounds = [
    [0, 0],
    [900, 900],
  ];

  return (
    <MapContainer center={[450, 450]} zoom={0} minZoom={0} zoomControl={false} scrollWheelZoom={true} crs={L.CRS.Simple} className="w-screen h-screen z-10 !bg-neutral-900">
      <ImageOverlay url={activeMap.url} bounds={bounds} />
      {activeMap.bosses && activeMap.bosses.map((boss, i) => <Marker key={i} position={boss.position} icon={boss.icon} />)}
    </MapContainer>
  );
};

export default MapComponent;
