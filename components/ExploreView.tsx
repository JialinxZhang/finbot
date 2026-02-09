
import React from 'react';
import { MOCK_STOCKS } from '../constants';

const ExploreView: React.FC = () => {
  return (
    <div className="p-2 animate-fadeIn">
      <div className="grid grid-cols-2 gap-2">
        {/* Large Featured Card */}
        <div className="col-span-2 relative h-48 rounded-2xl overflow-hidden mb-2">
          <img src="https://picsum.photos/seed/market/800/400" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-4">
            <span className="bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded w-fit mb-2">LIVE ANALYSIS</span>
            <h2 className="text-white font-bold text-lg">Tech Sector: The AI Wave Continues</h2>
            <p className="text-gray-300 text-xs">Gemini AI predicts a 15% growth in semiconductor index...</p>
          </div>
        </div>

        {/* Small Grid Cards (Xiaohongshu style) */}
        {Array.from({ length: 6 }).map((_, i) => {
          const stock = MOCK_STOCKS[i % MOCK_STOCKS.length];
          return (
            <div key={i} className="bg-white rounded-xl overflow-hidden border border-gray-100 shadow-sm">
              <div className="h-32 bg-gray-100 relative">
                <img src={`https://picsum.photos/seed/${i + 10}/300/200`} className="w-full h-full object-cover" />
                <div className="absolute top-2 left-2 bg-white/90 backdrop-blur-md px-2 py-0.5 rounded text-[10px] font-bold">
                  {stock.symbol}
                </div>
              </div>
              <div className="p-2">
                <p className="text-xs font-semibold text-gray-800 line-clamp-2 leading-snug">
                  Why {stock.name} is the top pick for Q3 earnings season.
                </p>
                <div className="flex items-center justify-between mt-2">
                  <div className="flex items-center space-x-1">
                    <div className="w-4 h-4 rounded-full bg-blue-100" />
                    <span className="text-[10px] text-gray-400">FinAI_Bot</span>
                  </div>
                  <div className="flex items-center text-[10px] text-gray-400">
                    <svg className="w-3 h-3 mr-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
                    {Math.floor(Math.random() * 500)}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ExploreView;
