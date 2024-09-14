'use client';

import { Montserrat } from 'next/font/google';
import 'leaflet/dist/leaflet.css';
import { Suspense, useEffect, useState } from 'react';
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
        icon: '/assets/Cyclops.webp',
      },
    ],
    elites: [
      {
        name: 'Khazra',
        position: [256, 768],
        icon: '/assets/Khazra.webp',
      },
    ],
    portals: [
      {
        name: 'Blue static portal',
        position: [500, 400],
        icon: '/assets/blue-portal.webp',
      },
    ],
  },
  // {
  //   name: 'Castle Closeau V2',
  //   url: '/assets/Castle_Closeau_02.png',
  //   bosses: [
  //     {
  //       name: 'Cyclops',
  //       position: [355, 406],
  //       icon: '/assets/Cyclops.webp',
  //     },
  //   ],
  //   elites: [
  //     {
  //       name: 'Khazra',
  //       position: [245, 300],
  //       icon: '/assets/Khazra.webp',
  //     },
  //   ],
  // },
  // {
  //   name: 'Castle Closeau V3',
  //   url: '/assets/Castle_Closeau_03.png',
  //   bosses: [{}],
  //   elites: [
  //     {
  //       name: 'Khazra',
  //       position: [550, 800],
  //       icon: '/assets/Khazra.webp',
  //     },
  //   ],
  // },
];

const initialVisibleLayers = {
  bosses: true,
  elites: true,
  portals: true,
};

const maps = ['Castle Closeau'];

const Map = () => {
  const [activeMap, setActiveMap] = useState(mapData[0]);
  const [visibleLayers, setVisibleLayers] = useState(initialVisibleLayers);

  const handleMapChange = (newMap) => {
    setActiveMap(newMap);
  };

  const toggleLayerVisibility = (layer) => {
    // setVisibleLayers((prev) => ({
    //   ...prev,
    //   [layer]: !prev[layer],
    // }));

    setVisibleLayers((prev) => {
      prev[layer] = !prev[layer];
      console.log(prev);
      return { ...prev };
    });
  };

  useEffect(() => {
    setVisibleLayers({ ...initialVisibleLayers });
  }, [activeMap.url]);

  return (
    <>
      <div className="max-w-[400px] absolute z-20 right-0 h-full flex flex-col bg-neutral-900 text-neutral-50">
        <div className="flex flex-col space-y-6">
          <p className={`${montserrat.className} text-neutral-400 p-4`}>Interactive map for Dungeonborne was created by gamer for gamers</p>
          <div className="flex flex-col">
            <div className="flex flex-col space-y-3 p-4">
              <div className="flex flex-wrap text-neutral-50">
                {mapData.map((map) => (
                  <button key={map.name} onClick={() => handleMapChange(map)} className={`text-center max-w-[150px] p-2 hover:bg-neutral-50 hover:bg-opacity-10 duration-150 ease-in-out ${activeMap === map ? 'bg-neutral-50 bg-opacity-10 border-b-2 border-b-[#f2c46d]' : 'border-b-2 border-b-transparent'}`}>
                    <span>{map.name}</span>
                  </button>
                ))}
              </div>
            </div>
            {/* резделитель */}
            <div className="h-px w-full bg-neutral-800"></div>
            <div className="flex flex-col space-y-3 p-4">
              <h2 className="text-[#d5a860]">Bosses</h2>
              <div className="flex flex-wrap">
                {['bosses'].map((layer) => (
                  <div key={layer} className="flex space-x-3">
                    <input type="checkbox" id={layer} checked={visibleLayers[layer]} onChange={() => toggleLayerVisibility(layer)} />
                    <label htmlFor={layer} className="capitalize">
                      {layer}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Suspense fallback={<div>Loading map...</div>}>
        <DynamicMap activeMap={activeMap} visibleLayers={visibleLayers} />
      </Suspense>
    </>
  );
};

export default Map;
