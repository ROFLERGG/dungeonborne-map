'use client';

import { ImageOverlay, MapContainer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L, { map } from 'leaflet';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Oldenburg } from 'next/font/google';

const oldenburg = Oldenburg({ subsets: ['latin'], weight: '400' });

const createIcon = (iconUrl, size = [x, y]) =>
  new L.Icon({
    iconUrl,
    iconSize: size,
  });

const MarkerWithHoverPopup = ({ position, icon, name }) => {
  // const markerRef = useRef(null);
  // const popupRef = useRef(null);

  // const handleMouseOver = () => {
  //   if (markerRef.current && popupRef.current) {
  //     markerRef.current.openPopup();
  //   }
  // };

  // const handleMouseOut = () => {
  //   if (markerRef.current && popupRef.current) {
  //     markerRef.current.closePopup();
  //   }
  // };

  return (
    <Marker
      // ref={markerRef}
      position={position}
      icon={icon}
      // eventHandlers={{
      //   mouseover: handleMouseOver,
      //   mouseout: handleMouseOut,
      // }}
    >
      <Popup closeButton={false}>
        <div className="flex flex-col space-y-3">
          <span className={oldenburg.className}>{name}</span>
          {/* <div className="w-5 h-5 bg-neutral-700"></div> */}
        </div>
      </Popup>
    </Marker>
  );
};

const Map = ({ activeMap, visibleLayers }) => {
  const bounds = [
    [0, 0],
    [900, 900],
  ];

  return (
    <MapContainer center={[450, 450]} zoom={0} minZoom={0} maxZoom={2} zoomControl={false} scrollWheelZoom={true} crs={L.CRS.Simple} className="w-screen h-screen z-10 !bg-neutral-800">
      <ImageOverlay url={activeMap.url} bounds={bounds} />
      {/* {[...(activeMap.bosses || []), ...(activeMap.elites || [])]
        .filter((enemy) => enemy.icon)
        ?.map((enemy, i) => {
          return <MarkerWithHoverPopup key={i} position={enemy.position} icon={createIcon(enemy.icon, [48, 48])} name={enemy.name} />;
        })}
      {[...(activeMap.portals || [])]
        .filter((portal) => portal.icon)
        ?.map((portal, i) => {
          return <MarkerWithHoverPopup key={i} position={portal.position} icon={createIcon(portal.icon, [28, 38])} name={portal.name} />;
        })} */}
      {visibleLayers.bosses && activeMap.bosses?.filter((boss) => boss.icon)?.map((boss, i) => <MarkerWithHoverPopup key={i} position={boss.position} icon={createIcon(boss.icon, [48, 48])} name={boss.name} />)}
      {visibleLayers.elites && activeMap.elites?.filter((elite) => elite.icon)?.map((elite, i) => <MarkerWithHoverPopup key={i} position={elite.position} icon={createIcon(elite.icon, [48, 48])} name={elite.name} />)}
      {visibleLayers.portals && activeMap.portals?.filter((portal) => portal.icon)?.map((portal, i) => <MarkerWithHoverPopup key={i} position={portal.position} icon={createIcon(portal.icon, [28, 38])} name={portal.name} />)}
    </MapContainer>
  );
};

export default Map;
