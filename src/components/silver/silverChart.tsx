'use client';

import React from 'react';
import {
  ValueType,
  NameType,
} from 'recharts/types/component/DefaultTooltipContent';
import {
  CartesianGrid,
  XAxis,
  YAxis,
  Legend,
  Line,
  LineChart,
  Tooltip,
  TooltipProps,
  ResponsiveContainer,
} from 'recharts';
import { Card, CardContent } from '../ui/card';

interface DataProps {
  timestamp: Array<number>;
  indicators: {
    adjclose: Array<{
      adjclose: Array<number>;
    }>;
  };
}

function renderToolTip({ active, payload }: TooltipProps<ValueType, NameType>) {
  if (active && payload && payload.length) {
    const dataPoint = payload[0].payload;

    return (
      <Card className='m-0 p-0'>
        <CardContent>
          Date:{' '}
          {new Date(dataPoint.timestamp * 1000).toISOString().split('T')[0]}
        </CardContent>
        <CardContent>
          Adjusted Close: {Number(dataPoint.adjclose).toFixed(2)}
        </CardContent>
      </Card>
    );
  }
}

function formatStockData(data: DataProps) {
  const timestamps = data?.timestamp;
  const adjClose = data?.indicators.adjclose[0].adjclose;
  return timestamps?.map((timestamp, index) => ({
    timestamp,
    adjclose: adjClose[index],
  }));
}

export default function SilverChart({ data }: { data: DataProps }) {
  const stockData = formatStockData(data);

  return (
    <div className='mx-auto w-full max-w-full'>
      <ResponsiveContainer minWidth={200} height={400}>
        <LineChart
          width={800}
          height={400}
          data={stockData}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray='3 3' />
          <XAxis
            dataKey='timestamp'
            tickFormatter={(timestamp) => {
              const date = new Date(timestamp * 1000);
              return date.toLocaleDateString();
            }}
          />
          <YAxis />
          <Tooltip content={renderToolTip} />
          <Legend />
          <Line
            type='monotone'
            dataKey='adjclose'
            stroke='hsl(var(--primary))'
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
