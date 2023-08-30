import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import FormSheet from './formSheet';
import { getCurrentUser } from '@/lib/session';
import ExpensesGrid from './expensesGrid';

function UnauthorisedDayCard({ date }: { date: Date }) {
  return (
    <Card>
      <CardContent className='m-0 flex w-full flex-col p-2 xs:flex-row'>
        <CardContent className='flex flex-row flex-wrap xs:w-1/2 xs:flex-col'>
          <div className='flex w-full items-center justify-between xs:w-2/3 xs:flex-col'>
            <div>
              <span className='text-end text-4xl font-bold text-primary xs:text-9xl'>
                {date.toLocaleString('default', { weekday: 'short' })}
              </span>
            </div>
            <div className='flex items-center justify-evenly'>
              <span className='text-start text-4xl font-bold text-primary xs:text-9xl'>
                {date.getDate()}
              </span>
              <div className='flex flex-col self-center'>
                <span className='text-2xl font-bold xs:text-6xl'>
                  {date.toLocaleString('default', { month: 'short' })}
                </span>
                <span className='self-left text-xl font-bold text-accent xs:text-4xl'>
                  {date.getFullYear()}
                </span>
              </div>
            </div>
          </div>
        </CardContent>
        <div className='relative flex justify-center bg-accent p-3 pr-20 xs:w-1/2'>
          <div className='grid grid-cols-2'>Login to add expenses</div>
        </div>
      </CardContent>
    </Card>
  );
}

export default async function DayCard({ date }: { date: Date }) {
  const user = await getCurrentUser();

  if (!user) {
    return <UnauthorisedDayCard date={date} />;
  }

  return (
    <Card>
      <CardContent className='m-0 flex w-full flex-col items-center p-2 xs:flex-row'>
        <CardContent className='flex flex-row flex-wrap items-center xs:w-1/3 xs:flex-col'>
          <div className='flex w-full justify-center text-center xs:w-2/3 xs:flex-col'>
            <div className='flex justify-center'>
              <span className='text-end text-4xl font-bold text-primary xs:text-6xl'>
                {date.toLocaleString('default', { weekday: 'short' })}
              </span>
            </div>
            <div className='flex items-center justify-evenly'>
              <span className='text-start text-4xl font-bold text-primary xs:text-6xl'>
                {date.getDate()}
              </span>
              <div className='flex flex-col self-center'>
                <span className='text-2xl font-bold xs:text-4xl'>
                  {date.toLocaleString('default', { month: 'short' })}
                </span>
                <span className='self-left text-xl font-bold text-accent xs:text-4xl'>
                  {date.getFullYear()}
                </span>
              </div>
            </div>
          </div>
        </CardContent>
        <div className='relative flex justify-center p-3 xs:w-2/3'>
          <ExpensesGrid />
          <div className='absolute right-0 mr-5 hidden h-fit self-end sm:inline'>
            <FormSheet user={user} date={date} orientation='right' />
          </div>
          <div className='absolute right-0 mr-5 h-fit self-end sm:hidden'>
            <FormSheet user={user} date={date} orientation='bottom' />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
