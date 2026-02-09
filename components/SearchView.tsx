
import React, { useState } from 'react';
import { MOCK_STOCKS } from '../constants';

const SearchView: React.FC = () => {
  const [query, setQuery] = useState('');
  const trends = ['#NVIDIA', '#US_DEBT', '#BITCOIN', '#AI_CHIPS', '#TESLA_EARNINGS'];
  
  const filteredStocks = MOCK_STOCKS.filter(s => 
    s.symbol.toLowerCase().includes(query.toLowerCase()) || 
    s.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="p-4 animate-fadeIn">
      <div className="relative mb-6">
        <span className="absolute left-3 top-3 text-gray-400">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
        </span>
        <input 
          type="text" 
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search stocks, symbols or indices..."
          className="w-full bg-gray-100 border-none rounded-2xl py-3 pl-10 pr-4 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
        />
      </div>

      {!query && (
        <div className="space-y-6">
          <section>
            <h3 className="text-sm font-bold text-gray-900 mb-3">Trending Topics</h3>
            <div className="flex flex-wrap gap-2">
              {trends.map(t => (
                <span key={t} className="px-3 py-1 bg-white border border-gray-100 rounded-full text-xs font-medium text-blue-600 shadow-sm">
                  {t}
                </span>
              ))}
            </div>
          </section>

          <section>
            <h3 className="text-sm font-bold text-gray-900 mb-3">Suggested for You</h3>
            <div className="grid grid-cols-2 gap-3">
              {MOCK_STOCKS.map(s => (
                <div key={s.id} className="bg-white p-3 rounded-xl border border-gray-100 flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center font-bold text-blue-600 text-xs">
                    {s.symbol[0]}
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-900">{s.symbol}</p>
                    <p className="text-[10px] text-gray-400 truncate w-24">{s.name}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      )}

      {query && (
        <div className="space-y-2">
          {filteredStocks.map(s => (
            <div key={s.id} className="bg-white p-4 rounded-xl border border-gray-100 flex justify-between items-center">
              <div>
                <p className="font-bold text-gray-900">{s.symbol}</p>
                <p className="text-xs text-gray-500">{s.name}</p>
              </div>
              <div className="text-right">
                <p className="font-bold text-gray-900">${s.price}</p>
                <p className={`text-xs ${s.change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                  {s.changePercent}%
                </p>
              </div>
            </div>
          ))}
          {filteredStocks.length === 0 && (
            <div className="text-center py-10 text-gray-400">
              No results found for "{query}"
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchView;
