'use client';
import dynamic from 'next/dynamic';

const MapContainer = dynamic(() => import('react-leaflet').then((mod) => mod.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import('react-leaflet').then((mod) => mod.TileLayer), { ssr: false });
const Marker = dynamic(() => import('react-leaflet').then((mod) => mod.Marker), { ssr: false });
const Popup = dynamic(() => import('react-leaflet').then((mod) => mod.Popup), { ssr: false });
const ImageOverlay = dynamic(() => import('react-leaflet').then((mod) => mod.ImageOverlay), { ssr: false });

import { Montserrat } from 'next/font/google';
import 'leaflet/dist/leaflet.css';
import * as L from 'leaflet';
import { useEffect, useState } from 'react';
import { mapData } from '../constants/mapData';

const montserrat = Montserrat({ subsets: ['latin'] });

const Map = () => {
  const [activeMap, setActiveMap] = useState(mapData[0]);
  const [isMapReady, setIsMapReady] = useState(false);
  const bounds = [
    [0, 0],
    [900, 900],
  ];

  useEffect(() => {
    setIsMapReady(true);
  }, []);

  const handleMapChange = (newMap) => {
    if (isMapReady) {
      setActiveMap(newMap);
    }
  };

  if (!isMapReady) {
    return <div>Loading map...</div>;
  }

  return (
    <>
      <div className="max-w-[400px] absolute z-20 right-0 h-full flex flex-col bg-[#1f2022] text-neutral-50">
        <div className="flex flex-col space-y-6">
          <p className={`${montserrat.className} text-neutral-400 p-4`}>Interactive map for Dungeonborne was created by gamer for gamers</p>
          <div className="flex flex-col">
            <div className="flex flex-col space-y-3 p-4">
              <div className="flex flex-wrap">
                {mapData.map((map) => (
                  <button key={map.name} onClick={() => handleMapChange(map)} className={`text-center max-w-[150px] p-2 hover:bg-neutral-50 hover:bg-opacity-10 duration-150 ease-in-out ${activeMap === map ? 'bg-neutral-50 bg-opacity-10 border-b-2 border-b-[#f2c46d]' : 'border-b-2 border-b-transparent'}`}>
                    <span>{map.name}</span>
                  </button>
                ))}
              </div>
            </div>
            {/* резделитель */}
            <div className="h-px w-full bg-neutral-500"></div>
            <div className="flex flex-col space-y-3 p-4">
              <h2 className="text-[#d5a860]">Bosses</h2>
              <div className="flex flex-wrap">
                {/* {mapData.map((map) => (
                  <button onClick={() => setActiveMap(map)} className={`flex flex-col items-center p-2 hover:bg-neutral-50 hover:bg-opacity-10 duration-150 ease-in-out ${activeMap === map ? 'bg-neutral-50 bg-opacity-10 border-b-2 border-b-[#f2c46d]' : 'border-b-2 border-b-transparent'}`}>
                    Khazra
                  </button>
                ))} */}
              </div>
            </div>
          </div>
        </div>
      </div>
      <MapContainer center={[450, 450]} zoom={0} minZoom={0} zoomControl={false} scrollWheelZoom={true} crs={L.CRS.Simple} className="w-screen h-screen z-10 !bg-neutral-900">
        <ImageOverlay url={activeMap.url} bounds={bounds} />
        {activeMap.bosses ? activeMap.bosses.filter((boss) => boss.name === 'Cyclops').map((boss, i) => <Marker key={i} position={boss.position} icon={boss.icon}></Marker>) : <></>}
      </MapContainer>
    </>
  );
};

export default Map;
