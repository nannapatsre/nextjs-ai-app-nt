"use client";

import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { RevenuePoint } from '@/types/admin';
import { Card } from '@/components/ui/card';

interface RevenueChartProps {
  data: RevenuePoint[];
  isLoading: boolean;
  error: string | null;
  onRetry: () => void;
}

export default function RevenueChart({ data, error, onRetry }: RevenueChartProps) {
  if (error) {
    return (
      <div className="p-6 text-center border border-[#991B1B] bg-[#2C1A10] rounded-md h-full min-h-[300px] flex flex-col justify-center items-center">
        <p className="text-[#F87171] font-spectral mb-4">{error}</p>
        <button 
          onClick={onRetry} 
          className="px-4 py-2 text-xs font-cinzel uppercase bg-[#CA8A04] text-[#1A0F0A] rounded hover:bg-[#B8780A] transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <Card className="p-6 border-t-2 border-t-[#CA8A04] bg-[#2C1A10] text-[#F5E6D3] shadow-sm h-full min-h-[300px]">
      <div className="h-full w-full pb-8">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#3D2517" vertical={false} />
            <XAxis 
              dataKey="date" 
              stroke="#BFA98A" 
              fontSize={12} 
              tickLine={false} 
              axisLine={false}
              tick={{ fontFamily: 'Spectral' }}
            />
            <YAxis 
              stroke="#BFA98A" 
              fontSize={12} 
              tickLine={false} 
              axisLine={false}
              tickFormatter={(value) => `${value / 1000}k`}
              tick={{ fontFamily: 'Spectral' }}
            />
            <Tooltip 
              contentStyle={{ backgroundColor: '#2C1A10', border: '1px solid #5C3D2E', borderRadius: '4px', color: '#F5E6D3', fontFamily: 'Spectral' }}
              itemStyle={{ color: '#CA8A04' }}
            />
            <Line 
              type="monotone" 
              dataKey="revenue" 
              stroke="#CA8A04" 
              strokeWidth={2} 
              dot={{ r: 4, fill: '#CA8A04', strokeWidth: 0 }}
              activeDot={{ r: 6, stroke: '#CA8A04', strokeWidth: 2, fill: '#1A0F0A' }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
