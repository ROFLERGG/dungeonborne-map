'use client';

import { ImageOverlay, MapContainer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import React from 'react';
import { Oldenburg } from 'next/font/google';

const oldenburg = Oldenburg({ subsets: ['latin'], weight: '400' });

const createIcon = (iconUrl, size = [x, y]) =>
  new L.Icon({
    iconUrl,
    iconSize: size,
  });

const MarkerWithHoverPopup = ({ position, icon, name, description }) => {
  return (
    <Marker position={position} icon={icon}>
      <Popup closeButton={false}>
        <div className={`flex flex-col !space-y-2 ${oldenburg.className}`}>
          <p className="!my-0 !text-neutral-50">{name}</p>
          {description && <p className="!my-0 !text-neutral-300 !text-xs">{description}</p>}
        </div>
      </Popup>
    </Marker>
  );
};

const Map = ({ activeLocation, visibleLayers }) => {
  const bounds = [
    [0, 0],
    [900, 900],
  ];

  return (
    <MapContainer center={[450, 450]} zoom={0} minZoom={0} maxZoom={2} zoomControl={false} scrollWheelZoom={true} crs={L.CRS.Simple} className="w-screen h-screen z-10 !bg-neutral-800">
      <ImageOverlay url={activeLocation.url} bounds={bounds} />
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
      {visibleLayers.bosses && activeLocation.bosses?.filter((boss) => boss.icon)?.map((boss, i) => visibleLayers[boss.name.toLowerCase()] && <MarkerWithHoverPopup key={i} position={boss.position} icon={createIcon(boss.icon, [48, 48])} name={boss.name} description={boss.description} />)}
      {visibleLayers.elites && activeLocation.elites?.filter((elite) => elite.icon)?.map((elite, i) => visibleLayers[elite.name.toLowerCase()] && <MarkerWithHoverPopup key={i} position={elite.position} icon={createIcon(elite.icon, [48, 48])} name={elite.name} description={elite.description} />)}
      {visibleLayers.portals && activeLocation.portals?.filter((portal) => portal.icon)?.map((portal, i) => <MarkerWithHoverPopup key={i} position={portal.position} icon={createIcon(portal.icon, [28, 38])} name={portal.name} description={portal.description} />)}
    </MapContainer>
  );
};

export default Map;
