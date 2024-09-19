'use client';

import { Montserrat } from 'next/font/google';
import 'leaflet/dist/leaflet.css';
import { Suspense, useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

const montserrat = Montserrat({ subsets: ['latin'] });

const DynamicMap = dynamic(() => import('./dynamic-map'), { ssr: false });

let mapData = [
  {
    name: 'Castle Closeau',
    variant: [
      {
        name: 'V1',
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
            name: 'Headsman',
            position: [700, 350],
            icon: '/assets/Headsman.webp',
          },
          {
            name: 'Headsman',
            position: [570, 407],
            description: 'Spawns in the center of the room opposite the throne',
            icon: '/assets/Headsman.webp',
          },
          {
            name: 'Headsman',
            position: [440, 260],
            description: 'Spawns in room from yard side or in corridor',
            icon: '/assets/Headsman.webp',
          },
          {
            name: 'Headsman',
            position: [172, 230],
            icon: '/assets/Headsman.webp',
          },
          {
            name: 'Headsman',
            position: [172, 450],
            icon: '/assets/Headsman.webp',
          },
          {
            name: 'Werewolf',
            position: [815, 290],
            icon: '/assets/Werewolf.webp',
          },
          {
            name: 'Werewolf',
            position: [75, 420],
            icon: '/assets/Werewolf.webp',
          },
          {
            name: 'Werewolf',
            position: [283, 550],
            description: 'Spawns near the fountain',
            icon: '/assets/Werewolf.webp',
          },
          {
            name: 'Werewolf',
            position: [500, 515],
            description: 'Possible spawn one of bosses on ruins',
            icon: '/assets/Werewolf.webp',
          },
          {
            name: 'Werewolf',
            position: [767, 520],
            description: 'Possible boss spawn near a tree in the middle of the yard',
            icon: '/assets/Werewolf.webp',
          },
          {
            name: 'Werewolf',
            position: [510, 175],
            description: 'Possible to spawn right before players spawn.',
            icon: '/assets/Werewolf.webp',
          },
          {
            name: 'Werewolf',
            position: [172, 330],
            icon: '/assets/Werewolf.webp',
          },
          {
            name: 'Khazra',
            position: [480, 525],
            description: 'Possible spawn one of bosses on ruins',
            icon: '/assets/Khazra.webp',
          },
          {
            name: 'Reaper',
            position: [785, 290],
            icon: '/assets/Reaper.webp',
          },
        ],
        portals: [
          {
            name: 'Blue static portal',
            position: [668, 407],
            icon: '/assets/blue-portal.webp',
          },
          {
            name: 'Blue static portal',
            position: [355, 215],
            icon: '/assets/blue-portal.webp',
          },
          {
            name: 'Blue static portal',
            position: [235, 268],
            icon: '/assets/blue-portal.webp',
          },
          {
            name: 'Blue static portal',
            position: [495, 383],
            icon: '/assets/blue-portal.webp',
          },
          {
            name: 'Blue static portal',
            position: [128, 564],
            icon: '/assets/blue-portal.webp',
          },
        ],
      },
      {
        name: 'V2',
        url: '/assets/Castle_Closeau_02.png',
        bosses: [
          {
            name: 'Cyclops',
            position: [124, 443],
            icon: '/assets/Cyclops.webp',
          },
        ],
        elites: [
          {
            name: 'Khazra',
            position: [231, 665],
            icon: '/assets/Khazra.webp',
          },
        ],
        portals: [
          {
            name: 'Blue static portal',
            position: [111, 422],
            icon: '/assets/blue-portal.webp',
          },
        ],
      },
    ],
  },
  {
    name: 'Sinners End',
    variant: [
      {
        name: 'V1',
        url: '/assets/Sinners_End_F01_01_N.png',
        bosses: [
          {
            name: 'Cyclops',
            position: [406, 355],
            icon: '/assets/Cyclops.webp',
          },
        ],
        elites: [
          {
            name: 'Khazra',
            position: [768, 256],
            icon: '/assets/Khazra.webp',
          },
        ],
        portals: [
          {
            name: 'Blue static portal',
            position: [400, 500],
            icon: '/assets/blue-portal.webp',
          },
        ],
      },
    ],
  },
];

const initialVisibleLayers = {
  bosses: true,
  elites: true,
  portals: true,
  bluePortal: true,
  redPortal: true,
  cyclops: true,
  wendigo: true,
  khazra: true,
  reaper: true,
  werewolf: true,
};

