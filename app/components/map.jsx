'use client';

import { Montserrat } from 'next/font/google';
import 'leaflet/dist/leaflet.css';
import { Suspense, useState } from 'react';
import dynamic from 'next/dynamic';

const montserrat = Montserrat({ subsets: ['latin'] });

const DynamicMap = dynamic(() => import('./dynamic-map'), { ssr: false });

let mapData = [
  {
    name: 'Castle Closeau V1',
    url: '/assets/Castle_Closeau_01.png',
    bosses: [
      {
        name: 'Cyclops',
        position: [355, 406],
      },
    ],
    elites: [{ name: 'Khazra' }],
  },
  {
    name: 'Castle Closeau V2',
    url: '/assets/Castle_Closeau_02.png',
    bosses: [
      {
        name: 'Cyclops',
        position: [50, 50],
      },
    ],
    elites: [{ name: 'Khazra' }],
  },
  {
    name: 'Castle Closeau V3',
    url: '/assets/Castle_Closeau_03.png',
    bosses: [
      {
        name: 'Khazra',
        position: [150, 150],
      },
    ],
    elites: [{ name: 'Khazra' }],
  },
];

const Map = () => {
  const [activeMap, setActiveMap] = useState(mapData[0]);

  const handleMapChange = (newMap) => {
    setActiveMap(newMap);
  };

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
      <Suspense fallback={<div>Loading map...</div>}>
        <DynamicMap activeMap={activeMap} />
      </Suspense>
    </>
  );
};

export default Map;
