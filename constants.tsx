
import React from 'react';
import { StockData, Post } from './types';

export const MOCK_STOCKS: StockData[] = [
  {
    id: '1',
    symbol: 'NVDA',
    name: 'NVIDIA Corporation',
    price: 135.58,
    change: 2.45,
    changePercent: 1.84,
    description: 'Leading the AI revolution with powerful GPU technology.',
    history: Array.from({ length: 20 }, (_, i) => {
      const base = 120 + Math.random() * 20;
      return {
        date: `2024-03-${i + 1}`,
        value: base,
        open: base - 2,
        close: base + 2,
        high: base + 5,
        low: base - 4
      };
    })
  },
  {
    id: '2',
    symbol: 'AAPL',
    name: 'Apple Inc.',
    price: 228.22,
    change: -1.12,
    changePercent: -0.49,
    description: 'Tech giant focusing on ecosystem and consumer electronics.',
    history: Array.from({ length: 20 }, (_, i) => {
      const base = 210 + Math.random() * 20;
      return {
        date: `2024-03-${i + 1}`,
        value: base,
        open: base - 1,
        close: base + 1,
        high: base + 3,
        low: base - 2
      };
    })
  },
  {
    id: '3',
    symbol: 'TSLA',
    name: 'Tesla, Inc.',
    price: 250.44,
    change: 12.30,
    changePercent: 5.16,
    description: 'Pioneer in electric vehicles and sustainable energy.',
    history: Array.from({ length: 20 }, (_, i) => {
      const base = 230 + Math.random() * 30;
      return {
        date: `2024-03-${i + 1}`,
        value: base,
        open: base - 5,
        close: base + 5,
        high: base + 8,
        low: base - 7
      };
    })
  }
];

export const MOCK_POSTS: Post[] = MOCK_STOCKS.map(stock => ({
  id: `post-${stock.id}`,
  stock,
  author: 'FinAnalyst_Pro',
  authorAvatar: `https://picsum.photos/seed/${stock.symbol}/100/100`,
  likes: Math.floor(Math.random() * 1000),
  comments: Math.floor(Math.random() * 100),
  isLiked: false
}));
