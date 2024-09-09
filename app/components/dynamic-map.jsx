import { ImageOverlay, MapContainer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import React, { useEffect, useRef } from 'react';

const createIcon = (iconUrl) =>
  new L.Icon({
    iconUrl,
    iconSize: [48, 48],
  });

const MarkerWithHoverPopup = ({ position, icon, name }) => {
  const markerRef = useRef(null);
  const popupRef = useRef(null);

  const handleMouseOver = () => {
    if (markerRef.current && popupRef.current) {
      markerRef.current.openPopup();
    }
  };

  const handleMouseOut = () => {
    if (markerRef.current && popupRef.current) {
      markerRef.current.closePopup();
    }
  };

  return (
    <Marker
      ref={markerRef}
      position={position}
      icon={icon}
      eventHandlers={{
        mouseover: handleMouseOver,
        mouseout: handleMouseOut,
      }}
    >
      <Popup ref={popupRef}>{name}</Popup>
    </Marker>
  );
};

const Map = ({ activeMap }) => {
  const bounds = [
    [0, 0],
    [900, 900],
  ];

  return (
    <MapContainer center={[450, 450]} zoom={0} minZoom={0} maxZoom={2} zoomControl={false} scrollWheelZoom={true} crs={L.CRS.Simple} className="w-screen h-screen z-10 !bg-neutral-900">
      <ImageOverlay url={activeMap.url} bounds={bounds} />
      {[...activeMap.elites, ...activeMap.bosses]
        .filter((enemy) => enemy.icon)
        ?.map((enemy, i) => {
          return <MarkerWithHoverPopup key={i} position={enemy.position} icon={createIcon(enemy.icon)} name={enemy.name} />;
        })}
    </MapContainer>
  );
};

export default Map;
