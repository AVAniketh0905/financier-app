import Calendar from '@/components/calendar/Calendar';
import MobileCalendar from '@/components/calendar/mobileCalendar';
import React from 'react';

export default function CalendarPage() {
  const date = new Date();

  return (
    <div className='flex h-full justify-center p-2'>
      <div className='hidden w-full md:flex'>
        <Calendar date={date} />
      </div>
      <div className='flex w-full items-center md:hidden'>
        <MobileCalendar date={date} />
      </div>
    </div>
  );
}
