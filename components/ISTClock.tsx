import React from 'react';

interface ISTClockProps {
  time: Date;
  isConverterMode: boolean;
}

const ISTClock: React.FC<ISTClockProps> = ({ time, isConverterMode }) => {
  const timeString = time.toLocaleString('en-US', {
    timeZone: 'Asia/Kolkata',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  });

  const dateString = time.toLocaleString('en-US', {
    timeZone: 'Asia/Kolkata',
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="bg-white/5 border border-cyan-300/20 rounded-xl shadow-2xl shadow-cyan-500/10 p-6 w-full max-w-md text-center">
      <p className="text-gray-400 text-lg">
        {isConverterMode ? 'Selected Time in India (IST)' : 'Current Time in India (IST)'}
      </p>
      <div className="text-6xl md:text-7xl font-mono font-bold text-cyan-300 my-2 tracking-widest">
        {timeString}
      </div>
      <p className="text-gray-400 text-md">{dateString}</p>
    </div>
  );
};

export default ISTClock;