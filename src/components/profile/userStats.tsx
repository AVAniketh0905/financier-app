'use client';

import { ClientExpense } from '@/context/expenseProvider';
import React, { Suspense, useEffect, useState } from 'react';
import { Card, CardContent } from '../ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import GeneralStats from './subcomponents/general';
import MonthStats from './subcomponents/monthStats';
import YearStats from './subcomponents/yearStats';

function UserStatsContent({
  totalExpenses,
}: {
  totalExpenses: ClientExpense[];
}) {
  // create tabs for month week year and sep each and style

  return (
    <Card className='h-full w-full'>
      <Tabs defaultValue='general' className='w-auto'>
        <TabsList>
          <TabsTrigger value='general'>General</TabsTrigger>
          <TabsTrigger value='month'>Month</TabsTrigger>
          <TabsTrigger value='year'>Year</TabsTrigger>
        </TabsList>
        <TabsContent value='general'>
          <GeneralStats totalExpenses={totalExpenses} />
        </TabsContent>
        <TabsContent value='month'>
          <MonthStats totalExpenses={totalExpenses} />
        </TabsContent>
        <TabsContent value='year'>
          <YearStats totalExpenses={totalExpenses} />
        </TabsContent>
      </Tabs>
    </Card>
  );
}

export default function UserStats() {
  const [totalExpenses, setTotalExpenses] = useState<ClientExpense[]>([]);

  useEffect(() => {
    async function getExpenses() {
      const response = await fetch('/api/expenses');
      const expenses = await response.json();
      setTotalExpenses(expenses);
    }
    getExpenses();
  }, [totalExpenses]);

  return (
    <Card>
      {totalExpenses.length <= 0 ? (
        <Suspense fallback={<div>Loading...</div>}>
          <CardContent>We are fetching your data!</CardContent>
        </Suspense>
      ) : (
        <UserStatsContent totalExpenses={totalExpenses} />
      )}
    </Card>
  );
}

//
//
//         Total Expenses on each weekly -{' '}
//         {JSON.stringify(totalExpensesOnEachWeek(totalExpenses, 8))}
//         <br />
//         Total Expenses on each month -{' '}
//         {JSON.stringify()}
//         {/* Group Expenses by month -
//         {JSON.stringify(groupExpensesByMonth(totalExpenses))}
//         <br /> */}
//         Total Expenses on each year -{' '}
//         {JSON.stringify(totalExpensesOnEachYear(totalExpenses))}
//         <br />
//         {/* Group Expenses by year -
//         {JSON.stringify(groupExpensesByYear(totalExpenses))} */}
