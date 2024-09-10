'use client';

import { ImageOverlay, MapContainer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import React, { useEffect, useRef, useState } from 'react';

const createIcon = (iconUrl, size = [x, y]) =>
  new L.Icon({
    iconUrl,
    iconSize: size,
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
      <Popup ref={popupRef} closeButton={false}>
        {name}
      </Popup>
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
      {(activeMap.bosses || activeMap.elites) &&
        [...(activeMap.bosses || []), ...(activeMap.elites || [])]
          .filter((enemy) => enemy.icon)
          ?.map((enemy, i) => {
            return <MarkerWithHoverPopup key={i} position={enemy.position} icon={createIcon(enemy.icon, [48])} name={enemy.name} />;
          })}
      {activeMap.portals &&
        [...activeMap.portals]
          .filter((portal) => portal.icon)
          ?.map((portal, i) => {
            return <MarkerWithHoverPopup key={i} position={portal.position} icon={createIcon(portal.icon, [28])} name={portal.name} />;
          })}
    </MapContainer>
  );
};

export default Map;
