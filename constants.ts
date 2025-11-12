import { Timezone } from './types';

export const US_TIMEZONES: Timezone[] = [
  {
    id: 'et',
    city: 'New York',
    name: 'Eastern Time',
    iana: 'America/New_York',
    mapCoords: { x: '85%', y: '42%' },
  },
  {
    id: 'ct',
    city: 'Chicago',
    name: 'Central Time',
    iana: 'America/Chicago',
    mapCoords: { x: '68%', y: '48%' },
  },
  {
    id: 'mt',
    city: 'Denver',
    name: 'Mountain Time',
    iana: 'America/Denver',
    mapCoords: { x: '45%', y: '53%' },
  },
  {
    id: 'pt',
    city: 'Los Angeles',
    name: 'Pacific Time',
    iana: 'America/Los_Angeles',
    mapCoords: { x: '20%', y: '65%' },
  },
];
