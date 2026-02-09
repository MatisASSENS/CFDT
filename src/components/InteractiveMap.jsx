import React from 'react';

function InteractiveMap() {
  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden h-[500px] relative group">
      {/* Static map image since we can't use real interactive maps without API keys easily in this demo context, 
          but styled to look interactive */}
      <div 
        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
        style={{ 
          backgroundImage: 'url(https://images.unsplash.com/photo-1524661135-423995f22d0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80)',
          filter: 'grayscale(20%) contrast(1.1)'
        }}
      ></div>
      
      {/* Overlays simulating map markers */}
      <div className="absolute inset-0 bg-blue-900/10"></div>
      
      {/* Marker: LFBA */}
      <div className="absolute top-1/2 left-1/4 transform -translate-x-1/2 -translate-y-1/2 group-hover:scale-110 transition-transform cursor-pointer">
        <div className="flex flex-col items-center">
          <div className="bg-white px-3 py-1 rounded shadow-md text-xs font-bold mb-2">LFBA (Agen)</div>
          <div className="w-4 h-4 bg-blue-600 rounded-full border-2 border-white shadow-lg animate-pulse"></div>
        </div>
      </div>

      {/* Marker: Crash Site */}
      <div className="absolute top-[45%] left-[35%] transform -translate-x-1/2 -translate-y-1/2 group-hover:scale-110 transition-transform cursor-pointer">
        <div className="flex flex-col items-center">
          <div className="bg-[#E1000F] text-white px-3 py-1 rounded shadow-md text-xs font-bold mb-2">
            Site Crash
            <span className="block text-[10px] font-normal opacity-80">44.16N / 0.60E</span>
          </div>
          <div className="w-6 h-6 bg-[#E1000F] rounded-full border-4 border-white shadow-lg flex items-center justify-center">
             <span className="text-white text-[10px]">!</span>
          </div>
        </div>
      </div>

      {/* Flight Path SVG Overlay */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none">
        <path 
          d="M 25% 50% Q 30% 45% 35% 45%" 
          fill="none" 
          stroke="#E1000F" 
          strokeWidth="3" 
          strokeDasharray="6 4"
          className="drop-shadow-md"
        />
      </svg>
      
      <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur px-4 py-2 rounded-lg shadow text-xs text-gray-600">
        Cartographie © OpenStreetMap contributors
      </div>
    </div>
  );
}

export default InteractiveMap;