import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import DateCard from './dateCard';

export default function MobileCalendar({ date }: { date: Date }) {
  return (
    <Card className='flex h-fit w-full flex-col justify-center'>
      <CardContent className='m-0 flex p-0 text-center text-xl text-primary'>
        {date.toUTCString().split(' ').slice(0, 4).join(' ')}
      </CardContent>
      <DateCard date={date} />
      {/* <CardContent className='sticky bottom-2 m-0 flex w-full flex-col items-end justify-center gap-5 border-primary p-2 backdrop-blur-sm xs:flex-row'></CardContent> */}
    </Card>
  );
}
