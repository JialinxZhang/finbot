
import React, { useMemo } from 'react';
import {
  ComposedChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Line,
  Cell,
  ReferenceLine,
  Area
} from 'recharts';
import { StockData } from '../types';

interface KLineChartProps {
  data: StockData['history'];
  isPositive: boolean;
  simple?: boolean;
}

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-white/95 backdrop-blur-sm p-2 border border-gray-200 rounded-lg shadow-xl text-[10px] leading-tight z-50">
        <p className="font-bold border-b border-gray-100 pb-1 mb-1">{data.date}</p>
        <div className="grid grid-cols-2 gap-x-3 gap-y-0.5">
          <p className="text-gray-500">Open:</p> <p className="font-medium text-gray-900">${data.open.toFixed(2)}</p>
          <p className="text-gray-500">Close:</p> <p className="font-medium text-gray-900">${data.close.toFixed(2)}</p>
          <p className="text-gray-500">High:</p> <p className="font-medium text-red-500">${data.high.toFixed(2)}</p>
          <p className="text-gray-500">Low:</p> <p className="font-medium text-green-500">${data.low.toFixed(2)}</p>
        </div>
      </div>
    );
  }
  return null;
};

const calculateSMA = (data: number[], period: number) => {
  const sma = [];
  for (let i = 0; i < data.length; i++) {
    if (i < period - 1) {
      sma.push(null);
    } else {
      const sum = data.slice(i - period + 1, i + 1).reduce((a, b) => a + b, 0);
      sma.push(sum / period);
    }
  }
  return sma;
};

const calculateRSI = (data: number[], period: number = 14) => {
  const rsi = [];
  let gains = 0;
  let losses = 0;

  for (let i = 0; i < data.length; i++) {
    if (i === 0) {
      rsi.push(null);
      continue;
    }

    const diff = data[i] - data[i - 1];
    if (diff >= 0) {
      gains += diff;
    } else {
      losses -= diff;
    }

    if (i < period) {
      rsi.push(null);
    } else if (i === period) {
      const avgGain = gains / period;
      const avgLoss = losses / period;
      const rs = avgGain / (avgLoss || 1);
      rsi.push(100 - (100 / (1 + rs)));
    } else {
      const rs = (gains + 0.1) / (losses + 0.1);
      rsi.push(100 - (100 / (1 + rs)));
    }
  }
  return rsi;
};

const KLineChart: React.FC<KLineChartProps> = ({ data, isPositive, simple = false }) => {
  const chartData = useMemo(() => {
    const closes = data.map(d => d.close);
    const sma5 = calculateSMA(closes, 5);
    const sma10 = calculateSMA(closes, 10);
    const rsi = calculateRSI(closes, 10);

    return data.map((d, i) => ({
      ...d,
      candle: [d.open, d.close],
      wick: [d.low, d.high],
      color: d.close >= d.open ? '#22c55e' : '#ef4444',
      sma5: sma5[i],
      sma10: sma10[i],
      rsi: rsi[i],
    }));
  }, [data]);

  const minPrice = Math.min(...data.map(d => d.low)) * 0.99;
  const maxPrice = Math.max(...data.map(d => d.high)) * 1.01;

  if (simple) {
    return (
      <div className="w-full h-full bg-gray-50/50">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={chartData} margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
            <YAxis domain={[minPrice, maxPrice]} hide />
            <XAxis hide />
            <Bar dataKey="wick" barSize={1}>
               {chartData.map((entry, index) => (
                  <Cell key={`cell-wick-${index}`} fill={entry.color} />
                ))}
            </Bar>
            <Bar dataKey="candle" barSize={4}>
              {chartData.map((entry, index) => (
                <Cell key={`cell-body-${index}`} fill={entry.color} fillOpacity={0.7} />
              ))}
            </Bar>
            <Line 
              type="monotone" 
              dataKey="close" 
              stroke={isPositive ? '#10b981' : '#f43f5e'} 
              dot={false} 
              strokeWidth={1.5}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    );
  }

  return (
    <div className="w-full bg-white rounded-xl overflow-hidden border border-gray-100 flex flex-col">
      <div className="flex items-center space-x-3 px-3 py-1.5 bg-gray-50/50 border-b border-gray-100 text-[10px] font-medium uppercase tracking-wider text-gray-400">
        <div className="flex items-center">
          <span className="w-2 h-0.5 bg-yellow-400 mr-1"></span> SMA5
        </div>
        <div className="flex items-center">
          <span className="w-2 h-0.5 bg-indigo-400 mr-1"></span> SMA10
        </div>
        <div className="flex items-center">
          <span className="w-2 h-0.5 bg-purple-400 mr-1"></span> RSI(10)
        </div>
      </div>

      <div className="h-64 w-full relative">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={chartData} margin={{ top: 15, right: 5, left: 5, bottom: 5 }}>
            <CartesianGrid strokeDasharray="1 4" vertical={false} stroke="#f1f5f9" />
            <XAxis dataKey="date" hide />
            <YAxis 
              yAxisId="left"
              domain={[minPrice, maxPrice]} 
              orientation="right" 
              tick={{ fontSize: 9, fill: '#94a3b8' }}
              axisLine={false}
              tickLine={false}
              tickCount={6}
            />
            <YAxis yAxisId="right" domain={[0, 100]} orientation="left" hide />
            <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#cbd5e1', strokeWidth: 1, strokeDasharray: '5 5' }} />
            <Area yAxisId="right" type="monotone" dataKey="rsi" stroke="none" fill="#c084fc" fillOpacity={0.05} baseLine={0} />
            <Line yAxisId="right" type="monotone" dataKey="rsi" stroke="#c084fc" dot={false} strokeWidth={1} opacity={0.5} />
            <Bar yAxisId="left" dataKey="wick" barSize={1}>
               {chartData.map((entry, index) => (
                  <Cell key={`cell-wick-${index}`} fill={entry.color} />
                ))}
            </Bar>
            <Bar yAxisId="left" dataKey="candle" barSize={8}>
              {chartData.map((entry, index) => (
                <Cell key={`cell-body-${index}`} fill={entry.color} fillOpacity={0.8} />
              ))}
            </Bar>
            <Line yAxisId="left" type="monotone" dataKey="sma5" stroke="#facc15" dot={false} strokeWidth={1.5} strokeDasharray="4 2" />
            <Line yAxisId="left" type="monotone" dataKey="sma10" stroke="#818cf8" dot={false} strokeWidth={1.5} />
            <ReferenceLine yAxisId="right" y={70} stroke="#fecaca" strokeDasharray="3 3" />
            <ReferenceLine yAxisId="right" y={30} stroke="#bbf7d0" strokeDasharray="3 3" />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default KLineChart;
