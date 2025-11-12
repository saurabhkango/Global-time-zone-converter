import React from 'react';
import { Timezone } from '../types';

interface TimezoneCardProps {
  timezone: Timezone;
  currentTime: Date;
  isHovered: boolean;
  onHover: (id: string | null) => void;
}

const TimezoneCard: React.FC<TimezoneCardProps> = ({
  timezone,
  currentTime,
  isHovered,
  onHover,
}) => {
  const timeString = currentTime.toLocaleString('en-US', {
    timeZone: timezone.iana,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  });

  const dateString = currentTime.toLocaleString('en-US', {
    timeZone: timezone.iana,
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  });

  const getOffsetHours = (timeZone: string, date: Date): number | null => {
    try {
      const parts = new Intl.DateTimeFormat('en-US', {
        timeZone,
        timeZoneName: 'longOffset',
      }).formatToParts(date);
      const offsetPart = parts.find((part) => part.type === 'timeZoneName');
      if (!offsetPart) return null;

      const offsetString = offsetPart.value;
      const match = offsetString.match(/GMT([+-])(\d{1,2}):?(\d{2})?/);
      if (!match) return null;

      const sign = match[1] === '+' ? 1 : -1;
      const hours = parseInt(match[2], 10);
      const minutes = match[3] ? parseInt(match[3], 10) : 0;

      return sign * (hours + minutes / 60);
    } catch (e) {
      console.error(`Failed to get offset for timezone ${timeZone}`, e);
      return null;
    }
  };

  const istOffset = 5.5; // IST is UTC+5:30
  const usOffset = getOffsetHours(timezone.iana, currentTime);
  
  let offsetDisplay = '';
  if (usOffset !== null) {
    const diff = istOffset - usOffset;
    const formattedDiff = Number.isInteger(diff) ? diff : diff.toFixed(1);
    offsetDisplay = `${formattedDiff} hrs behind IST`;
  }

  return (
    <div
      onMouseEnter={() => onHover(timezone.id)}
      onMouseLeave={() => onHover(null)}
      className={`
        bg-gray-800/50 border border-gray-700 rounded-lg p-4
        transition-all duration-300 ease-in-out transform cursor-pointer
        ${isHovered ? 'border-cyan-400 scale-105 shadow-2xl shadow-cyan-500/20' : ''}
      `}
    >
      <div className="flex justify-between items-baseline">
        <h3 className="font-bold text-lg text-white">{timezone.city}</h3>
        <p className="text-sm text-gray-400">{timezone.name}</p>
      </div>
      <div className="text-5xl font-mono text-cyan-300 my-3 text-center tracking-wider">
        {timeString}
      </div>
      <div className="flex justify-between items-center text-sm text-gray-400">
        <span>{dateString}</span>
        <span>{offsetDisplay}</span>
      </div>
    </div>
  );
};

export default TimezoneCard;
