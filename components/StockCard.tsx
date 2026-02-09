
import React, { useState, useEffect } from 'react';
import { Post } from '../types';
import KLineChart from './KLineChart';
import { analyzeStockKLine } from '../services/geminiService';

interface StockCardProps {
  post: Post;
  onEdit: (stockName: string, elementId: string) => void;
}

const StockCard: React.FC<StockCardProps> = ({ post, onEdit }) => {
  const [analysis, setAnalysis] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [isLiked, setIsLiked] = useState(post.isLiked);
  const [likesCount, setLikesCount] = useState(post.likes);

  const chartId = `chart-${post.id}`;

  const handleAnalyze = async () => {
    setLoading(true);
    const result = await analyzeStockKLine(post.stock);
    setAnalysis(result);
    setLoading(false);
  };

  const toggleLike = () => {
    setIsLiked(!isLiked);
    setLikesCount(prev => isLiked ? prev - 1 : prev + 1);
  };

  return (
    <div className="bg-white mb-4 border-b md:border md:rounded-xl overflow-hidden max-w-lg mx-auto shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between p-3">
        <div className="flex items-center space-x-3">
          <img src={post.authorAvatar} alt={post.author} className="w-8 h-8 rounded-full border border-gray-200" />
          <div>
            <p className="text-sm font-semibold text-gray-900">{post.author}</p>
            <p className="text-xs text-gray-500">Sponsored Insights</p>
          </div>
        </div>
        <button className="text-gray-400">
           <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" /></svg>
        </button>
      </div>

      {/* Visual / Chart */}
      <div id={chartId} className="relative px-3 py-1">
        <div className="flex justify-between items-end mb-2">
          <div>
            <h3 className="text-lg font-bold text-gray-900">{post.stock.symbol}</h3>
            <p className="text-xs text-gray-500">{post.stock.name}</p>
          </div>
          <div className="text-right">
            <p className="text-lg font-bold text-gray-900">${post.stock.price.toFixed(2)}</p>
            <p className={`text-xs font-medium ${post.stock.change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
              {post.stock.change >= 0 ? '+' : ''}{post.stock.change.toFixed(2)} ({post.stock.changePercent.toFixed(2)}%)
            </p>
          </div>
        </div>
        <KLineChart data={post.stock.history} isPositive={post.stock.change >= 0} />
      </div>

      {/* Actions */}
      <div className="p-3">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-4">
            <button onClick={toggleLike} className={`${isLiked ? 'text-red-500' : 'text-gray-700'}`}>
              <svg className="w-7 h-7" fill={isLiked ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
            </button>
            <button className="text-gray-700">
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
            </button>
            <button className="text-gray-700" onClick={() => onEdit(post.stock.name, chartId)}>
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
            </button>
          </div>
          <button className="text-gray-700">
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" /></svg>
          </button>
        </div>

        {/* Likes & Caption */}
        <div className="space-y-1">
          <p className="text-sm font-bold text-gray-900">{likesCount.toLocaleString()} likes</p>
          <p className="text-sm text-gray-800">
            <span className="font-bold mr-2">{post.author}</span>
            Daily technical overview of <span className="text-blue-600 font-medium">#{post.stock.symbol}</span>. 
            Markets are showing dynamic movement today. Check out my AI analysis below! 👇
          </p>
        </div>

        {/* AI Analysis Section */}
        <div className="mt-3">
          {!analysis && !loading && (
            <button 
              onClick={handleAnalyze}
              className="text-sm font-semibold text-blue-600 hover:text-blue-800 transition-colors"
            >
              Ask Gemini AI for K-line Analysis...
            </button>
          )}

          {loading && (
            <div className="flex items-center space-x-2 text-sm text-gray-500 animate-pulse">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span>Gemini is thinking...</span>
            </div>
          )}

          {analysis && (
            <div className="bg-blue-50 p-3 rounded-lg border border-blue-100 text-sm text-gray-800 animate-fadeIn">
              <div className="flex items-center space-x-1 mb-1 text-blue-700 font-semibold text-xs uppercase tracking-wider">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM5 10a1 1 0 01-1 1H3a1 1 0 110-2h1a1 1 0 011 1zM8 16v-1a1 1 0 112 0v1a1 1 0 11-2 0zM13.536 14.95a1 1 0 011.414 0l.707.707a1 1 0 01-1.414 1.414l-.707-.707a1 1 0 010-1.414zM15.657 5.757l.707.707a1 1 0 01-1.414 1.414l-.707-.707a1 1 0 011.414-1.414zM10 6a4 4 0 100 8 4 4 0 000-8z" /></svg>
                <span>Gemini Analysis</span>
              </div>
              <p className="whitespace-pre-line">{analysis}</p>
            </div>
          )}
        </div>

        <p className="text-[10px] text-gray-400 uppercase mt-3 tracking-wide">3 HOURS AGO</p>
      </div>
    </div>
  );
};

export default StockCard;
