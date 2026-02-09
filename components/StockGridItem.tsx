
import React, { useState, useEffect } from 'react';
import { Post } from '../types';
import { generateStockToyImage } from '../services/geminiService';

interface StockGridItemProps {
  post: Post;
  onClick: () => void;
}

const StockGridItem: React.FC<StockGridItemProps> = ({ post, onClick }) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    const fetchImage = async () => {
      // The generateStockToyImage now handles caching internally
      const result = await generateStockToyImage(post.stock);
      if (mounted) {
        setImageUrl(result || `https://picsum.photos/seed/${post.stock.symbol}-toy/500/500`);
        setLoading(false);
      }
    };
    fetchImage();
    return () => { mounted = false; };
  }, [post.stock]);

  return (
    <div 
      onClick={onClick}
      className="relative aspect-square overflow-hidden group cursor-pointer active:scale-95 transition-transform duration-200 border-[0.5px] border-gray-100 bg-gray-50"
    >
      {/* Cover Image with AI Character */}
      {loading ? (
        <div className="w-full h-full flex flex-col items-center justify-center space-y-2 bg-gray-50/50 backdrop-blur-sm">
          <div className="relative">
            <div className="w-10 h-10 border-2 border-indigo-200 border-t-indigo-600 rounded-full animate-spin" />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-[10px] font-bold text-indigo-600">{post.stock.symbol[0]}</span>
            </div>
          </div>
          <span className="text-[7px] text-indigo-400 font-bold uppercase tracking-widest text-center px-2">
            AI Expression Syncing...
          </span>
        </div>
      ) : (
        <img 
          src={imageUrl!} 
          className="w-full h-full object-cover animate-fadeIn" 
          alt={`${post.stock.symbol} toy character`}
          loading="lazy"
        />
      )}
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />
      
      {/* Stock Labeling */}
      <div className="absolute bottom-2 left-2 right-2 flex flex-col pointer-events-none">
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
             <span className="text-white text-[11px] font-black leading-none drop-shadow-md">
              {post.stock.symbol}
            </span>
            <span className="text-white/60 text-[7px] font-bold mt-0.5 uppercase tracking-tighter">
              {post.stock.changePercent >= 0 ? 'Mood: Bullish' : 'Mood: Bearish'}
            </span>
          </div>
          <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-sm shadow-sm ${post.stock.change >= 0 ? 'bg-green-500' : 'bg-red-500'} text-white`}>
            {post.stock.changePercent > 0 ? '+' : ''}{post.stock.changePercent.toFixed(1)}%
          </span>
        </div>
      </div>

      {/* Collector Status Badge */}
      <div className="absolute top-2 right-2">
        <div className="bg-black/30 backdrop-blur-xl px-2 py-0.5 rounded-full text-[7px] text-white font-black border border-white/20 uppercase tracking-widest">
          {Math.abs(post.stock.changePercent) > 4 ? 'Legendary' : 'Common'}
        </div>
      </div>
    </div>
  );
};

export default StockGridItem;
