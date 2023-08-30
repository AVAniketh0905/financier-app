import SilverChart from '@/components/silver/silverChart';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import {
  getModularStockData,
  getModularStockPrediction,
} from '@/utils/modularData';
import React, { Suspense } from 'react';

export default async function SilverPrediction() {
  const stockData = await getModularStockData();
  const silverPred = await getModularStockPrediction();

  return (
    <Card>
      <CardHeader className='text-4xl'>Silver Prediction</CardHeader>
      <CardContent className='w-full flex-col md:flex'>
        <CardContent className='m-0 p-0'>
          <Suspense fallback={<div>Loading...</div>}>
            <SilverChart data={stockData} />
          </Suspense>
        </CardContent>
        {silverPred && (
          <CardContent>
            <span className='text-2xl'>Prediction: {silverPred}</span>
          </CardContent>
        )}
      </CardContent>
    </Card>
  );
}
