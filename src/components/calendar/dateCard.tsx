import React, { ReactNode } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import Link from 'next/link';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../ui/tooltip';
import { getCurrentUser } from '@/lib/session';
import { prisma } from '@/lib/prisma';
import Notification from '../notif';
import { categories, categoryIcon } from '@/utils/category';
import { Expenses } from '@prisma/client';
import { User } from 'next-auth';

function DateCardContent({
  spanContent,
  isToday,
  user,
  totalExpenses,
}: {
  spanContent: ReactNode;
  isToday: boolean;
  user: User | undefined;
  totalExpenses: Expenses[];
}) {
  return (
    <CardContent className='m-0 flex h-[100px] rounded-md p-0 hover:bg-accent'>
      <div className='flex justify-start'>
        <span
          className={`m-0 flex h-8 w-8 items-center justify-center rounded-b-full rounded-e-full ${
            isToday ? 'bg-primary' : 'bg-accent'
          } text-lg group-hover:bg-background`}
        >
          {spanContent}
        </span>
      </div>
      <div className='flex w-3/4 items-center text-primary'>
        {!user || totalExpenses.length === 0 ? (
          <span className='self-center text-center md:hidden'>
            No Expenses!
          </span>
        ) : (
          <div className='grid grid-cols-3'>
            {categories.map((category, index) => {
              const catValue = totalExpenses.filter(
                (expense) => expense.category === category
              ).length;
              if (catValue === 0) return <></>;
              const catIcon = categoryIcon[category];
              return (
                <Notification
                  key={index}
                  category={category}
                  Icon={catIcon}
                  value={catValue}
                />
              );
            })}
          </div>
        )}
      </div>
    </CardContent>
  );
}

export default async function DateCard({ date }: { date: Date | null }) {
  const today = new Date();
  const isToday =
    today.getDate() === date?.getDate() &&
    today.getMonth() + 1 === date.getMonth() + 1;
  const user = await getCurrentUser();

  if (!date) return <Card></Card>;

  const totalExpenses = await prisma.expenses.findMany({
    where: {
      date: new Date(date.toISOString().split('T')[0]),
      userId: user?.id,
    },
  });

  return (
    <Card className='group'>
      {date.getDate() <= today.getDate() ? (
        <Link href={`/date/${date.getDate()}/${date.getMonth() + 1}`}>
          <DateCardContent
            spanContent={date.getDate()}
            isToday={isToday}
            user={user}
            totalExpenses={totalExpenses}
          />
        </Link>
      ) : (
        <DateCardContent
          isToday={isToday}
          user={user}
          totalExpenses={totalExpenses}
          spanContent={
            <TooltipProvider>
              <Tooltip delayDuration={300}>
                <TooltipTrigger>{date.getDate()}</TooltipTrigger>
                <TooltipContent>
                  <p>Cannot not Visit the Future!</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          }
        />
      )}
    </Card>
  );
}
