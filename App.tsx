import React, { useState, useEffect } from 'react';
import { US_TIMEZONES } from './constants';
import ISTClock from './components/ISTClock';
import USAMap from './components/USAMap';
import TimezoneCard from './components/TimezoneCard';

// Helper to get the current date and time in the IST timezone
const getISTNow = () => new Date(new Date().toLocaleString('en-US', { timeZone: 'Asia/Kolkata' }));

const App: React.FC = () => {
  // State for live time, updates every second
  const [currentTime, setCurrentTime] = useState(new Date());
  
  // State for the converter feature
  const [isConverterMode, setIsConverterMode] = useState<boolean>(false);
  const [inputDate, setInputDate] = useState<string>(() => getISTNow().toISOString().split('T')[0]);
  const [inputTime, setInputTime] = useState<string>(() => getISTNow().toTimeString().slice(0, 5));
  const [converterTime, setConverterTime] = useState<Date>(() => getISTNow());
  
  const [hoveredTimezone, setHoveredTimezone] = useState<string | null>(null);

  // Effect for updating the live clock
  useEffect(() => {
    const timerId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timerId);
  }, []);

  // Effect for updating the converted time when inputs change
  useEffect(() => {
    try {
      // Construct an ISO 8601 string with the IST offset (+05:30)
      // This creates a Date object that correctly represents the specified time in IST
      const isoString = `${inputDate}T${inputTime}:00+05:30`;
      const date = new Date(isoString);
      if (!isNaN(date.getTime())) {
        setConverterTime(date);
      }
    } catch (e) {
      console.error("Error creating date from input", e);
    }
  }, [inputDate, inputTime]);

  const displayTime = isConverterMode ? converterTime : currentTime;

  return (
    <div className="bg-gray-900 min-h-screen text-white font-sans flex flex-col items-center justify-center p-4 overflow-hidden relative">
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-slate-900 to-black"></div>
      <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]"></div>
      
      <main className="z-10 w-full max-w-7xl mx-auto flex flex-col items-center gap-8 md:gap-12">
        <header className="text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-cyan-300 tracking-wider">
            Global Time Visualizer
          </h1>
          <p className="text-lg text-gray-400 mt-2">
            When it's now in India, it's...
          </p>
        </header>

        <div className="bg-gray-800/50 border border-gray-700 rounded-xl shadow-lg p-4 w-full max-w-lg flex flex-col items-center gap-4">
          <div className="flex rounded-lg bg-gray-900 p-1">
              <button 
                  onClick={() => setIsConverterMode(false)}
                  className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${!isConverterMode ? 'bg-cyan-500 text-white shadow-md' : 'text-gray-300 hover:bg-gray-700'}`}
                  aria-pressed={!isConverterMode}
              >
                  Live Time
              </button>
              <button 
                  onClick={() => setIsConverterMode(true)}
                  className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${isConverterMode ? 'bg-cyan-500 text-white shadow-md' : 'text-gray-300 hover:bg-gray-700'}`}
                  aria-pressed={isConverterMode}
              >
                  Time Converter
              </button>
          </div>

          {isConverterMode && (
              <div className="w-full flex flex-col sm:flex-row justify-center items-center gap-4 animate-fade-in pt-2">
                  <input
                      type="date"
                      value={inputDate}
                      onChange={(e) => setInputDate(e.target.value)}
                      className="bg-gray-900 border border-gray-600 rounded-md p-2 text-white focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
                      aria-label="Select Date"
                  />
                  <input
                      type="time"
                      value={inputTime}
                      onChange={(e) => setInputTime(e.target.value)}
                      className="bg-gray-900 border border-gray-600 rounded-md p-2 text-white focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
                      aria-label="Select Time"
                  />
              </div>
          )}
        </div>

        <ISTClock time={displayTime} isConverterMode={isConverterMode} />

        <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <USAMap 
            hoveredTimezone={hoveredTimezone}
            onHover={setHoveredTimezone}
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
            {US_TIMEZONES.map((tz) => (
              <TimezoneCard
                key={tz.id}
                timezone={tz}
                currentTime={displayTime}
                isHovered={hoveredTimezone === tz.id}
                onHover={setHoveredTimezone}
              />
            ))}
          </div>
        </div>
      </main>

      <footer className="z-10 text-center text-gray-500 text-sm mt-12 pb-4">
        <p>Built by a world-class senior frontend React engineer.</p>
        <p>&copy; {new Date().getFullYear()} Time Visualizer. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default App;