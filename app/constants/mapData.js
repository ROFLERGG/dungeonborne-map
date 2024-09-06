import { cyclopsIcon } from './icons';

let mapData = [
  {
    name: 'Castle Closeau V1',
    url: '/assets/Castle_Closeau_01.png',
    bosses: [
      {
        name: 'Cyclops',
        position: [355, 406],
        icon: cyclopsIcon,
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

export { mapData }