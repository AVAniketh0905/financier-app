import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { getCalendarDays } from '@/utils/getCalendarDays';
import DateCard from './dateCard';
import { days } from '@/utils/timeUtils';

export default function Calendar({ date }: { date: Date }) {
  const calendarDays = getCalendarDays(date);

  return (
    <Card className='relative w-full'>
      <CardContent className='m-0 grid grid-cols-7 p-0'>
        {days.map((day, index) => (
          <span
            className='mb-2 bg-primary p-5 text-center text-2xl text-secondary shadow-lg shadow-accent first:rounded-l-md last:rounded-r-md hover:animate-bounce'
            key={index}
          >
            {day}
          </span>
        ))}
      </CardContent>
      <CardContent className='m-0 grid grid-cols-7 p-0'>
        {calendarDays.map((day, index) => (
          <DateCard key={index} date={day} />
        ))}
      </CardContent>
      {/* <CardContent className='sticky bottom-2 m-0 flex w-full flex-col items-end justify-center gap-5 border-primary p-2 backdrop-blur-sm xs:flex-row'></CardContent> */}
    </Card>
  );
}