const Map = () => {
  const [activeMap, setActiveMap] = useState(mapData[0]);
  const [activeLocation, setActiveLocation] = useState(mapData[0].variant[0]);
  const [visibleLayers, setVisibleLayers] = useState(initialVisibleLayers);

  const handleMapChange = (newMap) => {
    if (newMap !== activeMap) {
      setActiveMap(newMap);
      setActiveLocation(newMap.variant[0]);
    }
  };

  const handleLocationChange = (newLocation) => {
    setActiveLocation(newLocation);
  };

  const toggleLayerVisibility = (layer) => {
    setVisibleLayers((prev) => {
      const newState = { ...prev };
      if (layer === 'bosses') {
        const newBossState = !prev.bosses;
        newState.bosses = newBossState;
        newState.cyclops = newBossState;
        newState.wendigo = newBossState;
      } else if (layer === 'elites') {
        const newEliteState = !prev.elites;
        newState.elites = newEliteState;
        newState.khazra = newEliteState;
        newState.reaper = newEliteState;
        newState.werewolf = newEliteState;
      } else if (layer === 'portals') {
        const newPortalState = !prev.portals;
        newState.portals = newPortalState;
        newState.bluePortal = newPortalState;
        newState.redPortal = newPortalState;
      } else {
        newState[layer] = !prev[layer];
      }
      return newState;
    });
  };

  useEffect(() => {
    setVisibleLayers({ ...initialVisibleLayers });
  }, [activeLocation.url]);

  return (
    <>
      <div className="max-w-[400px] absolute z-20 right-0 h-full flex flex-col bg-neutral-900 text-neutral-50">
        <div className="flex flex-col space-y-6">
          <p className={`${montserrat.className} text-neutral-400 p-4`}>Interactive map for Dungeonborne was created by gamer for gamers</p>
          <div className="flex flex-col">
            <div className="flex flex-col space-y-3 p-4">
              <div className="flex flex-col space-y-3 text-neutral-50">
                <div className="flex items-center space-x-3">
                  {mapData.map((map, i) => (
                    <button key={i} onClick={() => handleMapChange(map)} className={`text-center max-w-[150px] p-3 hover:bg-neutral-50 hover:bg-opacity-10 duration-150 ease-in-out ${activeMap === map ? 'bg-neutral-50 bg-opacity-10 border-b-2 border-b-[#f2c46d]' : 'border-b-2 border-b-transparent'}`}>
                      {map.name}
                    </button>
                  ))}
                </div>
                <div className="flex space-x-3">
                  {activeMap === mapData[0] &&
                    mapData[0].variant.map((location) => (
                      <button key={location.name} onClick={() => handleLocationChange(location)} className={`text-center w-fit p-3 hover:bg-neutral-50 hover:bg-opacity-10 duration-150 ease-in-out ${activeLocation === location ? 'bg-neutral-50 bg-opacity-10 border-b-2 border-b-[#f2c46d]' : 'border-b-2 border-b-transparent'}`}>
                        <span>{location.name}</span>
                      </button>
                    ))}
                  {activeMap === mapData[1] &&
                    mapData[1].variant.map((location) => (
                      <button key={location.name} onClick={() => handleLocationChange(location)} className={`text-center w-fit p-3 hover:bg-neutral-50 hover:bg-opacity-10 duration-150 ease-in-out ${activeLocation === location ? 'bg-neutral-50 bg-opacity-10 border-b-2 border-b-[#f2c46d]' : 'border-b-2 border-b-transparent'}`}>
                        <span>{location.name}</span>
                      </button>
                    ))}
                </div>
              </div>
            </div>
            {/* резделитель */}
            <div className="h-px w-full bg-neutral-800"></div>
            {['bosses'].map((layer) => (
              <div key={layer} className="flex flex-col space-y-3 p-4">
                <div className="flex">
                  <input type="checkbox" hidden id={layer} checked={!visibleLayers[layer]} onChange={() => toggleLayerVisibility(layer)} className="peer" />
                  <label htmlFor={layer} className="capitalize cursor-pointer text-[#d5a860] select-none peer-checked:line-through peer-checked:text-neutral-500">
                    {layer}
                  </label>
                </div>
                {['cyclops', 'wendigo'].map((boss) => (
                  <div key={boss} className="flex items-center space-x-1">
                    <div>
                      <img src={`/assets/${boss}.webp`} width={32} height={32} alt="cyclops" />
                    </div>
                    <div>
                      <input type="checkbox" hidden id={boss} checked={!visibleLayers[boss]} onChange={() => toggleLayerVisibility(boss)} className="peer" />
                      <label htmlFor={boss} className="capitalize cursor-pointer text-neutral-50 select-none peer-checked:line-through peer-checked:text-neutral-500">
                        {boss}
                      </label>
                    </div>
                  </div>
                ))}
              </div>
            ))}
            <div className="h-px w-full bg-neutral-800"></div>
            {['elites'].map((layer) => (
              <div key={layer} className="flex space-x-3 p-4">
                <input type="checkbox" hidden id={layer} checked={!visibleLayers[layer]} onChange={() => toggleLayerVisibility(layer)} className="peer" />
                <label htmlFor={layer} className="capitalize cursor-pointer text-[#d5a860] select-none peer-checked:line-through peer-checked:text-neutral-500">
                  {layer}
                </label>
              </div>
            ))}
            {['portals'].map((layer) => (
              <div key={layer} className="flex space-x-3 p-4">
                <input type="checkbox" hidden id={layer} checked={!visibleLayers[layer]} onChange={() => toggleLayerVisibility(layer)} className="peer" />
                <label htmlFor={layer} className="capitalize cursor-pointer text-[#d5a860] select-none peer-checked:line-through peer-checked:text-neutral-500">
                  {layer}
                </label>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Suspense fallback={<div>Loading map...</div>}>
        <DynamicMap activeLocation={activeLocation} visibleLayers={visibleLayers} />
      </Suspense>
    </>
  );
};

export default Map;
